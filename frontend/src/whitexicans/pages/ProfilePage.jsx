import { AppBar, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { useScreenSize } from '../hooks/useScreenSize'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { CrearPublicacion } from '../components/CrearPublicacion'
import { ModalFollows } from './components/ModalFollows'
import { ModalFollowers } from './components/ModalFollowers'
import { ModalPhotos } from '../components/ModalPhotos'
import { LikesModal } from '../components/LikesModal'
import { ModalComments } from '../components/ModalComments'
import { useEffect } from 'react'
import { useState } from 'react'
import { Publicaciones } from '../components/Publicaciones'
import { usePost } from '../hooks/usePost'
import { LoadingThink } from '../../UI/LoadingThink'

export const ProfilePage = () => {

    const { user, Data } = useContext(AuthContext);

    const [UserInfo, setUserInfo] = useState({
      posts: [],
      followers: [],
      follows: [],
      isLoading: true
    });
    
    const { width } = useScreenSize();

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

      const addInfo = () => {

        if(user.followers !== undefined & user.follows !== undefined  & user.posts !== undefined ){
          setUserInfo({
            posts: user.posts,
            followers: user.followers,
            follows: user.follows,
            isLoading: false
          });
        }
      };

      useEffect(() => {
        addInfo();
      }, []);
      
      

  return (
    <WhitexicansLayout>

        <div className="py-5 bg-image-full" style={{ backgroundImage: `url("https://static.depositphotos.com/storage/portfolio-cover/387/3922387.jpg?1593139829")`, width: '100%'}}>
          <div className="text-center">
              <img className="img-fluid rounded-circle mb-4" src="https://dummyimage.com/150x150/6c757d/dee2e6.jpg" alt="..." />
              <h1 className="text-dark fs-3 fw-bolder">@{ user.username }</h1>
          </div>
        </div>

      {
        UserInfo.isLoading
        ? <LoadingThink/>
        :(
          <Box sx={{ flexGrow: 1, mb: 5, ml: 5 }}>
          <AppBar sx={{ backgroundColor:'#E9E9E9' }} position="static">
            <Toolbar>
            <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
              <PostAddIcon/>{ UserInfo?.posts?.length }
              </Typography>
              <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black', mt: 1 }}>
                  { UserInfo?.follows?.length }
                  <ModalFollows/>
              </Typography>
              <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black', mt: 1 }}>
              { UserInfo.followers?.length }
              <ModalFollowers/>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        )
      }

        <CrearPublicacion/>

        <Publicaciones Informacion={Data} data={Data.info} />
    </WhitexicansLayout>
  )
}
