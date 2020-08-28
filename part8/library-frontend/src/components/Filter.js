import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { BOOKS_BY_GENRE } from '../queries'
import { ALL_BOOKS } from '../queries'


function Filter(props) {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    setBooks(result.data.allBooks)
    if (genres.length === 0) {
      const genresDuplicated = books.reduce((acc, curr) => acc.concat(curr.genres), [])
      setGenres([...new Set(genresDuplicated)])
    }
  }, [books, genres])

  const genreButtons = genres.map(genre => (
    <button value={genre} onClick={({ target }) => setGenre(target.value)}>{genre}</button>
  ))

  /* 
  get all books
  set the result from queriues in the react state
  get all the available genres
  display result based on button value  
    set genre state based on button target
  Display the genre in the state
  */
  const onFilter = async () => {
    // const { data } = await booksQuery({
    //   variables: { genre }
    // })
    // setbooks(data.allBooks)
    // console.log(books)
    const { data } = client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre }
    })
  }

  return (
    <div>
      {/* <button onClick={onFilter}>refactoring</button>
      <button>design</button>
      <button>design</button>
      <button>Fiction</button> */}
      <div>
        {genreButtons}
      </div>
    </div>
  )
}

export default Filter;
