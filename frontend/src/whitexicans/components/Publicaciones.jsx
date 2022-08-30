import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, CardHeader, Grid, IconButton, } from '@mui/material';
import { useScreenSize } from '../hooks/useScreenSize';
import { StarOutline } from '@mui/icons-material';
import { LoadingThink } from '../../UI/LoadingThink';
import { AuthContext } from '../../auth/context/AuthContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { ModalPhotos } from './ModalPhotos';
import { LikesModal } from './LikesModal';
import { ModalComments } from './ModalComments';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { usePost } from '../hooks/usePost';

export const Publicaciones = ({ Informacion, data }) => {

  const { user, getFollowsPublications,getMostPopularPublications,onRefreshPublications } = React.useContext(AuthContext);

  const { width, height } = useScreenSize();

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { id } = useParams();

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

    const onClickUser = (author) => {
      if(author === user.slug){
        navigate(`/perfil/${ user.slug }`)
        return;
      }
      navigate(`/view/${author}`);
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
      if(pathname === '/populars'){
        getMostPopularPublications();
      }
      else if(pathname === '/follows'){
        getFollowsPublications();
      }
      else if(pathname === `/perfil/${user.slug}`){
        onRefreshPublications();
      }
      else if(pathname === `/view/${id}`){
        getInfo();
      }
    };

    const onViewPublication =(slug) => {
      navigate(`/publication/${slug}`);
    }
    

  return (
      <>
            {
        Informacion.isLoading
        ? (<LoadingThink/>)
        :(
       data.map(post=>
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
      {/* <IconButton aria-label="add to favorites" onClick={()=>putLike(post.slug)} >
        <FavoriteIcon />
      </IconButton> */}
      <LikesModal post={post} />
      {/* <ModalComments/> */}
      <Button onClick={()=>onViewPublication(post.slug)}>Ver más...</Button>
    </CardActions>
  </Card>
     </Grid>      
        ))
    }
      </>
  )
}
