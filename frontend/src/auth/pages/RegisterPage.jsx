import React, { useContext, useState } from 'react'
import { useForm } from '../../whitexicans/hooks/useForm';
import { AuthContext } from '../context/AuthContext';
import { AuthLayout } from '../layout/AuthLayout'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink } from 'react-router-dom';
import { Alert, Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          WhitexicansBlog
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };
  
  const formData = {
    username: '', password: '', confirmPassword: '', firstName: '', lastName: '', email: ''
  };
  
  const formValidations = {
    username: [ (value) => value.length >= 5 , 'El nombre debe contener mas de 5 caracteres'],
    password: [  (value) => value.length >= 6, 'La contraseña debe tener 6 caracteres o más' ],
  }

export const RegisterPage = () => {

    const { username, password, confirmPassword, firstName, lastName, email,  onInputChange, formState, usernameValid, passwordValid, isFormValid } = useForm(formData, formValidations);

    const { onStartRegister, error, setError } = useContext(AuthContext);
  
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const onRegister = (e) => {
      e.preventDefault();
      setFormSubmitted(true);
      if (!isFormValid) return;
      if(password != confirmPassword) {
        console.log(password, passwordValid)
        setError('Las contraseñas no coinciden')
        return;
      }
      onStartRegister(username, password, firstName, lastName, email);
    }

  return (
    <AuthLayout>
<h1 className='titulo' align="center" component="h1" variant="h1" sx={{ mb: 8 }}>
              WHITEXICANS BLOG
            </h1>
      <form onSubmit={onRegister} className='animate__animated animate__fadeIn'>
          
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', mx: 'auto' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography align="center" component="h1" variant="h5" sx={{ mt: 2 }}>
              REGISTRARSE
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Username"
                name="username"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={ onInputChange }
                error={ !!usernameValid && formSubmitted }
                helperText={ usernameValid }
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />

                <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />

                <TextField
                margin="normal"
                fullWidth
                id="email"
                label="First name"
                name="firstName"
                autoFocus
                value={firstName}
                onChange={ onInputChange }
                error={ !!usernameValid && formSubmitted }
                helperText={ usernameValid }
              />

                <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Last name"
                name="lastName"
                autoFocus
                value={lastName}
                onChange={ onInputChange }
                error={ !!usernameValid && formSubmitted }
                helperText={ usernameValid }
              />

                <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={ onInputChange }
                error={ !!usernameValid && formSubmitted }
                helperText={ usernameValid }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                REGISTRARSE
              </Button>

              <Grid container>
              <Grid item xs={12} sx={{mt: 2}} display={!!error ? '' : 'none'}>
                <Alert severity='error'>{error}</Alert>
              </Grid>
            </Grid><br/>

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <NavLink to='/auth/login'>
                    {"¿Ya tienes una cuenta? Inicia sesión"}
                  </NavLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
        </form>
    </AuthLayout>
  )
}
