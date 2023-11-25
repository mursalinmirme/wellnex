import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import signin from '../../assets/signin.jpg';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
const Signin = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    return (
        <div style={{width: '80%', margin: '0 auto', marginTop: '40px'}}>
            <Grid container component="main">
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            opacity: '0.7',
            backgroundImage: `url(${signin})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'white' }}>
              <img style={{width: '50px', borderRadius:'50%'}} src="./logo.png" alt="" />
            </Avatar>
            <Typography component="h1" fontWeight={'700'} variant="h5">
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Grid mt={'15px'}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{bgcolor: '#0077B6', color: '#ffffff', fontWeight: '600', py: '12px','&:hover': {background: '#0096C7', color: '#ffffff'}}}
              >
                Sign In
              </Button>
              </Grid>
              <Grid container mt={'15px'}>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        </Grid>
        </div>
    );
};

export default Signin;