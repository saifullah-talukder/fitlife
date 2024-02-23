import { NewPlanResponse } from '@/stores/useNewPlanResponseStore'
import { Dispatch, SetStateAction } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { PrimaryActionButton } from './button'
import { PlanCardSmall } from './planCard'

type HistoryProps = {
  setFetchFlag: Dispatch<SetStateAction<number>>
  plans: NewPlanResponse[]
  error: string
  isLoading: boolean
}

export default function History(props: HistoryProps) {
  const { setFetchFlag, plans, error, isLoading } = props

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        {!!isLoading && <p className="text-slate-700">Loading... please wait!</p>}
        {!!error && <p className="text-red-500">Failed to load your plans. Please try again later!</p>}
        {!isLoading && !error && <p className="text-slate-700">{`You have made ${plans?.length} plans so far!`}</p>}
        <PrimaryActionButton
          label="Refresh"
          iconLeft={<IoMdRefresh size={18} />}
          onClick={() => setFetchFlag(prev => prev + 1)}
        />
      </div>
      {!isLoading && !error && (
        <div className="flex flex-col">
          {plans?.map((plan, index) => (
            <PlanCardSmall key={`plan-${index}`} plan={plan} />
          ))}
        </div>
      )}
    </div>
  )
}
