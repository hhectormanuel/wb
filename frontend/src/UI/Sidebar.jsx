import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { LogoutOutlined, TurnedInNot } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { SideBarItem } from './components/SideBarItem';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useScreenSize } from '../whitexicans/hooks/useScreenSize';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InfoIcon from '@mui/icons-material/Info';
export const SideBar = ({ drawerWidth = 240 }) => {

    const { width, height } = useScreenSize();

    const Navegacion = [
        {id: 1, nombre: 'Inicio', icon: <HomeIcon/>},
        {id: 2, nombre: 'Crear publicación', icon: <DynamicFeedIcon/>},
        { id: 3, nombre: 'Más populares', icon: <PostAddIcon/> },
        { id: 4, nombre: 'Publicaciones de amigos', icon: <LocalPostOfficeIcon/> },
        { id: 5, nombre: 'Perfíl', icon: <AccountCircleIcon/> },
        { id: 6, nombre: 'Ajustes', icon: <SettingsIcon/> },
        { id: 8, nombre: 'Publicidad', icon: <LocalLibraryIcon/> },
        { id: 9, nombre: 'Acerca de', icon: <InfoIcon/> },
        { id: 7, nombre: 'Cerrar sesión', icon: <LogoutOutlined/> },
    ];

    const [open, setOpen] = useState(false);

    const getSizeScreen = () => {
        if(width >= 606) {
          setOpen(true);
        };
    
        if(width <= 599){
          setOpen(false);
        }
      };
  
      useEffect(() => {
        getSizeScreen();
      }, [width])

  return (
    <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant='permanent' sx={{  display: { xs: 'block' },'& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${ open ? drawerWidth : '52px' } ` } }}>
            {/* <Toolbar sx={{background: '#388e3c'}}>
                <Typography variant='h6' noWrap component='div'>
                </Typography>
            </Toolbar>
            <Divider /> */}

            <List>
                {
                    Navegacion.map( icons => (
                        <SideBarItem key={icons.id} {...icons}/>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}