import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {
  console.log(`state:-- ${state}`)
  console.log(`action:-- ${action.type}`)

  switch (action.type) {
  case 'CREATE_COMMENT':{
    const updatedBlog = action.data
    const id = updatedBlog.id
    return state.map(blog => blog.id !== id ? blog : updatedBlog)
    // return action.data
  }
  case 'REMOVE_BLOG':{
    const id = action.data
    return state.filter(b => b.id !== id)
  }
  case 'LIKE_BLOG': {
    const updatedBlog = action.data
    const id = updatedBlog.id
    return state.map(b => b.id !== id ? b : updatedBlog)
  }
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  default:
    return state
  }
}

export const commentBlog = (id, comment) => {
  return dispatch => {
    blogService.createComment(id, comment)
      .then(updatedBlog => {
        console.log(updatedBlog)
        dispatch({
          type: 'CREATE_COMMENT',
          data: updatedBlog
        })
      })
  }
}

export const deleteBlog = id => {
  return dispatch => {
    blogService.del(id)
      .then(() => {
        dispatch({
          type: 'REMOVE_BLOG',
          data: id
        })
      })
  }
}

export const likeBlog = blog => {
  return dispatch => {
    blogService.update(blog.id, blog)
      .then(updatedBlog => dispatch({
        type: 'LIKE_BLOG',
        data: updatedBlog
      }))
  }
}

export const initialBlogs = () => {
  return dispatch => {
    blogService.getAll()
      .then(blogs => dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      }))
  }
}

export const createBlog = blogObj => {
  return dispatch => {
    blogService.create(blogObj)
      .then(newBlog => dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      }))
  }
}

export default blogReducer
