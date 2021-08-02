import { rangeList } from '../utils/general'

const useCalendar = ({ year, month }) => {
  const locale = 'es'
  const todayDate = new Date()
  const intlMonth = new Intl.DateTimeFormat(locale, { month: 'long' })
  const intlWeekDay = new Intl.DateTimeFormat(locale, { weekday: 'long' })

  const nextmonth = month + 1
  const startOn = new Date(year, month, 1).getDay()
  const endOn = new Date(year, nextmonth, 0).getDay()
  const lastDayThePastMonth = new Date(year, month, 0).getDate()
  const monthName = intlMonth.format(new Date(year, month))
  const numberDaysOfMonth = new Date(year, nextmonth, 0).getDate()
  const daysOfMonth = rangeList(numberDaysOfMonth)
  const lastDaysThePastMonth = rangeList(startOn).map(key => lastDayThePastMonth - (key + 1)).reverse()
  const fistDaysOnTheNextMonth = rangeList(7 - (endOn + 1))

  const weekDays = rangeList(7).map(dayKey => {
    return intlWeekDay.format(new Date(2021, 1, dayKey))
  })

  const today = [intlMonth.format(todayDate), todayDate.getDate(), todayDate.getFullYear()]

  return {
    monthName,
    weekDays,
    daysOfMonth,
    today,
    lastDaysThePastMonth,
    fistDaysOnTheNextMonth
  }
}

export default useCalendar
