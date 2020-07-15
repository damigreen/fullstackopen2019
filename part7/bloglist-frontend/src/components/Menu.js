import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

function Menu(props) {
  const user = props.user
  const linkStyle = {
    paddingRight: 5,
    marginRight: 4
    
  }
  const divStyle = {
    border: '1px solid gray',
    backgroundColor: '#eee',
    padding: 4
  }

  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    props.logout()
  };

  return (
    <div style={divStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/Users" style={linkStyle}>Users</Link>
      <b style={linkStyle}>{ user.name } is logged In  <button onClick={() => handleLogout()}>logout</button></b>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
