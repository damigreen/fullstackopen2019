
const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const bloglistRouter = require('./controllers/bloglist');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/users');
const mongoose = require('mongoose');

const mongoUrl = config.MONGODB_URI;
logger.info(`connecting to ${mongoUrl}`);

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('connected to mongoDB'))
  .catch(error => { logger.error(`error connecting to DB : ${error.message}`); });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/blogs', bloglistRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;