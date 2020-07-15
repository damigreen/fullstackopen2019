const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
  user:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number,
  comments: { type: [String] }
});
blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);