import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../User Context';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [redirect, setRedirectStatus] = useState(false);
  const { setUserDetails } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUserDetails(userData);
        setRedirectStatus(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;