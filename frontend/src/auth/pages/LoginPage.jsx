
import { Alert, Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from '../../whitexicans/hooks/useForm';
import { AuthContext } from '../context/AuthContext';
import { AuthLayout } from '../layout/AuthLayout';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink } from 'react-router-dom';

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
  username: '', password: ''
};

const formValidations = {
  username: [ (value) => value.length >= 5 , 'El nombre debe contener mas de 5 caracteres'],
  password: [  (value) => value.length >= 4, 'La contraseña debe tener 6 caracteres o más' ],
}

export const LoginPage = () => {

  const { username, password, onInputChange, formState, usernameValid, passwordValid, isFormValid } = useForm(formData, formValidations);

  const { onStartLogin, error } = useContext(AuthContext);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    onStartLogin(username, password);
  }

  return (
    <AuthLayout title='Iniciar Sesion'>
                  <h1 className='titulo' align="center" component="h1" variant="h1" sx={{ mt: 2, mb: 8 }}>
              WHITEXICANS BLOG
            </h1>
      <form onSubmit={onLogin} className='animate__animated animate__fadeIn'>
          
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', mx: 'auto' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography align="center" component="h1" variant="h5" sx={{ mt: 2 }}>
              INICIAR SESIÓN
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                ENTRAR
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
                  <NavLink to='/auth/register'>
                    {"¿No tienes una cuenta? Registrate aquí"}
                  </NavLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
        </form>

    </AuthLayout>
  )
}
