import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';
import useField  from './hooks/index';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [blogs, setBlogs] = useState([]);

  const username = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef();

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
      const loginUser = JSON.parse(loggedInUserJSON);
      setUser(loginUser);
      blogService.setToken(loginUser.token);
    }
  }, []);

  const setMessageWithTimer = message => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`logging in with ${username.form.value}, ${password.form.value}`);
    try {
      loginService.login({ username: username.form.value, password: password.form.value })
        .then(loginUser => {
          setUser(loginUser);
          setMessageWithTimer(`${loginUser.name} logged in`)
          blogService.setToken(loginUser.token);
          window.localStorage.setItem('loggedInUser', JSON.stringify(loginUser));
        })

      username.reset()
      password.reset()
    } catch (exception) {
      setMessageWithTimer('Wrong credentials');
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
      <Notification
        message={message} /> <button onClick={() => handleLogout()}>logout</button>
      <div>
        <h2>Blogs</h2>
        <Togglable buttonLabel='create new' ref={blogFormRef}>
          <NewBlog
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            blogFormRef={blogFormRef}
            setMessage={setMessageWithTimer} />
        </Togglable>
        <br />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(
            blog => (
              <Blog
                key={blog.key}
                blog={blog}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user} />
            )
          )}
      </div>
      <br />
    </div>
  );
}

export default App;
