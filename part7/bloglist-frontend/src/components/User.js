import React from 'react'

function User ({ user }) {
  if (user === undefined) {
    return null
  }
  console.log(user.blogs)

  return (
    <div>
      <h3>added blogs</h3>
      <ul>
        {user.blogs
          .map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
      </ul>
    </div>
  )
}

export default User
