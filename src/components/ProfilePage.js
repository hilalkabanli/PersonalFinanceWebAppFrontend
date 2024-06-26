// src/components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ProfilePage = ({ userId }) => {
  console.log(userId);
  const [user, setUser] = useState({
    id: '',
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5261/api/Users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5261/api/Users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('User updated successfully');
    } catch (err) {
      alert('Error updating user');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data</p>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card variant="outlined" style={{ maxWidth: 400, padding: 20 , backgroundColor: '#F5F7F8' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Profile Page
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={user.name}
              onChange={handleChange}
              style={{ marginBottom: 20 }}
            />
            <TextField
              fullWidth
              id="surname"
              name="surname"
              label="Surname"
              variant="outlined"
              value={user.surname}
              onChange={handleChange}
              style={{ marginBottom: 20 }}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              variant="outlined"
              value={user.phone}
              onChange={handleChange}
              style={{ marginBottom: 20 }}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={user.email}
              onChange={handleChange}
              style={{ marginBottom: 20 }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={user.password}
              onChange={handleChange}
              style={{ marginBottom: 20 }}
            />
            <Button variant="contained"  type="submit" style={{ backgroundColor: '#1E0342', color: 'white' }}>
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
