import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer';

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault();
    props.filterAnecdote(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const matchDispatchToProps = dispatch => {
  return {
    filterAnecdote: text => dispatch(filterAnecdote(text))
  }
}

export default connect(
  null,
  matchDispatchToProps
)(Filter)
