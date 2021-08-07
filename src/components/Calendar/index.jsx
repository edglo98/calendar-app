import React, { useEffect, useState } from 'react'
import useCalendar from '../../hooks/useCalendar'
import classes from './styles.module.css'

const actualDate = new Date()

const parseDate = (date) => {
  const d = date
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
  return `${ye}-${mo}-${da}T00:00:00`
}

export const Calendar = ({ events = [] }) => {
  const [continues, setContinues] = useState(events)
  const [date, setDate] = useState(actualDate)

  const {
    monthName,
    weekDays,
    daysOfMonth,
    lastDaysThePastMonth,
    fistDaysOnTheNextMonth
  } = useCalendar({ year: date.getFullYear(), month: date.getMonth() })

  useEffect(() => {
    events.forEach(event => {
      const dateStart = new Date(event.start)
      const dateEnd = new Date(event.end)
      const diferentsDays = dateEnd.getDate() - dateStart.getDate()
      const daysCanPrint = (6 - dateStart.getDay()) + 1

      if ((diferentsDays - daysCanPrint) > 0) {
        const continueEventDate = new Date(event.start)
        const startNewEvent = new Date(continueEventDate.setDate(continueEventDate.getDate() + daysCanPrint))
        const endContinueEventDate = new Date(startNewEvent)
        const endNewEvent = new Date(endContinueEventDate.setDate(endContinueEventDate.getDate() + (diferentsDays - daysCanPrint)))
        // console.log(parseDate(startNewEvent), parseDate(endNewEvent))

        setContinues([...continues, { ...event, start: parseDate(startNewEvent), end: parseDate(endNewEvent), id: event.id + '1' }])
      }
    })

    return () => {
      setContinues([])
    }
  }, [])

  const handleSumMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)))
  }

  const handleRestMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)))
  }

  const eventsOnMonth = continues.filter(event => {
    const eventDate = new Date(event.start)
    return eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear()
  })

  return (
    <div style={{ height: '100vh', flex: 1, display: 'flex', flexDirection: 'column' }} key={monthName}>
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
                const isToday =
                  date.getMonth() === actualDate.getMonth() &&
                  date.getDate() === day + 1 &&
                  date.getFullYear() === actualDate.getFullYear()

                const eventesOnDay = eventsOnMonth.filter(event => {
                  const dateEvent = new Date(event.start)
                  return dateEvent.getDate() === day + 1
                })

                return (
                  <li className={classes.cells} key={day}>
                    <div className={classes.numberDay}>
                      <p className={`${isToday ? classes.today : null}`}>{day + 1}</p>
                    </div>
                    {
                      eventesOnDay.map(event => {
                        const dateStart = new Date(event.start)
                        const dateEnd = new Date(event.end)
                        const diferentsDays = dateEnd.getDate() - dateStart.getDate()
                        const daysCanPrint = (6 - dateStart.getDay()) + 1

                        const size = dateStart.getDay() === 5 || diferentsDays <= 5 - dateStart.getDay() ? '100%' : `${daysCanPrint}05%`

                        return <div key={event.id} style={{ width: size, zIndex: 1 }} className={classes.task}><span>{event.title}</span></div>
                      })
                    }
                  </li>
                )
              })
            }
          {/* {
              continues.map(day => {
                const isToday =
                  date.getMonth() === actualDate.getMonth() &&
                  date.getDate() === day + 1 &&
                  date.getFullYear() === actualDate.getFullYear()

                const eventesOnDay = eventsOnMonth.filter(event => {
                  const dateEvent = new Date(event.start)
                  return dateEvent.getDate() === day + 1
                })

                return (
                  <li className={classes.cells} key={day}>
                    <div className={classes.numberDay}>
                      <p className={`${isToday ? classes.today : null}`}>{day + 1}</p>
                    </div>
                    {
                      eventesOnDay.map(event => {
                        const dateStart = new Date(event.start)
                        const dateEnd = new Date(event.end)
                        const diferentsDays = dateEnd.getDate() - dateStart.getDate()
                        const daysCanPrint = (6 - dateStart.getDay()) + 1 // tengo que sumarle esto a la fecha actual para obtener la fecha en la que continua
                        // console.log(dateStart.getDay())

                        if ((diferentsDays - daysCanPrint) > 0) {
                          const continueEventDate = new Date(event.start)
                          const startNewEvent = new Date(continueEventDate.setDate(continueEventDate.getDate() + daysCanPrint))
                          const endContinueEventDate = new Date(startNewEvent)
                          const endNewEvent = new Date(endContinueEventDate.setDate(endContinueEventDate.getDate() + (diferentsDays - daysCanPrint)))
                          // console.log({ startNewEvent, endNewEvent })
                        }
                        // console.log('diferencias', diferentsDays)
                        // console.log('disa que le faltan por contar', diferentsDays - daysCanPrint)
                        const size = dateStart.getDay() === 5 || diferentsDays <= 5 - dateStart.getDay() ? '100%' : `${daysCanPrint}05%`

                        return <div key={event.id} style={{ width: size, zIndex: 1 }} className={classes.task}><span>{event.title}</span></div>
                      })
                    }
                  </li>
                )
              })
            } */}
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
