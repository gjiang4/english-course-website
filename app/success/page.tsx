import Link from 'next/link'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. You&apos;re one step closer to mastering social English!
        </p>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6 text-left">
          <h2 className="font-semibold text-gray-900 mb-3">Next Steps:</h2>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">1.</span>
              Complete the intake form below
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">2.</span>
              Book your assessment session (if purchased)
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">3.</span>
              Create your account to access the course
            </li>
          </ol>
        </div>

        {/* CTA Button */}
        <Link
          href="/intake"
          className="block w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Complete Intake Form
        </Link>

        <Link
          href="/signup"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Or create your account first
        </Link>
      </div>
    </div>
  )
}
