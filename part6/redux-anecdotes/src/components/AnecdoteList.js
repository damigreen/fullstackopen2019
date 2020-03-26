import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  
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
              <button onClick={() => props.vote(anecdote.id)}>vote</button>
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

const mapDispatchToProps = dispatch => {
  return {
    vote: id => dispatch(vote(id))
  }
}

const connectedAnecdoteList =  connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default connectedAnecdoteList
