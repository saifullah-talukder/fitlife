import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import FitnessGoal from './fitnessGoal'
import PersonalInfo from './personalInfo'

type CreateNewPlanProps = HTMLAttributes<HTMLDivElement> & {}

export default function CreateNewPlan(props: CreateNewPlanProps) {
  return (
    <div className={twMerge('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 pt-4', props.className)}>
      <PersonalInfo />
      <div className="hidden xl:block"></div>
      <FitnessGoal />
    </div>
  )
}
