import React from 'react'

export default function CalendarView () {
  const rangeList = (numberOnList) => {
    return [...Array(numberOnList).keys()]
  }

  const yearCalendar = 2021
  const locale = 'es'
  const months = rangeList(12)
  const intlMonth = new Intl.DateTimeFormat(locale, { month: 'long' })
  const weekDays = rangeList(7)
  const intlWeekDay = new Intl.DateTimeFormat(locale, { weekday: 'long' })

  const calendarMonths = months.map(monthKey => {
    const nextMonthKey = monthKey + 1
    const monthName = intlMonth.format(new Date(yearCalendar, monthKey))
    const daysOfMonth = new Date(yearCalendar, nextMonthKey, 0).getDate()
    const startOn = new Date(yearCalendar, monthKey, 1).getDay()
    return {
      monthName,
      daysOfMonth,
      startOn
    }
  })

  const calendarWeekDay = weekDays.map(dayKey => {
    return intlWeekDay.format(new Date(2021, 1, dayKey))
  })

  return (
    <div>
      {
        calendarMonths.map(({ monthName, daysOfMonth, startOn }) => (
          <div key={monthName}>
            <h1>
              {monthName} - {yearCalendar}
            </h1>
            <ol>
              {
                calendarWeekDay.map(dayName => {
                  return (
                    <li key={dayName}>
                      {dayName}
                    </li>
                  )
                })
              }
              {
                rangeList(daysOfMonth).map(day => {
                  return (
                    <li key={day}>
                      {day + 1}
                    </li>
                  )
                })
              }
            </ol>
          </div>
        ))
      }
    </div>
  )
}
