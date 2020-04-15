import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blogPanel">
    <div className="blogDiv">
      {blog.title} {blog.author}
    </div>
    <div className="likeDiv">
      blog had { blog.likes} likes
      <button onClick={onClick}>likes</button>
    </div>
  </div>
);

export default SimpleBlog;