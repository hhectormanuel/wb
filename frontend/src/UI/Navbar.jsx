import { AppBar, Avatar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const NavBar = ({ drawerWidth = 255 }) => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> Whitexicans </Typography>

                <IconButton onClick={()=>navigate(`/perfil/${ user.slug }`)} color='secondary'>
            <Avatar sx={{ bgcolor: 'green' }} aria-label="recipe">
               { user.username.charAt(0) }
            </Avatar>&nbsp;
                <Typography variant='h6' noWrap component='div'> { user.username } &nbsp; </Typography>
                    {/* <LogoutOutlined onClick={onLogout} /> */}
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}