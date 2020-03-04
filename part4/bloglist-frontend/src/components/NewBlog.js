import React from 'react';

const NewBlog = ({ title, setTitle, author, setAuthor, url, setUrl, handleSubmit }) => {

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>create new</h1>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={ setTitle } />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={ setAuthor } />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={  setUrl } />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
