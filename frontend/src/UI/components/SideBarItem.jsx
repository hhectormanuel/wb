import HomeIcon from '@mui/icons-material/Home';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'

export const SideBarItem = ({ nombre, icon }) => {

  return (
    <ListItem disablePadding>
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