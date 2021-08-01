import React from 'react'
import classes from './styles.module.css'

export default function CalendarView () {
  const rangeList = (numberOnList) => {
    return [...Array(numberOnList).keys()]
  }
  const todayDate = new Date()
  const yearCalendar = 2021
  const locale = 'es'
  const months = rangeList(12)
  const intlMonth = new Intl.DateTimeFormat(locale, { month: 'long' })
  const weekDays = rangeList(7)
  const intlWeekDay = new Intl.DateTimeFormat(locale, { weekday: 'long' })

  const calendarMonths = months.map(monthKey => {
    const nextMonthKey = monthKey + 1
    const startOn = new Date(yearCalendar, monthKey, 1).getDay()
    const endOn = new Date(yearCalendar, nextMonthKey, 0).getDay()
    const lastDayThePastMonth = new Date(yearCalendar, monthKey, 0).getDate()
    const monthName = intlMonth.format(new Date(yearCalendar, monthKey))
    const daysOfMonth = new Date(yearCalendar, nextMonthKey, 0).getDate()
    const lastDaysThePastMonth = rangeList(startOn).map(key => lastDayThePastMonth - (key + 1)).reverse()
    const fistDaysOnTheNextMonth = rangeList(7 - (endOn + 1))
    return {
      monthName,
      daysOfMonth,
      lastDaysThePastMonth,
      fistDaysOnTheNextMonth
    }
  })

  const calendarWeekDay = weekDays.map(dayKey => {
    return intlWeekDay.format(new Date(2021, 1, dayKey))
  })

  const today = [intlMonth.format(todayDate), todayDate.getDate(), todayDate.getFullYear()]

  return (
    <div style={{ padding: 8 }}>
      {
        calendarMonths.map(({
          monthName,
          daysOfMonth,
          lastDaysThePastMonth,
          fistDaysOnTheNextMonth
        }) => (
          <div key={monthName}>
            <h1 style={{ padding: '35px 0px 5px' }}>
              {monthName} - {yearCalendar}
            </h1>
            <ol className={classes.calendarContainer}>
              {
                calendarWeekDay.map(dayName => {
                  return (
                    <li key={dayName}>
                      <p className={classes.weekDays}>{dayName}</p>
                    </li>
                  )
                })
              }
              {
                lastDaysThePastMonth.map(day => {
                  return (
                    <li className={`${classes.cells} ${classes.lastBeforeDays}`} key={day}>
                      <div className={classes.numberDay}>
                        <span>{day + 1}</span>
                      </div>

                    </li>
                  )
                })
              }
              {
                rangeList(daysOfMonth).map(day => {
                  const [currentMonth, currentDay, currentYear] = today
                  const isToday =
                    currentMonth === monthName &&
                    currentDay === day + 1 &&
                    currentYear === yearCalendar
                  return (
                    <li className={classes.cells} key={day}>
                      <div className={classes.numberDay}>
                        <span className={`${isToday ? classes.today : null}`}>{day + 1}</span>
                      </div>
                      {
                        isToday
                          ? <div className={classes.task}><span>Hola soy una nota muuuuuy larga</span></div>
                          : null
                      }
                      {
                        isToday
                          ? <div className={classes.task}><span>Hola soy una nota muuuuuy larga</span></div>
                          : null
                      }

                    </li>
                  )
                })
              }
              {
                fistDaysOnTheNextMonth.map(day => {
                  return (
                    <li className={`${classes.cells} ${classes.lastBeforeDays}`} key={day}>
                      <div className={classes.numberDay}>
                        <span>{day + 1}</span>
                      </div>
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
