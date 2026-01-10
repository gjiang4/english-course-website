import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const supabase = createAdminClient()

    // Record the purchase
    const { error } = await supabase.from('purchases').insert({
      stripe_checkout_session_id: session.id,
      stripe_customer_id: session.customer as string | null,
      stripe_customer_email: session.customer_details?.email || '',
      has_course: session.metadata?.has_course === 'true',
      has_assessment: session.metadata?.has_assessment === 'true',
      amount_total: session.amount_total || 0,
      currency: session.currency || 'usd',
      payment_status: 'completed',
    })

    if (error) {
      console.error('Failed to record purchase:', error)
      return NextResponse.json(
        { error: 'Failed to record purchase' },
        { status: 500 }
      )
    }

    // Try to link to existing user and grant course access
    if (session.customer_details?.email) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', session.customer_details.email)
        .single()

      if (profile) {
        // Update purchase with user_id
        await supabase
          .from('purchases')
          .update({ user_id: profile.id })
          .eq('stripe_checkout_session_id', session.id)

        // Get the purchase ID
        const { data: purchase } = await supabase
          .from('purchases')
          .select('id')
          .eq('stripe_checkout_session_id', session.id)
          .single()

        if (purchase && session.metadata?.has_course === 'true') {
          // Grant course access
          await supabase.from('course_access').upsert({
            user_id: profile.id,
            purchase_id: purchase.id,
            is_active: true,
          })
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
