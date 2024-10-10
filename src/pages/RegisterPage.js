import { useState } from 'react';

const RegistrationForm = () => {
  const [newUser , setNewUser ] = useState({ username: '', password: '' });
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setRegistrationStatus('Registration successful!');
      } else {
        setRegistrationStatus('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={newUser .username}
        onChange={(event) => setNewUser ({ ...newUser , username: event.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser .password}
        onChange={(event) => setNewUser ({ ...newUser , password: event.target.value })}
      />
      <button type="submit">Register</button>
      <p>{registrationStatus}</p>
    </form>
  );
};

export default RegistrationForm;