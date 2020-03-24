const initialState = null

const notificationReducer = (state = initialState, action) => {
  // console.log('action', action.type)
  // console.log('state now: ', state)
  // console.log(`${action.data}`)


  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message
    case 'REMOVE_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer
