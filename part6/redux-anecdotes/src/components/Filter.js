import React from 'react'
// import filterAnecdote from '../reducers/filterReducer'

const Filter = (props) => {
  console.log(props.store.getState());

  const handleChange = (event) => {
    event.preventDefault();
    props.store.dispatch({
      type: 'SET_FILTER',
      data: event.target.value
    })
  }

  const style = {
    marginBottom: 10
  }

  // handleChange = debounce()

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


export default Filter
