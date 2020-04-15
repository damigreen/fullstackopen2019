const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const Blogs = require('../models/bloglist');
const api = supertest(app);


beforeEach(async () => {
  await Blogs.deleteMany({});
  console.log('cleared');

  for (let blog of helper.initialBlogList) {
    const blogObject = new Blogs(blog);
    await blogObject.save();  
    console.log('saved');
  }
});

describe('get blogs', () => {
  test('blogs return are json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);  
  });

  test('there are three blogs in the database', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(helper.initialBlogList.length);
  });

  test('there is a unique idetifier property id ', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('post a blog', () => {
  test('a blog is created ', async () => {
    
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    };
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(b => b.title);
    
    expect(titles).toContain('Type wars');
    expect(blogsAtEnd.length).toBe(helper.initialBlogList.length + 1);
  });

  test('missing like property defaults to 0', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test('adding a blog with missing title responds with status code 404 Bad Request', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 15,
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(helper.initialBlogList.length);
  });

  test('adding a blog with missing url, responds with status code 404 Bad Request', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 15,
    };
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  
    const blogsAtEnd = await helper.blogsInDb();
  
    expect(blogsAtEnd.length).toBe(helper.initialBlogList.length);
  });
});

describe('updating / deleting a blog', () => {
  test('updating a blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[2];

    const blogObject = {
      title: 'String theory',
      author: 'Edsger W. Dijkstra',
      likes: 44
    };

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogObject)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(updatedBlog.body.likes).toBe(44);
    expect(blogsAtStart.length).toBe(blogsAtEnd.length);
  });

  test('deleting a blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[1];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(b => b.titles);

    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});