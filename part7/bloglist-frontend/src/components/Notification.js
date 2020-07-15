import React from 'react';
import { connect } from 'react-redux'

const Notification = ({ message}) => {

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

const mapStateToProps = state => {
  return {
    message: state.message
  }
}


export default connect(
  mapStateToProps
)(Notification);
