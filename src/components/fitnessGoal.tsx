import { activityLevelItems, goalItems } from '@/constants/app'
import { AxiosClient } from '@/network/AxiosClient'
import { NewPlanParams, useCreateNewPlanStore } from '@/stores/useCreateNewPlanStore'
import { useNewPlanResponseStore } from '@/stores/useNewPlanResponseStore'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { HTMLAttributes, useMemo, useState } from 'react'
import { MdDoneAll } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { string, z } from 'zod'
import { PrimaryActionButton } from './button'
import { SelectInputField, TextInputField } from './form'

type FitnessGoalProps = {} & HTMLAttributes<HTMLDivElement>

export default function FitnessGoal(props: FitnessGoalProps) {
  const { params, setNewPlanParam } = useCreateNewPlanStore()
  const { user } = useUserInfoStore()
  const { setNewPlanResponse, setError } = useNewPlanResponseStore()
  const [isLoading, setIsLoading] = useState(false)

  const isDisabled = useMemo(() => {
    let isDisabled = false
    Object.keys(params).forEach(key => {
      if (!Boolean(params[key as keyof NewPlanParams])) {
        isDisabled = true
      }
    })
    return isDisabled
  }, [params])

  const handleSubmit = async () => {
    setIsLoading(true)
    AxiosClient.post(`${process.env.PLAN_API_URL}/new`, {
      userId: user.userId,
      params,
    })
      .then((res: any) => setNewPlanResponse(res.data))
      .catch((err: any) => setError(String(err)))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className={twMerge('w-full relative', props.className)}>
      <h2 className="text-slate-700 font-medium">{`Your Goal`}</h2>
      <div className="mt-2 grid grid-cols-1 gap-4">
        <SelectInputField
          label="Goal"
          items={goalItems}
          placeholder="Select your goal..."
          onItemSelect={item => setNewPlanParam('goal', item._id)}
          size="md"
          onClear={() => setNewPlanParam('goal', null)}
          isClearable={true}
        />
        <SelectInputField
          label="Activity Level"
          items={activityLevelItems}
          placeholder="Select your activity level..."
          onItemSelect={item => setNewPlanParam('activityLevel', item._id)}
          size="md"
          onClear={() => setNewPlanParam('activityLevel', null)}
          isClearable={true}
        />
        <TextInputField
          label="Target Weight (kg)"
          placeholder={`Enter you target wight in kg ...`}
          onTextChange={text => setNewPlanParam('targetWeight', text)}
          size="md"
          validationSchema={z.coerce.number()}
        />
        <TextInputField
          label="Reason for Past Failure"
          placeholder={`Enter your reason for past failure ...`}
          onTextChange={text => setNewPlanParam('pastFailureReason', text)}
          size="md"
        />
        <PrimaryActionButton
          className="absolute bottom-0 w-full"
          iconLeft={<MdDoneAll size={18} />}
          label="Submit"
          onClick={() => handleSubmit()}
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
