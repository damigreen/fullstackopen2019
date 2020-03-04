import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

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

  const blogFormRef = React.createRef();

  const createBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    };
    try {
      const returnedBlog = await blogService.create(newBlog);
      setMessage(`new blog added: ${returnedBlog.title} by ${returnedBlog.author}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      console.log(returnedBlog);
      console.log(user.name);
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle('');
      setNewAuthor('');
      setNewUrl('');
      console.log(returnedBlog.user);
      console.log(user);
    } catch (exception) {
      setMessage('Validation error: please enter the required filed(s) ');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`logging in with ${username}, ${password}`);
    try {
      const useR = await loginService.login({ username, password });

      blogService.setToken(useR.token);
      window.localStorage.setItem('loggedInUser', JSON.stringify(useR));

      setUser(useR);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <LoginForm
        username={username}
        password={password}
        setUsername={ ({ target }) => setUsername(target.value) }
        setPassword={ ({ target }) => setPassword(target.value)}
        handleLogin={handleLogin} />
    </div>
  )

  const newBlogForm = () => (
    <div>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <NewBlog
          title={newTitle}
          setTitle={ ({ target }) => setNewTitle(target.value) }
          author={newAuthor}
          setAuthor={ ({ target }) => setNewAuthor(target.value) }
          url={newUrl}
          setUrl={ ({ target }) => setNewUrl(target.value) }
          handleSubmit={createBlog} />
      </Togglable>
    </div>
  );

  const blogList = () => blogs
    .sort((a, b) => b.likes - a.likes)
    .map(
      blog => (
        <Blog
          key={blog.key}
          title={blog.title}
          author={blog.author}
          url={blog.url}
          likes={blog.likes}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user} />
      )
    );

  return (
    <div>
      <Notification
        message={message} />

      <div>
        {user === null ? loginForm() :
          <div>
            { `${user.name}, logged in` } <button onClick={() => handleLogout()}>logout</button>
            {newBlogForm()}
            <br />
            {blogList()}
          </div>
        }
      </div><br />
    </div>
  );
}

export default App;
