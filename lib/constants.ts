// Product configuration
export const PRODUCTS = {
  course: {
    name: 'Social and Lifestyle English',
    description: 'Complete video course covering greetings, small talk, travel, and social dynamics',
    priceId: 'price_1So6iVHkbmZ1AOLjZmDHYjbe',
    amount: 2200, // $22.00 in cents
  },
  assessment: {
    name: '1-on-1 Assessment Session',
    description: 'Comprehensive scan of your English level and communication bottlenecks',
    priceId: 'price_1So6kCHkbmZ1AOLj1d4JyQyf',
    amount: 6000, // $60.00 in cents
  },
} as const

// Intake form options
export const INCOME_BRACKETS = [
  { value: 'under_30k', label: 'Under $30,000' },
  { value: '30k_50k', label: '$30,000 - $50,000' },
  { value: '50k_75k', label: '$50,000 - $75,000' },
  { value: '75k_100k', label: '$75,000 - $100,000' },
  { value: 'over_100k', label: 'Over $100,000' },
] as const

export const COMMUNICATION_GOALS = [
  { value: 'ielts_exam', label: 'IELTS Exam Preparation' },
  { value: 'general_english', label: 'General English Improvement' },
  { value: 'professional_business', label: 'Professional/Business English' },
  { value: 'academic', label: 'Academic English' },
] as const

// Coach Calendly links
export const CALENDLY_LINKS = {
  miles: 'https://calendly.com/mileshuang19970730/one-on-one-with-teacher-miles',
  nick: 'https://calendly.com/drstraw',
  julia: 'https://calendly.com/oujul000/30min',
} as const
