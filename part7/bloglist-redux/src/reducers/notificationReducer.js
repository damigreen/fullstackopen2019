const notificationReducer = (state=[], action) => {
  console.log('action', action.type)
  console.log('state now: ', state)

  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export const setNotification = message => {
  return {
    type: 'SET_NOTIFICATION',
    data: message
  }
}

export default notificationReducer
