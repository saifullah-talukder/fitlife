import { ActivityLevelSelectable, GoalSelectable, SexSelectable } from '@/types'

export const sexItems: SexSelectable[] = [
  { _id: 'male', name: 'Male' },
  { _id: 'female', name: 'Female' },
]

export const goalItems: GoalSelectable[] = [
  { _id: 'lose', name: 'Lose Weight' },
  { _id: 'maintain', name: 'Maintain Weight' },
  { _id: 'gain', name: 'Gain Weight' },
]

export const activityLevelItems: ActivityLevelSelectable[] = [
  { _id: 'very-light', name: 'Not Very Active' },
  { _id: 'light', name: 'Lightly Active' },
  { _id: 'active', name: 'Active' },
  { _id: 'very-active', name: 'Very Active' },
]
