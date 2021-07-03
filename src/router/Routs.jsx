import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import LoginView from '../pages/auth/login'
import CalendarView from '../pages/calendar'

export default function Routs () {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/login' component={LoginView} />
          <Route exact path='/' component={CalendarView} />

          <Redirect to='/' />
        </Switch>
      </div>
    </Router>
  )
}
