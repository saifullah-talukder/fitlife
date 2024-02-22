import React, { HTMLAttributes } from 'react'
import { SingleDay } from './Helper'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export type DayCellProps = SingleDay & {
  isSelected: boolean
  onSelectDate: (date: Date) => void
} & HTMLAttributes<HTMLDivElement>

export default function DayCell(props: DayCellProps) {
  const dateLabel = format(props.date, 'd')

  return (
    <div
      className={classNames(
        'col-span-1 flex justify-center items-center rounded-full transition duration-300 hover:bg-primary/10 cursor-pointer aspect-square',
        {
          'bg-primary/10 border border-primary': props.isSelected,
          'bg-transparent border border-transparent': !props.isSelected,
        }
      )}
      onClick={e => props.onSelectDate(props.date)}
    >
      <span
        className={twMerge(
          classNames('text-sm font-normal select-none', {
            'text-slate-800': props.enabled,
            'text-slate-400': !props.enabled,
            'text-primary': props.isSelected,
          })
        )}
      >
        {dateLabel}
      </span>
    </div>
  )
}
