import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  console.log()
  
  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    console.log(props.anecdotes)
    event.target.anecdote.value = '';
    props.setNotification(`added`)
    setTimeout(() => props.removeNotification(), 5000)

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

const matchDispatchToProps = {
  setNotification,
  createAnecdote,
  removeNotification
}

export default connect(
  null,
  matchDispatchToProps
)(AnecdoteForm)