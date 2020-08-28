import React, { useState, useEffect } from 'react'
import { LOGIN }  from '../queries'
import { useMutation } from '@apollo/react-hooks'


const LoginForm = ({handleError, setToken, show, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: handleError
  })

  useEffect(() => {
    if (result.data) {
      console.log('-->', result.data)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])
  
  if (!show) {
    return null
  }
  
  const submit = (e) => {
    e.preventDefault();

    login({
      variables: { username, password }
    })
    setPage('books')
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label for="username">Username</label>
          <input
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            value={password}
            type="password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    </div>
  )
}

export default LoginForm;
