import React, { useState } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYear from './components/BirthYear'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'
import { ADD_BOOK } from './queries'
import { EDIT_AUTHOR } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient();
  
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000);
  }

  const Notify = ({ errorMessage }) => {
    if ( !errorMessage ) {
      return null
    }
  
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }
  

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

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}
        />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>

        <Authors
          result={authors}
          show={page === 'authors'}
        />
    
        <Books
          result={books}
          show={page === 'books'}
        />
        <LoginForm
          show={page === 'login'}
          setToken={(token) => setToken(token)}
          handleError={handleError}
          setPage={setPage}
        />
    
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }


  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage}
        />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('update')}>update</button>
        <button onClick={logout}>logout</button>
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
        authors={ALL_AUTHORS}
        show={page === 'update'}
      />

    </div>
  )
}

export default App