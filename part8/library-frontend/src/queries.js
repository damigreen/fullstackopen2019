import { gql } from 'apollo-boost'


export const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
export const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    author {
      name
    }
    genres
  }
}
`
export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String! $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {
      name
    }
    genres
    id
  }
}
`
export const EDIT_AUTHOR = gql`
mutation authorEdit($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`
export const LOGIN = gql`
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const BOOKS_BY_GENRE =   gql`
query allBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    genres
    author {
      name
    }
    published
  }
}
`