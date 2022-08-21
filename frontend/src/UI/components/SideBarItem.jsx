import HomeIcon from '@mui/icons-material/Home';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const SideBarItem = ({ nombre, icon, id }) => {

  const { logout, openModal, setOpenModal } = useContext(AuthContext);

  const onClickSideBar = (id) => {
    if(id === 6){
      logout();
    }
    else if(id === 2){
      setOpenModal(true);
    }

  }

  const onCreatePublication = (id) => {

  }

  return (
    <ListItem onClick={ ()=>onClickSideBar(id) } disablePadding>
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