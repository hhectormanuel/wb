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

export const FollowPublications = () => {
  
  const { user } = useContext(AuthContext);

  const { width, height } = useScreenSize();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();
  const [Posts, setPosts] = useState({
    data: [],
    isLoading: true
  });

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

  const getFollowsPublications = async() => {
    const url = 'http://127.0.0.1:8000/post/follows/';
    const token = localStorage.getItem('token');
    try {
      const resp = await axios.get(url,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts({
        data: resp.data,
        isLoading: false
      });
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getFollowsPublications();
  }, []);
  
  const onClickUser = (author) => {
    if(author === user.slug){
      navigate(`/perfil/${ user.slug }`)
      return;
    }
    navigate(`/view/${author}`);
  }

  return (
    <WhitexicansLayout>
    <Typography align="center" component="h1" variant={ open ? 'h5' : 'h6' } sx={{ml: `${ open ? '0px' : '40px'}`, mt: 5 }}>
              PUBLICACIONES DE SEGUIDOS
            </Typography>

            {
        Posts.isLoading
        ? (<LoadingThink/>)
        :(
       Posts.data.map(post=>
    <Grid key={post.id} container spacing={0} direction="column" alignItems="center" justify="center">
    <Grid item xs={3}></Grid>
    <Card sx={{ width: `${ open ? '450px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="recipe">
          { post.author_username.charAt(0) }
        </Avatar>
      }
      action={
        <Box sx={{mr: 50}}>
          <Button size='small' sx={{ color: 'black' }} onClick={ () => onClickUser(post.author_slug) }>{post.author_username}</Button>
          <Typography sx={{ fontSize: 13 }} color='gray'>{post.category_name}</Typography>
        </Box>
      }

    />
    {
      post.images.length === 0
      ? null
      :(
        <CardMedia
        component="img"
        height="194"
        image={post.images[0]}
        alt={post.author_username}
      />
      )
    }

    <CardContent>
    <Typography variant="h6" color="text.secondary">
      { post.title }
      </Typography><br />
      <Typography variant="body2" color="text.secondary">
      { post.description }
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
    </CardActions>
  </Card>
     </Grid>      
        ))
    }
    </WhitexicansLayout>
  )
}
