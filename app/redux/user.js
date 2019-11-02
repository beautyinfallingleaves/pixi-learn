import axios from 'axios'

// ****** INITIAL STATE *****
const initialState = {}

// ****** ACTION TYPES ******
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

// ****** ACTION CREATORS ******
export const setUser = (user) => ({
  type: SET_USER,
  user,
})

export const removeUser = () => ({
  type: REMOVE_USER,
})

// ****** THUNK CREATIORS ******
export const me = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/auth/me')
    dispatch(setUser(data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, history) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/local/${method}`, {email, password})
  } catch (authError) {
    return dispatch(setUser({error: authError}))
  }

  try {
    dispatch(setUser(res.data))
    history.pushState('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = (history) => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.pushState('/login')
  } catch (err) {
    console.error(err)
  }
}

// ****** REDUCER ******
const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export default user
