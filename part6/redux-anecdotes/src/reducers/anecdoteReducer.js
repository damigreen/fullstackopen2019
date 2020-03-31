import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const newAnecdote = action.data.updatedAnecdote
      return state.map(a => a.id !== newAnecdote.id ? a : newAnecdote)
    case 'ADD_NEW':
      return [...state, action.data.newAnecdote]
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
  }
}

export const initialAnecdotes = () => {
  return dispatch => {
    anecdoteService.getAll()
      .then(anecdotes => dispatch({
        type: 'INIT_ANECDOTES',
        data: { anecdotes }
      }))
  }
}

export const voteAnecdote = anecdote => {

  return dispatch => {
    anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
      .then(updatedAnecdote => dispatch({
        type: "VOTE_ANECDOTE",
        data: { updatedAnecdote }
      }))
  }
}

export const createAnecdote = (anecdote) => {
  return dispatch => {
    anecdoteService.createNew(anecdote)
      .then(newAnecdote => dispatch({
          type: 'ADD_NEW',
          data: { newAnecdote }
      }))
  }
}


export default anecdoteReducer;
