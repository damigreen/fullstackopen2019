import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import Select from 'react-select'


const BirthYear = (props) => {
  const [name, setName] = useState('')
  const [born,  setBorn] = useState('')

  const authorsQuery = useQuery(props.authors);
  
  if (!props.show) {
    return null
  }
  
  if (props.editAuthor.loading) {
    return (
      <div>Loading...</div>
      )
    }
    
  const authors = authorsQuery.data.allAuthors
  const authorsOption = authors.map(a => {
    return {
      value: a.name,
      label: a.name
    }
  })

  const submit = async (e) => {
    e.preventDefault()
    if (name.value.length === 0) {
      return
    }
    if (!born) {
      return
    }

    await props.editAuthor({
      variables: { name: name.value, setBornTo: parseInt(born) }
    })
    setName('')
    setBorn('')
  }

  const handleChange = (name) => {
    setName(name)
  }

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <label for="name">name</label>
          {/* <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(a => (
              <option value={a.name} >{a.name}</option>
            ))}
          </select> */}
          <Select
            value={name}
            options={authorsOption}
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="born">born</label>
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthYear;
