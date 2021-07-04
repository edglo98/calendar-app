import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import LoginView from '../pages/auth/Login'
import CalendarView from '../pages/calendar'
import { RoutesPaths } from './RoutesPaths'

export default function Routes () {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={RoutesPaths.login} component={LoginView} />
          <Route exact path={RoutesPaths.home} component={CalendarView} />
          <Redirect to={RoutesPaths.home} />
        </Switch>
      </div>
    </Router>
  )
}
