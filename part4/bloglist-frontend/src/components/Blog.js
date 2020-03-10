import React, { useState } from 'react';
import blogService from '../services/blogs';
import propTypes from 'prop-types';

const Blog = ({ blogs, setBlogs, blog, user }) => {

  const [expanded, setExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth:1,
    marginBottom: 5
  };

  const addLike = async (event) => {
    event.preventDefault();
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    const response = await blogService.update(blog.id, changedBlog);
    setBlogs(blogs.map(b => b.id === blog.id ? response : b));
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog ${blog.name} by ${blog.author}`)) {
      await blogService.del(blog.id);
      setBlogs(blogs.filter(b => b.id !== blog.id));
    }
  };

  if (expanded) {
    return (
      <div className="blog" style={blogStyle}>
        <li onClick={ () => setExpanded(!expanded) }>{ blog.title } { blog.author }</li>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>{blog.likes} <button onClick={addLike}>likes</button></li>
        <li>added by {blog.user.name}</li>
        { blog.user.id === user._id ? <li><button onClick={removeBlog}>remove</button></li> : null}
      </div>
    );
  }

  return (
    <div style={blogStyle} className="blog" onClick={ () => setExpanded(!expanded)}>
      {blog.title} {blog.author}
    </div>
  );
};

Blog.propTypes = {
  blogs: propTypes.array.isRequired,
  setBlogs: propTypes.func.isRequired,
  blog: propTypes.object.isRequired,
  user: propTypes.object.isRequired
};

export default Blog;
