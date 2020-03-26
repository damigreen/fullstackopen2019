const initialState = null

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.message
    default:
      return state
  }
}

export const setFilter = (message) => {
  return {
    type: 'SET_FILTER',
    data: { message }
  }
}

export default filterReducer
