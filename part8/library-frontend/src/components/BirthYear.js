import React, { useState } from 'react'

const BirthYear = (props) => {
  const [name, setName] = useState('')
  const [born,  setBorn] = useState('')

  if (!props.show) {
    return null
  }
  
  if (props.editAuthor.loading) {
    return (
      <div>Loading...</div>
    )
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <label for="name">name</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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
