import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYear from './components/BirthYear'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }


  const ALL_AUTHORS = gql`
    {
      allAuthors {
        name
        born
        bookCount
        id
      }
    }
  `
  const ALL_BOOKS = gql`
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
  const ADD_BOOK = gql`
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
  const EDIT_AUTHOR = gql`
    mutation authorEdit($name: String!, $setBornTo: Int!) {
      editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
      }
    }
  `

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] =  useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  return (
    <div>
      <div>
        {errorMessage && 
          <div style={{color: 'red'}}>
            {errorMessage}
          </div>
        }

        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('update')}>update</button>
      </div>

      <Authors
        result={authors}
        show={page === 'authors'}
      />

      <Books
        result={books}
        show={page === 'books'}
      />

      <NewBook
        addBook={addBook}
        show={page === 'add'}
      />

      <BirthYear
        editAuthor={editAuthor}
        show={page === 'update'}
      />

    </div>
  )
}

export default App