import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type LabeledInformationProps = {
  label: string
  value: string | ReactNode
  icon?: ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function LabeledInformation(props: LabeledInformationProps) {
  const hasIcon = !!props.icon

  return (
    <div className={twMerge('flex w-full', props.className)}>
      {hasIcon && <div className="mr-2 mt-px shrink-0 text-slate-700 text-opacity-70">{props.icon}</div>}

      <div className="flex flex-col items-start gap-y-1 grow">
        <span className="whitespace-nowrap text-sm font-medium text-slate-700 text-opacity-70">{props.label}</span>
        <div className="flex items-center gap-x-2 w-full">
          <span className="line-clamp-3 break-words text-sm font-normal text-slate-700">{props.value}</span>
        </div>
      </div>
    </div>
  )
}
