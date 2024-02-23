import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { NewPlanParams, emptyNewPlanParams } from './useCreateNewPlanStore'

export type Plan = {
  meal: string | undefined
  workout: string | undefined
}

export type NewPlanResponse = {
  planId: string
  userId: string
  params: NewPlanParams
  plan: Plan
  createdAt: string
}

type NewPlanResponseStore = {
  response: NewPlanResponse
  error: string
  setNewPlanResponse: (res: NewPlanResponse) => void
  setEmpty: () => void
  setError: (err: string) => void
}

const emptyResponse: NewPlanResponse = {
  planId: '',
  userId: '',
  params: emptyNewPlanParams,
  plan: {
    meal: undefined,
    workout: undefined,
  },
  createdAt: '',
}

export const useNewPlanResponseStore = create<NewPlanResponseStore>()(
  devtools(
    set => ({
      response: emptyResponse,
      error: '',
      setNewPlanResponse: res =>
        set(state => {
          return { response: res, error: '' }
        }),

      setEmpty: () =>
        set(() => {
          return { response: emptyResponse, error: '' }
        }),

      setError: (err: string) =>
        set(() => {
          return { error: err }
        }),
    }),
    { name: 'new-plan-response-store' }
  )
)
