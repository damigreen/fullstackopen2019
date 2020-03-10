import React, { useState, useEffect } from 'react';
import { useField } from './hooks';

import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [blogs, setBlogs] = useState([]);

  const username = useField('text');
  const password = useField('password');


  useEffect( () => {
    const fetchData = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const useR = JSON.parse(loggedInUserJSON);
      setUser(useR);
      blogService.setToken(useR.token);
    }
  }, []);

  const messageNotificationTimer = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const blogFormRef = React.createRef();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  // add login error
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`logging in with ${username.form.value}, ${password.form.value}`);
    try {
      const useR = await loginService.login({
        username: username.form.value, password: password.form.value });

      blogService.setToken(useR.token);
      window.localStorage.setItem('loggedInUser', JSON.stringify(useR));

      setUser(useR);
    } catch (exception) {
      messageNotificationTimer('Wrong credentials');
    }
  };

  const blogList = () => blogs
    .sort((a, b) => b.likes - a.likes)
    .map(
      blog => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user} />
      )
    );

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
      <Notification
        message={message} />
      <div>
        { `${user.name}, logged in` } <button onClick={() => handleLogout()}>logout</button>
        <div>
          <Togglable buttonLabel='create new' ref={blogFormRef}>
            <NewBlog
              user={user}
              blogs={blogs}
              setBlogs={setBlogs}
              messageNotificationTimer={messageNotificationTimer}
              blogFormRef={blogFormRef} />
          </Togglable>
        </div>
        <br />
        {blogList()}
      </div>
      <br />
    </div>
  );
}

export default App;
