const bloglistRouter = require('express').Router();
const Blog = require('../models/bloglist');

bloglistRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()));
    });
});

bloglistRouter.post('/', (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  });
  
  blog.save()
    .then((savedBlog => {
      response.json(savedBlog.toJSON());
    }))
    .catch(error => next(error));
});

module.exports = bloglistRouter;