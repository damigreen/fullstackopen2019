
const config = require('./utils/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const bloglistRouter = require('./controllers/bloglist');
const mongoose = require('mongoose');

const mongoUrl = config.MONGODB_URI;
console.log(`connecting to ${mongoUrl}`);

mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('connected to mongoDB'))
  .catch(error => { console.log(`error connecting to DB : ${error.message}`); });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

app.use('/api/blogs', bloglistRouter);

module.exports = app;