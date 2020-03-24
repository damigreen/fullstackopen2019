import React from 'react'
// import setNotification from '../reducers/notificationReducer'

const Notification = ({ store }) => {
  console.log(store.getState())

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...{store.getState().message}
    </div>
  )
}

export default Notification