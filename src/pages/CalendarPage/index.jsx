import React from 'react'
import { Calendar } from '../../components/Calendar'

export default function CalendarView () {
  const events = [
    {
      id: '231nujsda',
      title: 'evento nuevo',
      description: 'Descripccion del evento',
      start: '2021-08-30T12:00:00',
      end: '2021-08-30T13:00:00',
      allDay: false,
      resource: ''
    },
    {
      id: 'gregr',
      title: 'evento nuevo',
      description: 'Descripccion del evento',
      start: '2021-08-24T12:00:00',
      end: '2021-08-24T13:00:00',
      allDay: false,
      resource: ''
    },
    {
      id: 'fesr',
      title: 'evento nuevo jejeje',
      description: 'Descripccion del evento',
      start: '2021-08-05T12:00:00',
      end: '2021-08-10T13:00:00',
      allDay: false,
      resource: ''
    },
    {
      id: 'gsdfzgd',
      title: 'evento nuevo',
      description: 'Descripccion del evento',
      start: '2021-08-12T12:00:00',
      end: '2021-08-12T13:00:00',
      allDay: false,
      resource: ''
    },
    {
      id: 'njdsand',
      title: 'segundo evento asasa',
      description: 'Descripccion del evento',
      start: '2021-08-12T00:00:00',
      end: '2021-08-14T00:00:00',
      allDay: true,
      resource: ''
    },
    {
      id: 'fewsfes34',
      title: 'segundo evento',
      description: 'Descripccion del evento',
      start: '2021-09-01T00:00:00',
      end: '2021-09-01T00:00:00',
      allDay: false,
      resource: ''
    }
  ]

  // const submit = (e) => {
  //   e.preventDefault()

  //   // const [year, month, day] = e.target[0].value.split('-')
  //   const hour = '12:00:00'
  //   const fecha = `${e.target[0].value}T${hour}`
  //   console.log(fecha)
  //   console.log(new Date(fecha))
  //   // console.log(e.target[0].value + 'T00:00:00')
  //   // console.log(new Date(e.target[0].value + 'T00:00:00'))
  // }

  return (
    // <form onSubmit={submit}>
    //   <div>
    //     <label for='bday'>Enter your birthday:</label>
    //     <input type='date' id='bday' dateformat='d M y' name='bday' required />
    //     <span class='validity' />
    //   </div>
    //   <div>
    //     <input type='submit' />
    //   </div>
    // </form>
    <div style={{ display: 'flex', gap: 10 }}>
      <div style={{ width: '20%' }}>
        options
      </div>
      <Calendar
        events={events}
      />

    </div>
  )
}
