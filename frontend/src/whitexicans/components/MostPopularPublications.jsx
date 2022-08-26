import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { LoadingThink } from '../../UI/LoadingThink';
import { useScreenSize } from '../hooks/useScreenSize';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ModalPhotos } from './ModalPhotos';
import { LikesModal } from './LikesModal';
import { ModalComments } from './ModalComments';
import { Publicaciones } from './Publicaciones';

export const MostPopularPublications = () => {

  const { user, Postss } = useContext(AuthContext);
  
  const { width, height } = useScreenSize();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();
  // const [Posts, setPosts] = useState({
  //   data: [],
  //   isLoading: true
  // });

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

    // const getMostPopularPublications = async() => {
    //   const url = 'http://127.0.0.1:8000/post/popular/';
    //   const token = localStorage.getItem('token');
    //   try {
    //     const resp = await axios.get(url,{
    //       headers:{
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    //     setPosts({
    //       data: resp.data,
    //       isLoading: false
    //     });
    //   } catch (error) {
    //     console.log(error)
    //   }
    // };

    // useEffect(() => {
    //   getMostPopularPublications();
    // }, []);  
    
    const { data } = Postss;

  return (
    <WhitexicansLayout>
    <Typography align="center" component="h1" variant={ open ? 'h5' : 'h6' } sx={{ ml: `${ open ? '0px' : '40px'}`, mt: 5 }}>
              PUBLICACIONES MÁS POPULARES
            </Typography>

            <Publicaciones Informacion={Postss} data={data} />
    </WhitexicansLayout>
  )
}
