import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authSlice, checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth'
import {Link as RouterLink} from 'react-router-dom';
import { Grid, TextField, Typography , Button, Link, Alert} from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {
  
  const {status, errorMessage} = useSelector(state=>state.auth);

  const dispatch = useDispatch();
  
  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo(()=>status === 'checking', [status]);

  const onSubmit = (e)=>{
    e.preventDefault();
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const onGoogleSignIn = ()=>{
    dispatch(startGoogleSignIn());
  }


  return (
      <AuthLayout title='Login'>
        <form onSubmit={onSubmit}
          className='animate__animated animate__fadeIn animate__faster'
        >
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="correo" 
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name='email'
                onChange={onInputChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password"
                placeholder="Contraseña"
                fullWidth
                name='password'
                onChange={onInputChange}
                value={password}
              />
            </Grid>
            <Grid 
                item 
                xs={12}
                display={!!errorMessage ? '' : 'none'}
              >
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth type='submit'
                  disabled={isAuthenticating}
                  >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticating}
                >
                  <Google />
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>      
  )
}
