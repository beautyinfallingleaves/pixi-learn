import '../public/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux'
import Users from './components/Users'

ReactDOM.render(
  <Provider store={store}>
    <Users />
  </Provider>,
  document.getElementById('app')
)
