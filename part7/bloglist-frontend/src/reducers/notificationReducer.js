const initialState = null

const notificationReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

export const setNotification = message => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
    setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION',
    }), 5000)
  }
}

export default notificationReducer
