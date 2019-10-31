import axios from 'axios'

// ****** INITIAL STATE *****
const initialState = []

// ****** ACTION TYPES ******
const SET_DUMMIES = 'SET_DUMMIES'

// ****** ACTION CREATORS ******
export const setDummies = (dummies) => ({
  type: SET_DUMMIES,
  dummies
})

// ****** THUNK CREATIORS ******
export const fetchDummies = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/dummies')
      dispatch(setDummies(data))
    } catch(err) {
      console.log('Error fetching.')
    }
  }
}

// ****** REDUCER ******
const dummies = (state = initialState, action) => {
  switch (action.type) {
    case SET_DUMMIES:
      return action.dummies
    default:
      return state
  }
}

export default dummies
