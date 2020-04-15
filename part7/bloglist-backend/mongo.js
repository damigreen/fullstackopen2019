const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as third argument');
  process.exit(1); 
}

const password = process.argv[2];

const url = `mongodb+srv://damigreen:${password}@cluster0-9junr.mongodb.net/bloglist-app-test?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true })
  .then(result => { console.log(`connected to ${url}`); })
  .catch(error => { console.log(`error connecting to the db ${error.message}`); });


const blogListSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogListSchema);

const blog = new Blog({
  title: 'Canonical string reductin',
  author: 'Edsger W. Dijksra',
  url: 'http://www.cs.uteas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12
});

blog.save().then(result => {
  console.log('blog saved');
  mongoose.connection.close();
})
  .catch(err => {
    console.log(err);
  });