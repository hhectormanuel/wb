import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { SideBarItem } from './components/SideBarItem';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useScreenSize } from '../whitexicans/hooks/useScreenSize';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { width, height } = useScreenSize();

    const Navegacion = [
        {id: 1, nombre: 'Inicio', icon: <HomeIcon/>},
        {id: 2, nombre: 'Crear publicación', icon: <DynamicFeedIcon/>}
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