import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { CheckingAuth } from '../../UI/CheckingAuth'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import MenuIcon from '@mui/icons-material/Menu';
import { useScreenSize } from '../hooks/useScreenSize'

export const ProfilePage = () => {

    const { user } = useContext(AuthContext);
    
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
      }, [width])

  return (
    <WhitexicansLayout>
            <Typography align="center" component="h1" variant="h5" sx={{ mt: 2 }}>
              @{ user.username }
            </Typography>

            <Box sx={{ flexGrow: 1, mt: 2 }}>
      <AppBar sx={{ backgroundColor:'#E9E9E9' }} position="static">
        <Toolbar>
          <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
              Seguidos: { user.follows.length }
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    {
       user.posts.map(post=>
        <Grid key={post.id} container spacing={0} direction="column" alignItems="center" justify="center">
        <Grid item xs={3}>
        <Card sx={{ maxWidth: `${ open ? '1000px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
        {/* <CardMedia
          component="img"
          height="400"
          image="https://upload.wikimedia.org/wikipedia/commons/c/c7/Portrait_of_an_Iguana.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
        <Typography gutterBottom align='center' variant="h3" component="div">
            { post.author }
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            { post.title } - { post.category }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { post.description }
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
          <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
      </Grid>      
     </Grid>
        )
    }
    </WhitexicansLayout>
  )
}
