import React from 'react';
import useField from '../hooks/index'
import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogs, blogFormRef, setMessageWithTimer }) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')


  const createBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle.form.value,
      author: newAuthor.form.value,
      url: newUrl.form.value
    };

    try {
      blogService.create(newBlog)
        .then(returnedBlog => {
          console.log(returnedBlog)
          setMessageWithTimer(`new blog added: ${returnedBlog.title} by ${returnedBlog.author}`);
          setBlogs(blogs.concat(returnedBlog));
        });
      blogFormRef.current.toggleVisibility()
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    } catch (exception) {
      setMessageWithTimer('Validation error: please enter the required filed(s) ');
    }
  };

  return (
    <div>
      <form onSubmit={createBlog}>
        <h1>create new</h1>
        <div>
          title:
          <input {...newTitle.form} />
        </div>
        <div>
          author:
          <input {...newAuthor.form} />
        </div>
        <div>
          url:
          <input {...newUrl.form} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
