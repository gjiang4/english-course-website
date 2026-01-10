import { createClient } from '@/lib/supabase/server'

// Course content - in production, this would come from a database or CMS
const COURSE_MODULES = [
  {
    id: 1,
    title: 'Module 1: Greetings & Introductions',
    lessons: [
      { id: 'greetings-basics', title: 'Greeting Basics', duration: '12 min' },
      { id: 'introductions', title: 'Introducing Yourself', duration: '15 min' },
      { id: 'meeting-people', title: 'Meeting New People', duration: '10 min' },
    ],
  },
  {
    id: 2,
    title: 'Module 2: Small Talk Mastery',
    lessons: [
      { id: 'small-talk-topics', title: 'Safe Small Talk Topics', duration: '14 min' },
      { id: 'keeping-conversations', title: 'Keeping Conversations Going', duration: '18 min' },
      { id: 'graceful-exits', title: 'Graceful Conversation Exits', duration: '8 min' },
    ],
  },
  {
    id: 3,
    title: 'Module 3: Travel English',
    lessons: [
      { id: 'airport-hotel', title: 'Airport & Hotel Conversations', duration: '16 min' },
      { id: 'restaurants', title: 'Restaurant English', duration: '12 min' },
      { id: 'directions', title: 'Asking for Directions', duration: '10 min' },
    ],
  },
  {
    id: 4,
    title: 'Module 4: Social Dynamics',
    lessons: [
      { id: 'cultural-nuances', title: 'Cultural Nuances', duration: '20 min' },
      { id: 'building-rapport', title: 'Building Rapport', duration: '15 min' },
      { id: 'confident-speaking', title: 'Speaking with Confidence', duration: '18 min' },
    ],
  },
]

const PDF_RESOURCES = [
  { id: 'phrases-guide', title: 'Essential Phrases Guide', filename: 'phrases-guide.pdf' },
  { id: 'conversation-starters', title: '50 Conversation Starters', filename: 'conversation-starters.pdf' },
  { id: 'travel-vocabulary', title: 'Travel Vocabulary Cheat Sheet', filename: 'travel-vocab.pdf' },
]

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get user's profile (user is guaranteed by layout)
  const { data: profile } = user ? await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single() : { data: null }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
        </h1>
        <p className="text-gray-600">
          Continue your journey to mastering social English.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Course Content */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Course Modules</h2>

          {COURSE_MODULES.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">{module.title}</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-900">{lesson.title}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lessons Completed</span>
                <span className="font-medium text-gray-900">0 / 12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          {/* PDF Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">PDF Resources</h3>
            <div className="space-y-3">
              {PDF_RESOURCES.map((pdf) => (
                <a
                  key={pdf.id}
                  href={`/pdfs/${pdf.filename}`}
                  download
                  className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{pdf.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Questions about the course? We&apos;re here to help.
            </p>
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
