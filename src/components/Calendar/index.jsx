import React, { useState } from 'react'
import useCalendar from '../../hooks/useCalendar'
import classes from './styles.module.css'

const actualDate = new Date()

export const Calendar = () => {
  const [date, setDate] = useState(actualDate)
  const {
    monthName,
    weekDays,
    daysOfMonth,
    today,
    lastDaysThePastMonth,
    fistDaysOnTheNextMonth
  } = useCalendar({ year: date.getFullYear(), month: date.getMonth() })

  const handleSumMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)))
  }

  const handleRestMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)))
  }

  return (
    <div style={{ height: '100vh' }} key={monthName}>
      <div className={classes.handlers}>
        <div>
          <button
            onClick={handleRestMonth}
            className={classes.handlersButtons}
          >
            👈🏼
          </button>
          <button
            onClick={handleSumMonth}
            className={classes.handlersButtons}
          >
            👉🏼
          </button>
        </div>
        <h1 className={classes.weekDays}>
          {monthName} de {date.getFullYear()}
        </h1>

      </div>
      <div className={classes.calendarContainer}>
        <ol className={classes.weekDaysContainer}>
          {
            weekDays.map(dayName => {
              return (
                <li className={classes.weekDaysCalendar} key={dayName}>
                  <p className={classes.weekDays}>{dayName}</p>
                </li>
              )
            })
          }
        </ol>
        <ol className={classes.datesContainer}>
          {
              lastDaysThePastMonth.map(day => {
                return (
                  <li className={`${classes.cells} ${classes.lastBeforeDays}`} key={day}>
                    <div className={classes.numberDay}>
                      <p>{day + 1}</p>
                    </div>

                  </li>
                )
              })
            }
          {
              daysOfMonth.map(day => {
                const [currentMonth, currentDay, currentYear] = today
                const isToday =
                  currentMonth === monthName &&
                  currentDay === day + 1 &&
                  currentYear === date.getFullYear()
                return (
                  <li className={classes.cells} key={day}>
                    <div className={classes.numberDay}>
                      <p className={`${isToday ? classes.today : null}`}>{day + 1}</p>
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
                      <p>{day + 1}</p>
                    </div>
                  </li>
                )
              })
            }
        </ol>
      </div>
    </div>
  )
}
