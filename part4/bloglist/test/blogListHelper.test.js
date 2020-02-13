const bloglistHelper = require('../utils/bloglist_testing');

const oneBlog = [{
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}];

const blogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
];


describe('total likes', () => {
  test('dummy returns one', () => {
    expect(bloglistHelper.dummy([])).toBe(1);
  });
});

describe('total likes', () => {
  test('of empty list is Zero', () => {
    expect(bloglistHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog like', () => {
    expect(bloglistHelper.totalLikes(oneBlog)).toBe(2);
  });
  
  test('of a bigger list is calculated right', () => {
    expect(bloglistHelper.totalLikes(blogList)).toBe(36);
  });

});

describe('total likes', () => {
  test('of empty list is Zero', () => {
    expect(bloglistHelper.favoriteBlog([])).toEqual(0);
  });

  test('when list has only one blog like', () => {
    expect(bloglistHelper.favoriteBlog(oneBlog))
      .toEqual({ _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url:'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0 });
  });
  
  test('of a bigger list is calculated right', () => {
    expect(bloglistHelper.favoriteBlog(blogList))
      .toEqual({title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12});
  });
});

describe('most blogs', () => {
  test('of the blog list', () => {
    expect(bloglistHelper.mostBlogs(blogList)).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('most likes', () => {
  test('of the blog list', () => {
    expect(bloglistHelper.mostLikes(blogList)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});