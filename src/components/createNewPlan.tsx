import { useNewPlanResponseStore } from '@/stores/useNewPlanResponseStore'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { PrimaryActionButton } from './button'
import FitnessGoal from './fitnessGoal'
import PersonalInfo from './personalInfo'
import { PlanCardDetails } from './planCard'

type CreateNewPlanProps = HTMLAttributes<HTMLDivElement> & {}

export default function CreateNewPlan(props: CreateNewPlanProps) {
  const { response, error, setEmpty } = useNewPlanResponseStore()

  if (!!error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  return (
    <>
      {!!response.planId ? (
        <div className="w-full relative">
          <PlanCardDetails plan={response} />
          <div className="h-14"></div>
          <PrimaryActionButton className="absolute right-0 bottom-0" label="Make Another Plan" onClick={setEmpty} />
        </div>
      ) : (
        <div className={twMerge('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-4', props.className)}>
          <PersonalInfo />
          <div className="hidden xl:block"></div>
          <FitnessGoal />
        </div>
      )}
    </>
  )
}
