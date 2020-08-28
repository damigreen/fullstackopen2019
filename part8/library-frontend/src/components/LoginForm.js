import React, { useState } from 'react'

const LoginForm = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <form>
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
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    </div>
  )
}

export default LoginForm;
