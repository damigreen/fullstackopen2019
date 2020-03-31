import React from 'react'
import { connect } from 'react-redux'
// import { setNotification } from '../reducers/notificationReducer'

const Notification = (props) => {
  console.log(props.message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...{props.message}
    </div>
  )
}

const matchStateToProps = state => {
  return {
    message: state.message
  }
}

export default connect(
  matchStateToProps
)(Notification) 