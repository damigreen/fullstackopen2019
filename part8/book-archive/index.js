const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')


mongoose.set('useFindAndModify', false)

const MONGODB_URI='mongodb+srv://damigreen:4444@cluster0-9junr.mongodb.net/book-store?retryWrites=true&w=majority'
console.log('connecting to mongoDB')
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('conneted to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongoDB:', error.message);
  })


// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// /*
//  * It would be more sensible to assosiate book and the author by saving 
//  * the author id instead of the name to the book.
//  * For simplicity we however save the author name.
// */

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login (
      username: String!
      password: String!
    ): Token
  }
`
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments,
    authorCount: () => Author.collection.countDocuments,
    allBooks: async (root, args) => {
      // if (args.author) {
      //   return await Book.find({author: { $in: [args.author] }}).populate('author')
      // }

      if (args.genre) {
        const booksWithGenre = await Book.find({ genres: { $in: [args.genre] }}).populate('author')
        return booksWithGenre
      }

      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async(root) => {
      // const book = books.find(b => b.author === root.name)
      // var count = 0
      // for (var i = 0; i < books.length; i++) {
      //   if (root.name === books[i].author) {
      //     count++;
      //   }
      // }
  
      const books = await Book.find({}).populate('author')
      const count = books.reduce((acc, curr) => {
        if (curr.author.name === root.name) {
          return acc + 1
        }
        return acc;
      }, 0)

      return count
    }
  },
  // Book: {
  //   author: (root) => {
  //     return root.author
  //   }
  // },
  Mutation: {
    addBook: async (root, args) => {
      const bookInDB = await Book.findOne({title: args.title})
      if (bookInDB) {
        throw new UserInputError('Book title must be unique', {
          invalidArgs: args.title
        })
      }

      let author = await Author.findOne({name: args.author});
      if (!author) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      
      let book = new Book({...args, author: author})
      try {
        await book.save()

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null;
      }

      const updateAuthor = { ...author, born: args.setBornTo };
      authors = authors.map(a => a.name === args.name ? updateAuthor : a);
      return updateAuthor;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})