import axios from 'axios'

// ****** INITIAL STATE *****
const initialState = []

// ****** ACTION TYPES ******
const SET_USERS = 'SET_USERS'

// ****** ACTION CREATORS ******
export const setUsers = (users) => ({
  type: SET_USERS,
  users,
})

// ****** THUNK CREATIORS ******
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch(err) {
      console.log('Error fetching users.')
    }
  }
}

// ****** REDUCER ******
const users = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}

export default users
