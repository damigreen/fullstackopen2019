import React from 'react'
import { connect } from 'react-redux'
// import setNotification from '../reducers/notificationReducer'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {props.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    message: state.message
  }
}

export default connect(
  mapStateToProps
)(Notification)
// export default Notification