import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import axios from 'axios';
import { useState } from 'react';
import { Box } from '@mui/system';
import { AppBar, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useScreenSize } from '../hooks/useScreenSize';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { ConstructionOutlined } from '@mui/icons-material';
import { LoadingThink } from '../../UI/LoadingThink';

export const ProfilePersons = () => {

    const { id } = useParams();

    const { user } = useContext(AuthContext);

    const [Informacion, setInformacion] = useState({
        nombre: '',
        followers: [],
        follows: [],
        posts: [],
        isLoading: true
    })

    const getInfo = async() => {
        const profile = `http://127.0.0.1:8000/${id}`;
        const token = localStorage.getItem('token');
        const respuesta = await axios.get(profile,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setInformacion({
            nombre: respuesta.data.user.username,
            followers: respuesta.data.followers,
            follows: respuesta.data.follows,
            posts: respuesta.data.posts,
            isLoading: false
        });
    }

    useEffect(() => {
      getInfo()
    }, []);

    const { width, height } = useScreenSize();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
  
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

      const [Valor, setValor] = useState('Seguir');

      const getRespFollow = async() => {
        if(Informacion.isLoading === false){
            const search = Informacion.followers.find(follower=>follower.id === user.id);
            if(search){
                setValor('Siguiendo');
                getInfo();
            }else{
                setValor('Seguir');
                getInfo();
            }
      }
    };


    useEffect(() => {
        getRespFollow();
      }, [Informacion.isLoading]);
    
      const onFollowUser = async() => {
        const url = `http://127.0.0.1:8000/follow/${id}`;
        const token = localStorage.getItem('token');
        const respuesta = await axios.post(url,{
            
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        getInfo();
        if(Valor === 'Siguiendo'){
            setValor('Seguir')
        }else if(Valor === 'Seguir'){
            setValor('Siguiendo');
        }
      };
      

  return (
    <WhitexicansLayout>

                {
                    Informacion.isLoading
                    ?(<LoadingThink/>)
                    :(
                      <div>
                      <div className="py-5 bg-image-full" style={{ backgroundImage: `url("https://static.depositphotos.com/storage/portfolio-cover/387/3922387.jpg?1593139829")`, width: '100%'}}>
                        <div className="text-center">
                        <img className="img-fluid rounded-circle mb-4" src="https://dummyimage.com/150x150/6c757d/dee2e6.jpg" alt="..." />
                        <h1 className="text-dark fs-3 fw-bolder">@{ Informacion.nombre }</h1>
                        <button onClick={onFollowUser} className='btn btn-light fw-bold'>{ Valor }</button>
                        </div>
                      </div>
                         <Box sx={{ flexGrow: 1, mb: 5 }}>
                         <AppBar sx={{ backgroundColor:'#E9E9E9' }} position="static">
                          <Toolbar>
                           <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
                            <PostAddIcon/>{ Informacion?.posts.length }
                             </Typography>
                             <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
                                 <PeopleAltIcon/>{ Informacion?.follows.length }
                            </Typography>
                             <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
                            <GroupAddIcon/>{ Informacion.followers.length }
                             </Typography>
                          </Toolbar>
                        </AppBar>
                      </Box>
                      </div>
                     )
                  }

    <Grid container sx={{ mt: 3 }} spacing={0} direction="column" alignItems="center" justify="center">
    <Grid className='animate__animated animate__fadeIn' container direction='row' justify="center" alignItems='center' sx={{ mb: 1, maxWidth: `${ open ? '1000px' : '280px'}`, ml: `${ open ? '0px' : '40px' }` }}>

    </Grid>
</Grid>
    {
        Informacion.isLoading
        ? (<LoadingThink/>)
        :(
       Informacion.posts.map(post=>
    <Grid key={post.id} container spacing={0} direction="column" alignItems="center" justify="center">
    <Grid item xs={3}></Grid>
    <Card sx={{ width: `${ open ? '450px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="recipe">
          { user.username.charAt(0) }
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={ post.author_username }
      subheader={ post.category_name }
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
