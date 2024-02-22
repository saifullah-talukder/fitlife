import { add, format, getDay, sub } from 'date-fns'
import { QuickNavigationItem } from './QuickNavigationView'

export type SingleDay = {
  date: Date
  enabled: boolean
}

function getWeekdayFromDate(date: Date) {
  const weekLength = 7
  return (getDay(date) + 1) % weekLength // start week from Saturday
}

/**
 *
 * @param month 0 indexed
 * @param year
 */
export function getDaysOfMonth(month: number, year: number) {
  const firstDay = new Date(year, month, 1, 12) // init at 12 PM to avoid TimeZone confusion
  const distanceFromStartOfWeek = getWeekdayFromDate(firstDay)

  const days: SingleDay[] = []
  for (let i = 1; i <= distanceFromStartOfWeek; i++) {
    const temp = sub(firstDay, { days: i })
    days.unshift({ date: temp, enabled: false })
  }

  const rows = 6
  const columns = 7
  let distanceFromMonthStart = 0
  while (days.length < rows * columns) {
    const temp = add(firstDay, { days: distanceFromMonthStart })
    const isInCurrentMonth = temp.getMonth() === month
    days.push({ date: temp, enabled: isInCurrentMonth })
    distanceFromMonthStart++
  }

  /**
   * If the last row is completely out of the current month,
   * then remove the last row elements
   */
  const lastWeekStartPos = (rows - 1) * columns
  if (month !== days[lastWeekStartPos].date.getMonth()) {
    new Array(columns).fill(0).map(ignore => days.pop())
  }

  return days
}

export function getQuickNavigationMonthItems() {
  const aRandomYear = 2020
  const ret: QuickNavigationItem[] = []
  let currentMonth = new Date(aRandomYear, 0, 2, 10) // make it 10 am to avoid any TimeZone nonsense issues
  while (currentMonth.getFullYear() === aRandomYear) {
    ret.push({ label: format(currentMonth, 'MMMM'), tag: currentMonth.getMonth() })
    currentMonth = add(currentMonth, { months: 1 })
  }
  return ret
}

export function getQuickNavigationYearItems(middleYear: number) {
  const ret: QuickNavigationItem[] = []
  // imagine a 5 X 3 grid where the middleYear is at the center
  const columns = 3
  const offsetRows = 2
  const paddingLength = offsetRows * columns + 1
  const startingYear = middleYear - paddingLength
  const endingYear = middleYear + paddingLength
  for (let i = startingYear; i <= endingYear; i++) {
    ret.push({ label: `${i}`, tag: i })
  }
  return ret
}
