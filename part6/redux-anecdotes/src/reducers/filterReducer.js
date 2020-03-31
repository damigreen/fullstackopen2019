const initialState = null

const filterReducer = (state = initialState, action) => {
  // console.log(`filterState:- ${state}`)
  // console.log(`action:- ${action.type}`)

  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const filterAnecdote = (text) => {
  return {
    type: 'SET_FILTER',
    data: text
  }
}

export default filterReducer
