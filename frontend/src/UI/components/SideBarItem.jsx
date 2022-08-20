import HomeIcon from '@mui/icons-material/Home';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const SideBarItem = ({ nombre, icon, id }) => {

  const { logout } = useContext(AuthContext);

  const onLogout = (id) => {
    if(id !== 3) return;

    logout();
  }

  return (
    <ListItem onClick={ ()=>onLogout(id) } disablePadding>
    <ListItemButton>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <Grid container>
            <ListItemText primary={ nombre } />
        </Grid>
    </ListItemButton>
</ListItem>
  )
}