import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useScreenSize } from '../hooks/useScreenSize';
import { StarOutline } from '@mui/icons-material';

export const Publicaciones = () => {

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
    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
  
    <Grid item xs={3}>
    <Card sx={{ maxWidth: `${ open ? '1000px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5 }}>
    <CardMedia
      component="img"
      height="400"
      image="https://upload.wikimedia.org/wikipedia/commons/c/c7/Portrait_of_an_Iguana.jpg"
      alt="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
  </Grid>      
 </Grid>
  )
}
