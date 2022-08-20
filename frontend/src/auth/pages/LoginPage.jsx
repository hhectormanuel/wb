
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useForm } from '../../whitexicans/hooks/useForm';
import { AuthContext } from '../context/AuthContext';
import { AuthLayout } from '../layout/AuthLayout';

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
    <AuthLayout title="INICIAR SESIÓN">
      <form onSubmit={onLogin} className='animate__animated animate__fadeIn'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Username" 
                type="text" 
                placeholder='Username' 
                fullWidth
                name='username'
                value={username}
                onChange={onInputChange}
                error={ !!usernameValid && formSubmitted }
                helperText={ usernameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>

            <Grid container>
            <Grid item xs={12} sx={{mt: 2}} display={!!error ? '' : 'none'}>
              {/* <Grid item xs={12} sx={{mt: 2}}> */}
                <Alert severity='error'>{error}</Alert>
              </Grid>
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
