import { ActivityLevel, Goal, Sex } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type NewPlanParams = {
  birthDate: string | null
  sex: Sex | null
  country: string
  height: string
  weight: string
  goal: Goal | null
  activityLevel: ActivityLevel | null
  targetWeight: string
  pastFailureReason: string
}

type NewPlanStore = {
  params: NewPlanParams
  setNewPlanParam: <T extends keyof NewPlanParams>(key: T, value: NewPlanParams[T]) => void
  setEmpty: () => void
}

const emptyParams: NewPlanParams = {
  birthDate: null,
  sex: null,
  country: '',
  height: '',
  weight: '',
  goal: null,
  activityLevel: null,
  targetWeight: '',
  pastFailureReason: '',
}

export const useCreateNewPlanStore = create<NewPlanStore>()(
  devtools(
    set => ({
      params: emptyParams,
      setNewPlanParam: (key, value) =>
        set(state => {
          const updatedParams = { ...state.params, [key]: value }
          return { params: updatedParams }
        }),

      setEmpty: () =>
        set(() => {
          return { params: emptyParams }
        }),
    }),
    { name: 'new-plan-store' }
  )
)
