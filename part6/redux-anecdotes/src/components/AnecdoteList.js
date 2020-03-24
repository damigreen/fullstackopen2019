import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  console.log(store.getState().filter)

  const filterStore = store.getState().filter
  const anecdotesStore = store.getState().anecdotes.sort((a, b) => b.votes - a.votes)
  console.log(anecdotesStore)

  const useFilter = () => {
    if (filterStore === null) {
      return true
    }
  }

  const filterFunc = () => {
    return anecdotesStore.filter(matches => matches.content.includes(filterStore))
  }

  const anecdotes = useFilter() ? anecdotesStore : filterFunc()

  return (
    <div>
      <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => store.dispatch(vote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList;
