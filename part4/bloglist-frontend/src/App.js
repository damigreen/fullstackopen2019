import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';
import useField from './hooks/index';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const username = useField('text');
  const password = useField('password');

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
      const useR = JSON.parse(loggedInUserJSON);
      setUser(useR);
      blogService.setToken(useR.token);
    }
  }, []);

  const setMessageWithTimer = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`logging in with ${username.form.value}, ${password.form.value}`);
    try {
      const useR = await loginService.login({ username: username.form.value, password: password.form.value });
      blogService.setToken(useR.token);
      window.localStorage.setItem('loggedInUser', JSON.stringify(useR));
      setUser(useR);
      setMessageWithTimer(`${useR.username}, logged in`)
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
      <h2>blogs</h2>
      <Notification
        message={message} />
      <div><br />
        <button onClick={() => handleLogout()}>logout</button>
        <Togglable buttonLabel='create new' ref={blogFormRef}>
          <NewBlog
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            blogFormRef={blogFormRef}
            setMessageWithTimer={setMessageWithTimer} />
        </Togglable><br />
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
                user={user}
                setMessageWithTimer={setMessageWithTimer} />
            )
          )}
      </div>
      <br />
    </div>
  );
}

export default App;
