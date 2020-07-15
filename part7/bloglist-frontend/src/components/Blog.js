import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';

import { likeBlog } from '../reducers/blogReducer';
import { deleteBlog }  from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  console.log(blog.user)

  return (
    <div className="blog">
      <Link to={`/Blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  );
};

Blog.propTypes = {
  blogs: propTypes.array.isRequired,
  setBlogs: propTypes.func.isRequired,
  blog: propTypes.object.isRequired,
  user: propTypes.object.isRequired
};

const matchDispatchToProps = {
  likeBlog,
  deleteBlog,
  setNotification
}

export default connect(
  null,
  matchDispatchToProps
)(Blog);
