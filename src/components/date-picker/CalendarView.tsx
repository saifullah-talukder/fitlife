import React, { HTMLAttributes } from 'react'
import Weekdays from './Weekdays'
import { SingleDay } from './Helper'
import DayCell, { DayCellProps } from './DayCell'
import { isSameDay } from 'date-fns'

export type CalendarViewProps = {
  days: SingleDay[]
  selectedDate: Date
} & Pick<DayCellProps, 'onSelectDate'> &
  HTMLAttributes<HTMLDivElement>

export default function CalendarView(props: CalendarViewProps) {
  return (
    <div className="flex flex-col">
      <Weekdays className="mt-4" />
      <div className="grid grid-cols-7 gap-0.5">
        {props.days.map((c, i) => (
          <DayCell
            key={i}
            {...c}
            onSelectDate={props.onSelectDate}
            isSelected={isSameDay(props.selectedDate, c.date)}
          />
        ))}
      </div>
    </div>
  )
}
