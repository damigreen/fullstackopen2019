const bloglistRouter = require('express').Router();
const Blog = require('../models/bloglist');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

bloglistRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1});
    response.json(blogs.map(blog => blog.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

bloglistRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  console.log(body)

  const blog = await Blog.findById(request.params.id)

  blog.comments = blog.comments.concat(body.comment)
  const savedBlog = await blog.save()

  response.json(savedBlog.toJSON())
})

bloglistRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = request.token;

  try {  
    if (!body.likes) {
      body.likes = 0;
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
  

    const blog = await new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    });
    
    const savedBlog = await blog.save();
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog.toJSON());

  } catch (exception) {
    next(exception);
  }
});

bloglistRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blogObject = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blogObject, { new: true });
  response.json(savedBlog.toJSON());
});

bloglistRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id;
  const token = request.token;


  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(blogId);
  
    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'invalid user' });
    }
  
    await Blog.findByIdAndRemove(blogId);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = bloglistRouter;