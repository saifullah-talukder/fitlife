import { useCreateNewPlanStore } from '@/stores/useCreateNewPlanStore'
import { useNewPlanResponseStore } from '@/stores/useNewPlanResponseStore'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { PrimaryActionButton } from './button'
import FitnessGoal from './fitnessGoal'
import PersonalInfo from './personalInfo'
import { PlanCardDetails } from './planCard'

type CreateNewPlanProps = HTMLAttributes<HTMLDivElement> & {}

export default function CreateNewPlan(props: CreateNewPlanProps) {
  const { response, error, setEmpty, setError } = useNewPlanResponseStore()
  const { validation } = useCreateNewPlanStore()

  if (!!error) {
    return (
      <div>
        <p className="text-center text-red-500">{error}</p>
        <div className="flex justify-center mt-4">
          <PrimaryActionButton
            label="Make Another Plan"
            onClick={() => {
              setEmpty()
              setError('')
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {!!response.planId ? (
        <div className={twMerge('w-full relative', props.className)}>
          <PlanCardDetails plan={response} />
          <div className="h-14"></div>
          <PrimaryActionButton className="absolute right-0 bottom-0" label="Make Another Plan" onClick={setEmpty} />
        </div>
      ) : (
        <div className={twMerge('w-full pt-4', props.className)}>
          {!validation.isValid && (
            <p className="text-xs md:text-sm text-red-500">
              <span className="font-semibold">Error: </span>
              {validation.errorMessage}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-2">
            <PersonalInfo />
            <div className="hidden xl:block"></div>
            <FitnessGoal />
          </div>
        </div>
      )}
    </>
  )
}
