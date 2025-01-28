import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access_token);
      navigate('/dashboard'); // Redirect to dashboard after sign-in
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;