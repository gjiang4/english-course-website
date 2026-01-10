'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { assignCoach, type CommunicationGoal } from '@/lib/routing'
import { INCOME_BRACKETS, COMMUNICATION_GOALS } from '@/lib/constants'

type FormState = {
  full_name: string
  email: string
  job_title: string
  income_bracket: string
  communication_goal: string
}

export default function IntakePage() {
  const [form, setForm] = useState<FormState>({
    full_name: '',
    email: '',
    job_title: '',
    income_bracket: '',
    communication_goal: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [assignment, setAssignment] = useState<{
    coach: string
    calendlyLink: string
    reason: string
  } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      // Get coach assignment
      const coachAssignment = assignCoach(form.communication_goal as CommunicationGoal)

      // Save to database
      const supabase = createClient()
      const { error } = await supabase.from('intake_forms').insert({
        email: form.email,
        full_name: form.full_name,
        job_title: form.job_title,
        income_bracket: form.income_bracket,
        communication_goal: form.communication_goal,
        assigned_coach: coachAssignment.coach,
        calendly_link: coachAssignment.calendlyLink,
        routing_reason: coachAssignment.reason,
      })

      if (error) {
        console.error('Form submission error:', error)
        alert('Something went wrong. Please try again.')
        return
      }

      setAssignment(coachAssignment)
      setSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (submitted && assignment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            You&apos;re All Set!
          </h1>
          <p className="text-gray-600 mb-6">
            {assignment.reason}
          </p>

          <a
            href={assignment.calendlyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mb-4"
          >
            Book Your Assessment Session
          </a>

          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your account to access the course
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quick Intake Form
          </h1>
          <p className="text-gray-600">
            Help us match you with the right coach for your goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              required
              value={form.full_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          {/* Job Title */}
          <div>
            <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">
              Current Job Title
            </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              required
              value={form.job_title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g. Software Engineer, Student, Manager"
            />
          </div>

          {/* Income Bracket */}
          <div>
            <label htmlFor="income_bracket" className="block text-sm font-medium text-gray-700 mb-1">
              Annual Income Bracket (USD)
            </label>
            <select
              id="income_bracket"
              name="income_bracket"
              required
              value={form.income_bracket}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              {INCOME_BRACKETS.map((bracket) => (
                <option key={bracket.value} value={bracket.value}>
                  {bracket.label}
                </option>
              ))}
            </select>
          </div>

          {/* Communication Goal */}
          <div>
            <label htmlFor="communication_goal" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Communication Goal
            </label>
            <select
              id="communication_goal"
              name="communication_goal"
              required
              value={form.communication_goal}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              {COMMUNICATION_GOALS.map((goal) => (
                <option key={goal.value} value={goal.value}>
                  {goal.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit & Get Matched'}
          </button>
        </form>
      </div>
    </div>
  )
}
