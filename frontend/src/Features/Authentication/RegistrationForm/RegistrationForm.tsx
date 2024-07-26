import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Avatar, IconButton, CircularProgress, Alert } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';
import { registerUser } from '../../../context/AuthContext/AuthContextActions';
import { useAuth } from '../../../context/AuthContext/AuthContextConsts';

const RegistrationForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | ArrayBuffer | null>(null);
  const { state, dispatch } = useAuth();

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let photoUrl = '';
      if (profilePhoto) {
        const formData = new FormData();
        formData.append('file', profilePhoto);
        const response = await axios.post('https://nova-mart-server.onrender.com/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        photoUrl = response.data.url; 
      }

      await registerUser(dispatch, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image: photoUrl,
        role: 'USER'
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setProfilePhoto(null);
      setPhotoPreview(null);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      {state.loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}>
          <CircularProgress />
        </div>
      )}
      {!state.loading && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Avatar
                alt="Profile Photo"
                src={photoPreview as string}
                sx={{ width: 100, height: 100, margin: 'auto' }}
              />
              <label htmlFor="upload-photo">
                <input
                  accept="image/*"
                  id="upload-photo"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={12}>
            {state.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Something went wrong.Try again!
              </Alert>
            )}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};

export default RegistrationForm;
