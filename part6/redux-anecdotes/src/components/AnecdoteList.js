import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  console.log(props.anecdotes)

  const vote = anecdote => {
    props.voteAnecdote(anecdote)
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

  function anecdotesListCont({ filter, anecdotes }) {
    return filter !== null ?
    anecdotes.filter(matches => matches.content.includes(filter)) :
    anecdotes.sort((a, b) => b.votes - a.votes)

  }

const matchStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    message: state.message,
    anecdotesList: anecdotesListCont(state)
  }
}

export default connect(
  matchStateToProps,
  { voteAnecdote }
)(AnecdoteList);
