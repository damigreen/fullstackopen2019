import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Filter from '../components/Filter'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)
  
  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
    }
  }, [result])
  
  if (!props.show) {
    return null
  }
  
  if (props.result.loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <Filter
        books={books}
        setBooks={(books) => setBooks(books)}
      />
    </div>
  )
}

export default Books
