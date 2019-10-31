import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// Import individual reducers for combining
import users from './users'

const appReducer = combineReducers({
  users,
})

let middleware = [
  thunkMiddleware,
]

if (process.browser) {
  middleware = [...middleware, createLogger({ collapsed: true })]
}

export default createStore(
  appReducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
)
