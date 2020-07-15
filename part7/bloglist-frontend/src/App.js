import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import userService from './services/users'

import {
  BrowserRouter as Router,
  Route, Redirect, withRouter
} from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Users from './components/Users'
import Menu from './components/Menu'
import User from './components/User'
import BlogInfo from './components/BlogInfo'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Blogs from './components/Blogs'

import useField  from './hooks/index';

import { initialBlogs } from './reducers/blogReducer'
import { login } from './reducers/userReducer'
import { logout } from './reducers/userReducer'
import { loginFromLocalStorage } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'


function App(props) {
  const [users, setUsers] = useState([])
  const username = useField('text')
  const password = useField('password')
  let user = props.user
  let blogs = props.blogs


  const blogFormRef = React.createRef();

  //  Load the initial blog list from the server
  useEffect( () => {
    props.initialBlogs()
    props.loginFromLocalStorage()
  }, []);

  useEffect(() => {
    const getUsers = () => {
      userService.getAll()
        .then(users => {
          setUsers(users)
        })
    }
    getUsers()
  }, []);

  // const handleLogout = () => {
  //   window.localStorage.removeItem('loggedInUser');
  //   props.logout()
  // };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`logging in with ${username.form.value}, ${password.form.value}`);
    try {
      props.login({ username: username.form.value, password: password.form.value })
      props.setNotification(`login!!!!!!!!!!!!`)
      username.reset()
      password.reset()
    } catch (exception) {
      setNotification('Wrong credentials');
    }
  };

  if (user === null) {
    return(
      <div>
        <h1>log in to application</h1>
        <LoginForm
          username={username.form}
          password={password.form}
          handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="blogs">
      <Notification />
      <div>
        <Router>
          <Menu /><br />
          {/* { user.name } is logged In  <button onClick={() => handleLogout()}>logout</button> */}
          <Togglable buttonLabel='create new' ref={blogFormRef}>
            <NewBlog
              user={user}
              blogFormRef={blogFormRef} />
          </Togglable>
          <Route exact path="/" render={() => (
            <Blogs />
          )} />
          <Route exact path="/Users" render={() => 
            <Users users={users}/>
          } />
          <Route exact path="/Users/:id" render={( { match } ) => 
            <User user={users.find(u => u.id === match.params.id)} />
          } />
          <Route exact path="/Blogs/:id" render={( { match } ) => 
            <BlogInfo blog={blogs.find(b => b.id === match.params.id)} />
          } />
        </Router>
      </div>
      <br />
      <br />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    message: state.message,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initialBlogs,
  login,
  logout,
  loginFromLocalStorage,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
