import '../public/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux'
import Users from './components/Users'
import Login from './components/Login'

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Users />
      <Login />
    </div>
  </Provider>,
  document.getElementById('app')
)
