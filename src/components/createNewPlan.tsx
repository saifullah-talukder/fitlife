import { useNewPlanResponseStore } from '@/stores/useNewPlanResponseStore'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FitnessGoal from './fitnessGoal'
import PersonalInfo from './personalInfo'
import PlanCard from './planCard'

type CreateNewPlanProps = HTMLAttributes<HTMLDivElement> & {}

export default function CreateNewPlan(props: CreateNewPlanProps) {
  const { response, error } = useNewPlanResponseStore()

  if (!!error) {
    return <p className="text-sm text-center text-red-500">{error}</p>
  }

  return (
    <>
      {!!response.planId ? (
        <PlanCard />
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
