import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  console.log(props.setFilter)

  const handleChange = (event) => {
    event.preventDefault();
    props.setFilter(event.target.value)
  }

  const style = {
    marginTop: 5,
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter
}

const connectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default connectedFilter;