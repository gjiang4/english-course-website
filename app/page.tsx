'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/lib/constants'

export default function Home() {
  const [includeAssessment, setIncludeAssessment] = useState(false)
  const [loading, setLoading] = useState(false)

  const coursePrice = PRODUCTS.course.amount / 100
  const assessmentPrice = PRODUCTS.assessment.amount / 100
  const totalPrice = coursePrice + (includeAssessment ? assessmentPrice : 0)

  async function handleCheckout() {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ includeAssessment }),
      })
      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Social & Lifestyle English</h1>
          <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Student Login
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Speak English Naturally in Any Social Situation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master everyday conversations: greetings, small talk, travel, and social dynamics.
            Build real confidence for real-world situations.
          </p>
        </div>

        {/* What You'll Learn */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Natural greetings and introductions',
              'Small talk that flows effortlessly',
              'Travel English for any destination',
              'Social dynamics and cultural nuances',
              'Building real connections in English',
              'Confidence in everyday conversations',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Complete Video Course</h3>
            <p className="text-gray-600">Lifetime access to all lessons and materials</p>
          </div>

          <div className="text-center mb-6">
            <span className="text-4xl font-bold text-gray-900">${coursePrice}</span>
            <span className="text-gray-500 ml-2">USD</span>
          </div>

          {/* Assessment Bump */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAssessment}
                onChange={(e) => setIncludeAssessment(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="font-semibold text-gray-900">
                  Add 1-on-1 Assessment Session (+${assessmentPrice})
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Get a comprehensive scan of your English level and personalized feedback on your communication bottlenecks.
                </p>
              </div>
            </label>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 py-3 border-t border-gray-200">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-gray-900">${totalPrice} USD</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Get Instant Access'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Secure payment powered by Stripe
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          <p>Questions? Contact us anytime.</p>
        </div>
      </footer>
    </div>
  )
}
