import { NewPlanResponse } from '@/stores/useNewPlanResponseStore'
import { differenceInYears, format } from 'date-fns'
import { capitalize } from 'lodash'
import { HTMLAttributes, useState } from 'react'
import { FaExpandArrowsAlt } from 'react-icons/fa'
import { FaMinimize } from 'react-icons/fa6'
import { twMerge } from 'tailwind-merge'
import { SecondaryActionButton } from './button'
import LabeledInformation from './labelledInformation'

type PlanCardProps = {
  plan: NewPlanResponse
} & HTMLAttributes<HTMLDivElement>

export function PlanCardDetails(props: PlanCardProps) {
  return (
    <div
      className={twMerge(
        'mt-4 w-full grid grid-cols-3 gap-4 border border-fuchsia-300 p-4 rounded-lg',
        props.className
      )}
    >
      <div className="space-y-4">
        <LabeledInformation label="Requested At" value={getFormattedTimeString(props.plan.createdAt)} />
        <LabeledInformation label="Age" value={differenceInYears(new Date(), new Date(props.plan.params.birthDate!))} />
        <LabeledInformation label="Sex" value={capitalize(props.plan.params.sex!)} />
        <LabeledInformation label="Country" value={capitalize(props.plan.params.country)} />
        <LabeledInformation label="Height (cm)" value={capitalize(props.plan.params.height)} />
        <LabeledInformation label="Weight (kg)" value={capitalize(props.plan.params.weight)} />
        <LabeledInformation label="Goal" value={`${capitalize(props.plan.params.goal!)} weight`} />
        <LabeledInformation label="Activity Level" value={capitalize(props.plan.params.activityLevel!)} />
        <LabeledInformation label="Target Weight (kg)" value={capitalize(props.plan.params.targetWeight)} />
        <LabeledInformation label="Reason for Past Failure" value={capitalize(props.plan.params.pastFailureReason)} />
      </div>

      <div>
        <h2 className="font-medium text-slate-700 text-opacity-70">Your Meal Recommendation</h2>
        <div className="mt-2 space-y-2">{stringToHtml(props.plan.plan.meal!)}</div>
      </div>

      <div>
        <h2 className="font-medium text-slate-700 text-opacity-70">Your Workout Recommendation</h2>
        <div className="mt-2 space-y-2">{stringToHtml(props.plan.plan.workout!)}</div>
      </div>
    </div>
  )
}

export function PlanCardSmall(props: PlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  //<PlanCardDetails {...props} />
  return (
    <div className={twMerge('relative w-full', props.className)}>
      {isExpanded ? (
        <PlanCardDetails {...props} />
      ) : (
        <div className="mt-4 w-full grid grid-cols-3 gap-4 border border-fuchsia-300 p-4 rounded-lg">
          <div className="space-y-4">
            <LabeledInformation label="Requested At" value={getFormattedTimeString(props.plan.createdAt)} />
            <LabeledInformation
              label="Age"
              value={differenceInYears(new Date(), new Date(props.plan.params.birthDate!))}
            />
            <LabeledInformation label="Sex" value={capitalize(props.plan.params.sex!)} />
            <LabeledInformation label="Country" value={capitalize(props.plan.params.country)} />
            <LabeledInformation label="Weight (kg)" value={capitalize(props.plan.params.weight)} />
            <LabeledInformation label="Target Weight (kg)" value={capitalize(props.plan.params.targetWeight)} />
          </div>

          <div>
            <h2 className="font-medium text-slate-700 text-opacity-70">Your Meal Recommendation</h2>
            <p className="my-2 text-sm text-slate-700">{getFirstParagraph(props.plan.plan.meal!)} </p>
            <span className="text-sm text-slate-700 font-semibold">expand for details.....</span>
          </div>

          <div>
            <h2 className="font-medium text-slate-700 text-opacity-70">Your Workout Recommendation</h2>
            <p className="mt-2 text-sm text-slate-700">{getFirstParagraph(props.plan.plan.workout!)}</p>
            <span className="text-sm text-slate-700 font-semibold">expand for details.....</span>
          </div>
        </div>
      )}

      <SecondaryActionButton
        className={`absolute bottom-4 ${isExpanded ? 'left-4' : 'right-4'}`}
        iconLeft={isExpanded ? <FaMinimize /> : <FaExpandArrowsAlt />}
        label={isExpanded ? 'Collapse' : 'View Details'}
        onClick={() => setIsExpanded(prev => !prev)}
      />
    </div>
  )
}

function stringToHtml(str: string) {
  const resarr = str.split(/\r?\n/)
  return resarr
    .filter(res => res.length > 0)
    .map((res, index) => (
      <p key={`line-${index}`} className="text-sm text-slate-700">
        {res}
      </p>
    ))
}

function getFirstParagraph(str: string) {
  const resarr = str.split(/\r?\n/)
  return resarr[0]
}

function getFormattedTimeString(isoTime: string, pattern = 'd MMM yyyy, h:mm a') {
  if (!isoTime) return 'N/A'
  return format(new Date(isoTime), pattern)
}
