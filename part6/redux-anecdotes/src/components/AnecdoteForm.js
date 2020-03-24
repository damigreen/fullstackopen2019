import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  
  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    store.dispatch(createAnecdote(content))
    store.dispatch(setNotification(`added`))
    setTimeout(() => store.dispatch(removeNotification()), 5000)
    event.target.anecdote.value = '';
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew} >
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm