import { CALENDLY_LINKS } from './constants'

export type CommunicationGoal =
  | 'ielts_exam'
  | 'general_english'
  | 'professional_business'
  | 'academic'

export type Coach = 'miles' | 'nick' | 'julia'

export interface CoachAssignment {
  coach: Coach
  calendlyLink: string
  reason: string
}

export function assignCoach(goal: CommunicationGoal): CoachAssignment {
  // IELTS and General English go to Associate coach (Miles)
  if (goal === 'ielts_exam' || goal === 'general_english') {
    return {
      coach: 'miles',
      calendlyLink: CALENDLY_LINKS.miles,
      reason: 'For IELTS and general English, you\'ll work with Miles, our specialist in foundational English skills.',
    }
  }

  // Professional/Business and Academic go to Senior coaches (Nick or Julia)
  // Simple alternation using random for load balancing
  const seniorCoaches: Array<'nick' | 'julia'> = ['nick', 'julia']
  const selectedCoach = seniorCoaches[Math.floor(Math.random() * 2)]

  const coachNames = {
    nick: 'Dr. Nick',
    julia: 'Julia',
  }

  return {
    coach: selectedCoach,
    calendlyLink: CALENDLY_LINKS[selectedCoach],
    reason: `For professional and advanced English, you'll work with ${coachNames[selectedCoach]}, one of our senior coaches.`,
  }
}
