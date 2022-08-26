import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { useScreenSize } from '../hooks/useScreenSize';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { LoadingThink } from '../../UI/LoadingThink';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { Box } from '@mui/system';
import { ModalPhotos } from './ModalPhotos';
import { LikesModal } from './LikesModal';
import { ModalComments } from './ModalComments';
import { Publicaciones } from './Publicaciones';

export const FollowPublications = () => {
  
  const { user, Posts } = useContext(AuthContext);

  const { width, height } = useScreenSize();
  const [open, setOpen] = React.useState(false);

  const getSizeScreen = () => {
    if(width >= 606) {
      setOpen(true);
    };

    if(width <= 599){
      setOpen(false);
    }
  };

  React.useEffect(() => {
    getSizeScreen();
  }, [width]);
  
  const { data } = Posts;

  return (
    <WhitexicansLayout>
    <Typography align="center" component="h1" variant={ open ? 'h5' : 'h6' } sx={{ml: `${ open ? '0px' : '40px'}`, mt: 5 }}>
              PUBLICACIONES DE SEGUIDOS
            </Typography>

      <Publicaciones Informacion={Posts} data={data} />
    </WhitexicansLayout>
  )
}
