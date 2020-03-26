import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  console.log(props)
  
  const addNew = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.setNotification(`added ${content}`)
    setTimeout(() => props.removeNotification(), 5000)
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

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: content => dispatch(createAnecdote(content)),
    setNotification: mess => dispatch(setNotification(mess)),
    removeNotification: () => dispatch(removeNotification())
  }
}

const connectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default connectedAnecdoteForm;
