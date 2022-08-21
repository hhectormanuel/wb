import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';


export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <Grid item xs={12} sm={8} md={5} elevation={6}>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
            
            { children }
            </Box>
        </Grid>
        </Grid>


  )
}
