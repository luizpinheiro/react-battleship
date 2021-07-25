import React from 'react'

import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/:peerId" component={App} exact />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
