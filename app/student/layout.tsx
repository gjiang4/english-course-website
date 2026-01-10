import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user has course access
  const { data: access } = await supabase
    .from('course_access')
    .select('is_active')
    .eq('user_id', user.id)
    .single()

  if (!access?.is_active) {
    // User doesn't have access - show message
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Course Access Required
          </h1>
          <p className="text-gray-600 mb-6">
            Your account doesn&apos;t have access to the course yet. If you&apos;ve already purchased, please contact support with your receipt.
          </p>
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Purchase Course
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/student" className="text-xl font-bold text-gray-900">
            Social & Lifestyle English
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{user.email}</span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
