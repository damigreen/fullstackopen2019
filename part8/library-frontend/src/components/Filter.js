import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { BOOKS_BY_GENRE } from '../queries'
import { ALL_BOOKS } from '../queries'


function Filter(props) {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [bookFilterd, setBookFilterd] = useState([])

  const client = useApolloClient()
  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    setBooks(result.data.allBooks)
    if (genres.length === 0) {
      const genresDuplicated = books.reduce((acc, curr) => acc.concat(curr.genres), [])
      setGenres([...new Set(genresDuplicated)])
    }
  }, [books, genres])

  /* 
  get all books
  set the result from queriues in the react state
  get all the available genres
  display result based on button value  
    set genre state based on button target
  Display the genre in the state
  */

  const onFilter = async ({target}) => {
    // const { data } = await booksQuery({
    //   variables: { genre }
    // })
    // setbooks(data.allBooks)
    // console.log(books)
    setGenre(target.value);
    
    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre }
    })
    setBookFilterd(data.allBooks)
  }

  
  const genreButtons = genres.map(genre => (
    <button value={genre} onClick={onFilter}>{genre}</button>
  ))

  return (
    <div>
      <div>
        {genreButtons}
      </div>
    </div>
  )
}

export default Filter;
