import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { BOOKS_BY_GENRE } from '../queries'


function Filter({ setBooks, books }) {
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [bookFilterd, setBookFilterd] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    if (genres.length === 0) {
      const genresDuplicated = books.reduce((acc, curr) => acc.concat(curr.genres), [])
      setGenres([...new Set(genresDuplicated)])
    }
  }, [genres])


  /* 
   TODO: Transfer the filter comonent to the Books components
  */
  const onFilter = async ({target}) => {
    setGenre(target.value);
    
    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre }
    })
    setBookFilterd(data.allBooks)
    setBooks(bookFilterd)
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
