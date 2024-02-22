'use client'

import React from 'react'
import NavigationArrowButton from './NavigationArrowButton'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { format } from 'date-fns'

type MonthHeaderProps = {
  month: number // 0 indexed
  year: number
  onNextClick: () => void
  onPreviousClick: () => void
  onMonthClick: () => void
  onYearClick: () => void
}

export default function MonthHeader(props: MonthHeaderProps) {
  const firstDayOfMonth = new Date(props.year, props.month, 1)
  const monthLabel = format(firstDayOfMonth, 'MMMM')

  return (
    <div className="flex flex-row w-full items-center">
      <div className="grow flex flex-col items-start">
        <div className="flex items-center text-slate-600 font-semibold text-sm space-x-2">
          <button onClick={props.onMonthClick} className="py-1 transition duration-300 hover:text-primary">
            {monthLabel}
          </button>
          <button onClick={props.onYearClick} className="py-1 transition duration-300 hover:text-primary">
            {props.year}
          </button>
        </div>
        {/* <span className="text-slate-400 font-light text-xs">Select a date from the calendar</span> */}
      </div>
      <div className="shrink-0 flex gap-x-1">
        <NavigationArrowButton onClick={e => props.onPreviousClick()}>
          <FiChevronLeft size={14} />
        </NavigationArrowButton>
        <NavigationArrowButton onClick={e => props.onNextClick()}>
          <FiChevronRight size={14} />
        </NavigationArrowButton>
      </div>
    </div>
  )
}
