import React from 'react';

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'black',
    background: 'lightblue',
    fontSize: '15px',
    borderStyle: 'solid',
    borderRadius: '1px',
    padding: '10px',
    marginBottom: '10px'
}


  if (message === null) {
    return null;
  }

  const className = message ? 'error' : 'empty';

  return (
    <div style={notificationStyle} className={className}>
      { message }
    </div>
  );
};

export default Notification;
