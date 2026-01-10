import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/constants'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { includeAssessment } = body

    const lineItems: Array<{ price: string; quantity: number }> = [
      {
        price: PRODUCTS.course.priceId,
        quantity: 1,
      },
    ]

    // Add assessment if selected
    if (includeAssessment) {
      lineItems.push({
        price: PRODUCTS.assessment.priceId,
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
      metadata: {
        has_course: 'true',
        has_assessment: includeAssessment ? 'true' : 'false',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
