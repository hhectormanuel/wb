import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
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
import { ModalPhotos } from './ModalPhotos';
import { LikesModal } from './LikesModal';
import { ModalComments } from './ModalComments';
import { Publicaciones } from './Publicaciones';
import { usePost } from '../hooks/usePost';

export const ProfilePersons = () => {

    const { id } = useParams();

    const { user } = useContext(AuthContext);

    // const {Info, Valor, onFollowUser, getInfo} = usePost(id);

    const [Info, setInfo] = useState({
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
        setInfo({
            nombre: respuesta.data.user.username,
            followers: respuesta.data.followers,
            follows: respuesta.data.follows,
            posts: respuesta.data.posts,
            img: respuesta.data.profile_img,
            isLoading: false
        });
    };

    useEffect(() => {
      getInfo();
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
        if(Info.isLoading === false){
            const search = Info.followers.find(follower=>follower.id === user.id);
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
      }, [Info.isLoading]);
    
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

    const putLike = async(slug) => {
      const url = `http://127.0.0.1:8000/like/${slug}`;
      const token = localStorage.getItem('token');
      const resp = await axios.post(url,{

      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
        getInfo();
    };
    const navigate = useNavigate();
    const onViewPublication =(slug) => {
      navigate(`/publication/${slug}`);
    }

  return (
    <WhitexicansLayout>

                {
                    Info.isLoading
                    ?(<LoadingThink/>)
                    :(
                      <div>
                      <div className="py-5 bg-image-full" style={{ backgroundImage: `url("https://static.depositphotos.com/storage/portfolio-cover/387/3922387.jpg?1593139829")`, width: '100%'}}>
                        <div className="text-center">
                        <img className="img-fluid rounded-circle mb-4" src={`${Info.img ? Info.img : 'https://dummyimage.com/150x150/6c757d/dee2e6.jpg'}`} width='150px' height='150px' alt="..." />
                        <h1 className="text-dark fs-3 fw-bolder">@{ Info.nombre }</h1>
                        <button onClick={onFollowUser} className='btn btn-light fw-bold'>{ Valor }</button>
                        </div>
                      </div>
                         <Box sx={{ flexGrow: 1, mb: 5 }}>
                         <AppBar sx={{ backgroundColor:'#E9E9E9' }} position="static">
                          <Toolbar>
                           <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
                            <PostAddIcon/>{ Info?.posts.length }
                             </Typography>
                             <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
                                 <PeopleAltIcon/>{ Info?.follows.length }
                            </Typography>
                             <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
                            <GroupAddIcon/>{ Info.followers.length }
                             </Typography>
                          </Toolbar>
                        </AppBar>
                      </Box>
                      </div>
                     )
                  }

{
        Info.isLoading
        ? (<LoadingThink/>)
        :(
       Info.posts.map(post=>
    <Grid key={post.id} container spacing={0} direction="column" alignItems="center" justify="center">
    <Grid item xs={3}></Grid>
    <Card sx={{ width: `${ open ? '450px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="recipe">
          {
            Info.img
            ? <img src={Info.img} width='40px' height='40px' alt="..." />
            : Info.nombre.charAt(0)
          }
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
      <LikesModal post={post} />
      <Button onClick={()=>onViewPublication(post.slug)}>Ver m??s...</Button>
    </CardActions>
  </Card>
     </Grid>      
        ))
    }

</WhitexicansLayout>
  )
}
