import React from 'react';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={setUsername} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={setPassword} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;