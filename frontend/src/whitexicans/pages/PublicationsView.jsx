import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography, } from '@mui/material';
import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext';
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { LoadingThink } from '../../UI/LoadingThink';
import { LikesModal } from '../components/LikesModal';
import { ModalComments } from '../components/ModalComments';
import { ModalPhotos } from '../components/ModalPhotos';
import { useScreenSize } from '../hooks/useScreenSize';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Comments } from '../components/Comments';
import { CreateContext } from '../context/CreateContex';

export const PublicationsView = () => {

    const { user, Postss } = useContext(AuthContext);

    const { width, height } = useScreenSize();

    const [Like, setLike] = useState(false);

  const [open, setOpen] = React.useState(false);

  const { Comment, onGetComments } = useContext(CreateContext);

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
    }, [width])

    const { id } = useParams();

    const [Post, setPost] = useState({
        post: [],
        isLoading: true,
    });

    let publi = [];

    const getPublications = async() => {
        const token = localStorage.getItem('token');
        const profile = `http://127.0.0.1:8000/post/`;
        const respuesta = await axios.get(profile,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(respuesta.data !== undefined){
            const publicacion = respuesta.data.find(post=>post.slug === id);
            publi.push(publicacion);
            setPost({
                post: publi,
                isLoading: false
            });
            const likeFilter = publicacion.people_like.find(like=>like.username === user.username);
            if(likeFilter){
                setLike(true);
            }else{
                setLike(false);
            }
        }
    };

    const putLike = async(slug) => {
        const url = `http://127.0.0.1:8000/like/${slug}`;
        const token = localStorage.getItem('token');
        const resp = await axios.post(url,{
  
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
            getPublications();
      };



    const getComments = async() => {
      onGetComments(id);
  }

    useEffect(() => {
      getPublications();
      getComments();
    }, []);

  return (
    <WhitexicansLayout>
        {
            Post.isLoading 
            ? <LoadingThink/>
            : (
                Post.post.map(post=>
                    <Grid key={post.id} container spacing={0} direction="column" alignItems="center" justify="center">
                    <Grid item xs={3}></Grid>
                    <Card sx={{ width: `${ open ? '500px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
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
                      :<ModalPhotos imagenes={post.images}/>
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
                      <IconButton sx={{ color: `${ Like ? 'red' : 'gray' }` }} aria-label="add to favorites" onClick={()=>putLike(post.slug)} >
                        <FavoriteIcon />
                      </IconButton>
                      <LikesModal post={post} />
                    </CardActions>
                  </Card>
                     </Grid>   
                    )
            )
        }
              <Comments comment={Comment}/>
    </WhitexicansLayout>
  )
}
