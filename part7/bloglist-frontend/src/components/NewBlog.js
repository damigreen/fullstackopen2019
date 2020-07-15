import React from 'react';
import { connect } from 'react-redux'
import useField from '../hooks/index'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const NewBlog = ({ setMessage, blogFormRef, ...props }) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  const createBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle.form.value,
      author: newAuthor.form.value,
      url: newUrl.form.value
    };
    try {
      props.createBlog(newBlog)
      props.setNotification(`new blog added: ${newBlog.title} by ${newBlog.author}`);
      blogFormRef.current.toggleVisibility()

      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    } catch (exception) {
      props.setNotification('Validation error: please enter the required filed(s) ');
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

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBlog);
