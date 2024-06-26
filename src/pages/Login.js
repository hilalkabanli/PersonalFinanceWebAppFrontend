import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    

    try {
      const response = await axios.post('http://localhost:5261/api/auth/login', {
        email: email,
        password: password,
      });
      console.log(response.data);
      localStorage.setItem('accessToken', response.data.accessToken);

      const user = await axios.post('http://localhost:5261/api/auth/GetUserByToken', {
        token : response.data.accessToken
      });

      localStorage.setItem('userID', JSON.stringify(user.data.userID).replace("\"", "").replace("\"", ""));

      console.log(user);

      // Redirect to the home page
      history.push('/home');
      // Clear form fields
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      console.error('Error:', error.response.data);
      setError(error.response.data.message);
      alert('Login failed. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    history.push('/register');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button className="register-button" onClick={handleRegisterRedirect}>Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
