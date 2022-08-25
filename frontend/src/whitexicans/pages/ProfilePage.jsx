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

export const ProfilePage = () => {

    const { user } = useContext(AuthContext);
    
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

  return (
    <WhitexicansLayout>

        <div className="py-5 bg-image-full" style={{ backgroundImage: `url("https://static.depositphotos.com/storage/portfolio-cover/387/3922387.jpg?1593139829")`, width: '100%'}}>
          <div className="text-center">
              <img className="img-fluid rounded-circle mb-4" src="https://dummyimage.com/150x150/6c757d/dee2e6.jpg" alt="..." />
              <h1 className="text-dark fs-3 fw-bolder">@{ user.username }</h1>
          </div>
        </div>

        <Box sx={{ flexGrow: 1, mb: 5 }}>
          <AppBar sx={{ backgroundColor:'#E9E9E9' }} position="static">
            <Toolbar>
            <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
              <PostAddIcon/>{ user?.posts.length }
              </Typography>
              <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black', mt: 1 }}>
                  { user?.follows.length }
                  <ModalFollows/>
              </Typography>
              <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black', mt: 1 }}>
              { user.followers.length }
              <ModalFollowers/>
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>

        <CrearPublicacion/>

    {
      user.posts.length === 0
      ?(null)
    :(
       user.posts.map(post=>
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
        )
    )
    }
    </WhitexicansLayout>
  )
}
