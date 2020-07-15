import React from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/index'

import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { commentBlog }  from '../reducers/blogReducer'


function BlogInfo({ blog, ...props }) {
  const comment = useField('text')

  if (blog === undefined) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth:1,
    marginBottom: 5
  };

  const blogListStyle = {
    padding: 0,
    margin: 0,
    listStyle: 'none'
  }


  const addComment = event => {
    event.preventDefault()
    const newComment = {
      comment: comment.form.value
    }
    props.commentBlog(blog.id, newComment)
    comment.reset()
  }

  const addLike = async (event) => {
    event.preventDefault();
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    props.likeBlog(changedBlog)
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog ${blog.name} by ${blog.author}`)) {
      props.deleteBlog(blog.id)
      props.setNotification('blog deleted')
    }
  };

  return (
    <div style={blogStyle}>
      <h1>{blog.title} {blog.author}</h1>
      <ul style={blogListStyle}>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>{blog.likes} <button onClick={addLike}>likes</button></li>
        <li>added by {blog.user.name}</li>
        <button onClick={removeBlog}>remove</button>
      </ul>
      <form onSubmit={addComment}>
        <h4>comments</h4>
        <input {...comment.form} />
        <button type="submit">add comment</button>
        <ul>
          {blog.comments
            .map(comment => (
              <li>{comment}</li>
            )
            )}
        </ul>
      </form>
    </div>
  );
};

const matchDispatchToProps = {
  likeBlog,
  deleteBlog,
  commentBlog
}

export default connect(
  null,
  matchDispatchToProps
)(BlogInfo)
