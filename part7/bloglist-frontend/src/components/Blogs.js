import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {
  const blogs = props.blogs

  return (
    <div>
      <h2>Blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(
          blog => (
            <Blog
              key={blog.key}
              blog={blog}
              blogs={blogs}
              user={props.user} />
          )
        )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Blogs);
