import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'ADD_NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      // // find anecdote to vote for 
      // const id = action.data.id
      // const anecdoteToVote = state.find(n => id === n.id)
      // const anecdoteVoted = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      // return state.map(anecdote => 
      //   anecdote.id === id ? anecdoteVoted : anecdote
      // )
      const newObj = action.data
      return state.map(a => a.id === newObj.id ? newObj : a)
      default:
      return state
    }
  }

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: anecdote
    })
  }
}

export const getId = () => (100000 * Math.random()).toFixed(0)

export const voteAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update({...content, votes: content.votes + 1})
    dispatch({
      type: "VOTE",
      data: newAnecdote
    })
  }
}

export default anecdoteReducer;
