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

type ParamsValidation = {
  errorMessage: string
  isValid: boolean
}

type NewPlanStore = {
  params: NewPlanParams
  validation: ParamsValidation
  setNewPlanParam: <T extends keyof NewPlanParams>(key: T, value: NewPlanParams[T]) => void
  setEmpty: () => void
}

export const emptyNewPlanParams: NewPlanParams = {
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

const initValidation = {
  errorMessage: '',
  isValid: true,
}

export const useCreateNewPlanStore = create<NewPlanStore>()(
  devtools(
    set => ({
      params: emptyNewPlanParams,
      validation: initValidation,
      setNewPlanParam: (key, value) =>
        set(state => {
          const updatedParams = { ...state.params, [key]: value }
          return { params: updatedParams, validation: validateParams(updatedParams) }
        }),

      setEmpty: () =>
        set(() => {
          return { params: emptyNewPlanParams }
        }),
    }),
    { name: 'create-new-plan-store' }
  )
)

function validateParams(params: NewPlanParams): ParamsValidation {
  const validation = { errorMessage: '', isValid: true }

  if (!!params.birthDate && new Date(params.birthDate) > new Date()) {
    validation.errorMessage = `Birth date can not be after this day. `
    validation.isValid = false
  }

  if (!!params.goal && !!params.targetWeight && !!params.weight) {
    if (params.goal === 'gain' && params.weight >= params.targetWeight) {
      validation.errorMessage = `${validation.errorMessage}Target weight must be higher than current weight if you goal is to gain weight. `
      validation.isValid = false
    }
    if (params.goal === 'lose' && params.weight < params.targetWeight) {
      validation.errorMessage = `${validation.errorMessage}Target weight must be less than current weight if you goal is to lose weight.`
      validation.isValid = false
    }
  }

  return validation
}
