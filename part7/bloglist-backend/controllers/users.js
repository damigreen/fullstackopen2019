const User = require('../models/user');
const userRouter = require('express').Router();
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blog', { title: 1, author: 1, url: 1});
    return response.json(users.map(user => user.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.password || body.password === undefined) {
      return response.status(400).json({ error: 'password missing' });
    } else if (body.password.length < 3 ) {
      return response.status(400).json({ error: 'password length must be greater than 3' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;