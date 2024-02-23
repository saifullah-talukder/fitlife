import { activityLevelItems, goalItems } from '@/constants/app'
import { createAxiosClient } from '@/network/createAxiosClient'
import { NewPlanParams, useCreateNewPlanStore } from '@/stores/useCreateNewPlanStore'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import * as Auth from 'aws-amplify/auth'
import { HTMLAttributes, useMemo } from 'react'
import { MdDoneAll } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { PrimaryActionButton } from './button'
import { SelectInputField, TextInputField } from './form'
import { AxiosClient } from '@/network/AxiosClient'

type FitnessGoalProps = {} & HTMLAttributes<HTMLDivElement>

export default function FitnessGoal(props: FitnessGoalProps) {
  const { params, setNewPlanParam } = useCreateNewPlanStore()
  const { user } = useUserInfoStore()

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
    // console.log(JSON.stringify(params))
    const tokens = await Auth.fetchAuthSession()
    console.log(tokens?.tokens?.accessToken.toString())
    // const AxiosClient = createAxiosClient(tokens)
    AxiosClient.post(process.env.NEW_PLAN_API_URL!, {
      userId: user.userId,
      params,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const printToken = async () => {
    // console.log(JSON.stringify(params))
    const tokens = await Auth.fetchAuthSession()
    // console.log(tokens?.tokens?.accessToken.toString())
    console.log(tokens)
    console.log(tokens?.tokens?.idToken?.toString())
  }

  printToken()

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
          label="Target Weight"
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
        />
      </div>
    </div>
  )
}
