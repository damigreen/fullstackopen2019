import React from 'react';

const Notification = ({ message }) => {

  if (message === null) {
    return null;
  }

  const className = message ? 'error' : 'empty';

  return (
    <div className={className}>
      { message }
    </div>
  );
};

export default Notification;
