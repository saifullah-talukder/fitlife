import { useNewPlanResponseStore } from '@/stores/useNewPlanResponseStore'
import { differenceInYears, format } from 'date-fns'
import { capitalize } from 'lodash'
import { PrimaryActionButton } from './button'
import LabeledInformation from './labelledInformation'

export default function PlanCard() {
  const { response, setEmpty } = useNewPlanResponseStore()

  return (
    <div className="mt-4 w-full flex flex-col border border-fuchsia-300 p-4 rounded-lg">
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="space-y-4">
          <LabeledInformation label="Age" value={differenceInYears(new Date(), new Date(response.params.birthDate!))} />
          <LabeledInformation label="Sex" value={capitalize(response.params.sex)} />
          <LabeledInformation label="Country" value={capitalize(response.params.country)} />
          <LabeledInformation label="Height (cm)" value={capitalize(response.params.height)} />
          <LabeledInformation label="Weight (kg)" value={capitalize(response.params.weight)} />
          <LabeledInformation label="Goal" value={`${capitalize(response.params.goal)} weight`} />
          <LabeledInformation label="Activity Level" value={capitalize(response.params.activityLevel)} />
          <LabeledInformation label="Target Weight (kg)" value={capitalize(response.params.targetWeight)} />
          <LabeledInformation label="Reason for Past Failure" value={capitalize(response.params.pastFailureReason)} />
          <LabeledInformation label="Requested At" value={getFormattedTimeString(response.createdAt)} />
        </div>

        <div>
          <h2 className="font-medium text-slate-700 text-opacity-70">Your Meal Recommendation</h2>
          <div className="mt-2 space-y-2">{stringToHtml(response.plan.meal!)}</div>
        </div>

        <div>
          <h2 className="font-medium text-slate-700 text-opacity-70">Your Workout Recommendation</h2>
          <div className="mt-2 space-y-2">{stringToHtml(response.plan.workout!)}</div>
        </div>
      </div>
      <PrimaryActionButton className="mt-8" label="Make Another Plan" onClick={setEmpty} />
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

function getFormattedTimeString(isoTime: string, pattern = 'd MMM yyyy, h:mm a') {
  if (!isoTime) return 'N/A'
  return format(new Date(isoTime), pattern)
}