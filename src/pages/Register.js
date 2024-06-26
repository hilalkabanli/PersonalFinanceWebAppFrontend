import React, { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password || !name || !surname || !phoneNumber) {
      setError('Please fill in all fields.');
      return;
    }
    // You can implement your registration logic here (e.g., API call)
    console.log('Register with:', email, password, name, surname, phoneNumber);
    // Clear form fields
    setEmail('');
    setPassword('');
    setName('');
    setSurname('');
    setPhoneNumber('');
    setError('');
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Surname:
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
