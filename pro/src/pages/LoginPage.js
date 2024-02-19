import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Snackbar, Alert } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { useForm, Controller } from 'react-hook-form';

const LoginPage = ({ setLoggedIn }) => {
  const [openSignup, setOpenSignup] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  
  const { control, handleSubmit, formState: { errors } } = useForm();

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
    handleCloseSignup();
    handleOpenSnackbar(); // Open snackbar upon successful signup
    navigate('/home');
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Set loggedIn state to true upon successful login
    setLoggedIn(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      {openSignup && (
        <Dialog open={openSignup} onClose={handleCloseSignup}>
          <DialogTitle>Signup</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required', pattern: /^\S+@\S+$/i }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : null}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : null}
                  />
                )}
              />
              <DialogActions>
                <GoogleLogin
                  clientId="107927664873-olgo4b6berup6l3lo0ccvoin6oi6vq4q.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <IconButton onClick={renderProps.onClick} disabled={renderProps.disabled} color="primary">
                      <GoogleIcon />
                    </IconButton>
                  )}
                />
                <Button onClick={handleCloseSignup}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} sx={{ color: 'green' }}>
          Signup successful!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginPage;
