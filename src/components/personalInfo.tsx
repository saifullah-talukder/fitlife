import { sexItems } from '@/constants/app'
import { countryList } from '@/constants/country'
import { useCreateNewPlanStore } from '@/stores/useCreateNewPlanStore'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { DateSelectField, SelectInputField, TextInputField } from './form'

type PersonalInfoProps = HTMLAttributes<HTMLDivElement> & {}

export default function PersonalInfo(props: PersonalInfoProps) {
  const { params, setNewPlanParam } = useCreateNewPlanStore()

  return (
    <div className={twMerge('w-full', props.className)}>
      <h2 className="text-slate-700 font-medium">{`Personal Information`}</h2>
      <div className="mt-2 grid grid-cols-1 gap-4">
        <DateSelectField
          className="w-full"
          label="Birthdate"
          placeholder="Select your birth date..."
          selectedDate={params.birthDate ? new Date(params.birthDate) : null}
          onSelectDate={date => setNewPlanParam('birthDate', String(date))}
          onClear={() => setNewPlanParam('birthDate', null)}
        />
        <SelectInputField
          label="Sex"
          items={sexItems}
          placeholder="Select your sex..."
          onItemSelect={item => setNewPlanParam('sex', item._id)}
          size="md"
          onClear={() => setNewPlanParam('sex', null)}
          isClearable={true}
        />
        <SelectInputField
          label="Country"
          items={countryList.map(country => {
            return { _id: country.name, name: country.name }
          })}
          placeholder="Select your country..."
          onItemSelect={item => setNewPlanParam('country', item._id)}
          size="md"
          onClear={() => setNewPlanParam('country', '')}
          isClearable={true}
        />
        <TextInputField
          label="Height (cm)"
          placeholder={`Enter you height in cm ...`}
          onTextChange={text => setNewPlanParam('height', text)}
          size="md"
          validationSchema={z.coerce.number()}
        />
        <TextInputField
          label="Weight (kg)"
          placeholder={`Enter you wight in kg ...`}
          onTextChange={text => setNewPlanParam('weight', text)}
          size="md"
          validationSchema={z.coerce.number()}
        />
      </div>
    </div>
  )
}
