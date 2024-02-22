export type Sex = 'male' | 'female'
export type SexSelectable = { _id: Sex; name: string }

export type Goal = 'lose' | 'maintain' | 'gain'
export type GoalSelectable = { _id: Goal; name: string }

export type ActivityLevel = 'very-light' | 'light' | 'active' | 'very-active'
export type ActivityLevelSelectable = { _id: ActivityLevel; name: string }
