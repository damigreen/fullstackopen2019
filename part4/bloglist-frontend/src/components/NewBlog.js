import React from 'react';
import { useField } from '../hooks';
import blogService from '../services/blogs';

const NewBlog = ({ user, messageNotificationTimer, setBlogs, blogs, blogFormRef }) => {

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.form.value,
      author: author.form.value,
      url: url.form.value,
      user: user._id
    };
    try {
      blogService.create(newBlog)
        .then(returnedBlog => {
          if (returnedBlog) {
            messageNotificationTimer(`new blog added: ${title.form.value} by ${author.form.value}`);
            const userModified = { ...user, id: user._id };
            const returnedBlogModified = { ...returnedBlog, user: userModified };
            setBlogs(blogs.concat(returnedBlogModified));
          }
        });

      blogFormRef.current.toggleVisibility();

      title.reset();
      author.reset();
      url.reset();
    } catch (exception) {
      messageNotificationTimer('Validation error: please enter the required filed(s)');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>create new</h1>
        <div>
          title:
          <input {... title.form} />
        </div>
        <div>
          author:
          <input {...author.form} />
        </div>
        <div>
          url:
          <input {...url.form} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
