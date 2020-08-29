import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { ALL_BOOKS } from '../queries'
import { BOOKS_BY_GENRE } from '../queries'
import { ME } from '../queries'



const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('all')
  const [genres, setGenres] = useState([])
  const [fav, setFav] = useState([])

  const result = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const filterBooks = async (genre) => {
    try {
      const { data } = await client.query({
        query: BOOKS_BY_GENRE,
        variables: { genre }
      })
      setBooks(data.allBooks)
      
    } catch(error) {
      console.log('error', error);
    }
  }

  const setFavorite = async () => {
    console.log('setting fav')
    try {
      const { data } = await client.query({
        query: ME
      })
      setFav(data.me.username);
      console.log(data)
    } catch(error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    if (!result.loading && genre === 'all') { 
      setBooks(result.data.allBooks)
      if (genres.length === 0) {
        const genresDuplicated = books.reduce((acc, curr) => acc.concat(curr.genres), [])
        setGenres([...new Set(genresDuplicated)])
      }
      return;
    }
    filterBooks(genre)
    if (props.token) {
      setFavorite(genre)
    }
  }, [genres, genre, books, filterBooks, result])
  
  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return (
      <div>Loading...</div>
      )
  }
  
  const genreButtons = genres.map(genre => (
    <button value={genre} onClick={({target}) => setGenre(target.value)}>{genre}</button>
    ))
    
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
      <div>
        <button value='all' onClick={({target}) => setGenre(target.value)}>all genre</button>
        {genreButtons}
      </div>
    </div>
  )
}

export default Books
