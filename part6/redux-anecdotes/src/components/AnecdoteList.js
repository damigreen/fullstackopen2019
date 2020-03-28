import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`)
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
        {props.anecdotesList.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

// presentational container
const anecdotesSort = ({ filter, anecdotes }) => {
  if (filter === null) {
    return anecdotes.sort((a, b) => b.votes - a.votes )
  } else
  return anecdotes.filter(matches => matches.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    message: state.message,
    filter: state.filter,
    anecdotesList: anecdotesSort(state)
  }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const connectedAnecdoteList =  connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList
