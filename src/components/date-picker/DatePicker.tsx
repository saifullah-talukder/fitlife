'use client'

import { HTMLAttributes, useEffect, useState } from 'react'
import CalendarView, { CalendarViewProps } from './CalendarView'
import { SingleDay, getDaysOfMonth, getQuickNavigationMonthItems, getQuickNavigationYearItems } from './Helper'
import MonthHeader from './MonthHeader'
import { isSameMonth } from 'date-fns'
import QuickNavigationView, { QuickNavigationItem } from './QuickNavigationView'
import { DayCellProps } from './DayCell'

type VIEW_MODE = 'day' | 'month' | 'year'

const GRID_ROWS = 5
const GRID_COLUMNS = 3
const GRID_SIZE = GRID_ROWS * GRID_COLUMNS

type DatePickerProps = {} & Pick<CalendarViewProps, 'selectedDate'> &
  Pick<DayCellProps, 'onSelectDate'> &
  HTMLAttributes<HTMLDivElement>

export default function DatePicker(props: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate)
  const [month, setMonth] = useState(props.selectedDate.getMonth())
  const [year, setYear] = useState(props.selectedDate.getFullYear())
  const [mode, setMode] = useState<VIEW_MODE>('day')
  const [days, setDays] = useState<SingleDay[]>([])
  const [quickNavigationItems, setQuickNavigationItems] = useState<QuickNavigationItem[]>([])

  const switchToMonthView = () => {
    if (mode === 'month') {
      setMode('day')
      return
    }
    setQuickNavigationItems(getQuickNavigationMonthItems())
    setMode('month')
  }

  const switchToYearView = () => {
    if (mode === 'year') {
      setMode('day')
      return
    }
    setQuickNavigationItems(getQuickNavigationYearItems(year))
    setMode('year')
  }

  const onNavigationItemClick = (tag: number) => {
    if (mode === 'month') {
      setMonth(tag)
    } else if (mode === 'year') {
      setYear(tag)
    }
    setMode('day')
  }

  const onSelectDate = (date: Date) => {
    setSelectedDate(date)
    if (!isSameMonth(date, new Date(year, month, 1))) {
      setMonth(date.getMonth())
      setYear(date.getFullYear())
    }
    props.onSelectDate(date)
  }

  const onNextButtonClick = () => {
    if (mode === 'day') {
      setMonth((month + 1) % 12)
    } else if (mode === 'month') {
      setYear(year + 1)
    } else if (mode === 'year') {
      const updatedYear = year + GRID_SIZE
      setYear(updatedYear)
      setQuickNavigationItems(getQuickNavigationYearItems(updatedYear))
    }
  }
  const onPreviousButtonClick = () => {
    if (mode === 'day') {
      setMonth(!month ? 11 : month - 1)
    } else if (mode === 'month') {
      setYear(year - 1)
    } else if (mode === 'year') {
      const updatedYear = year - GRID_SIZE
      setYear(updatedYear)
      setQuickNavigationItems(getQuickNavigationYearItems(updatedYear))
    }
  }

  useEffect(() => {
    if (mode === 'day') {
      setDays(getDaysOfMonth(month, year))
    }
  }, [month, year, mode])

  return (
    <div className="flex flex-col w-full">
      <MonthHeader
        month={month}
        year={year}
        onNextClick={onNextButtonClick}
        onPreviousClick={onPreviousButtonClick}
        onMonthClick={switchToMonthView}
        onYearClick={switchToYearView}
      />

      {mode === 'day' && <CalendarView onSelectDate={onSelectDate} selectedDate={selectedDate} days={days} />}
      {mode !== 'day' && <QuickNavigationView onItemClick={onNavigationItemClick} items={quickNavigationItems} />}
    </div>
  )
}
