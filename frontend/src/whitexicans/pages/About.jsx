import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';

export const About = () => {
  return (
    <>
        <WhitexicansLayout>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <h2 className='text-center'>Acerca de</h2>
                        <p className="mb-0 mx-auto">WhitexicansBlog es una red social creada por dos estudiantes universitarios, pensando en agregar una tematica diferente al mundo de las redes sociales. Actualmente se encuentra en fase BETA, por lo que pueden presentarse algúnos fallos y/o bugs, agradecemos mucho tus opiniones, pues todo nos ayuda a mejorar la experiencia de WhitexicansBlog para tí.</p>
                    </div>
                </div>
            </div>
            <hr />

            <Typography align="center" component="h1" variant={ open ? 'h5' : 'h6' } sx={{ ml: `${ open ? '0px' : '40px'}`, mt: 5 }}>
              INFORMACIÓN DE LOS DESARROLLADORES
            </Typography>

            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
    <Grid item xs={3}></Grid>
            <Card sx={{ maxWidth: 400, mt: 5 }}>
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      <CardContent>
        <Typography align="center" sx={{ fontSize: '25px' }} gutterBottom component="div">
          HECTOR AGUILAR
        </Typography>
        <Typography align="center" sx={{ mt: 2 }} color="black">
          DESARROLLADOR BACKEND - PYTHON
        </Typography>
        <Typography align="center" sx={{ mt: 2 }} color="black">
        <EmailIcon/>&nbsp;hectorcena@live.com.mx
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ maxWidth: 400, mt: 5 }}>
      {/* <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      /> */}
      <CardContent>
        <Typography align="center" sx={{ fontSize: '25px' }} gutterBottom component="div">
          CÉSAR PÉREZ
        </Typography>
        <Typography align="center" sx={{ mt: 2 }} color="black">
          DESARROLLADOR FRONTEND - REACT
        </Typography>
        <Typography align="center" sx={{ mt: 2 }} color="black">
        <EmailIcon/>&nbsp;asgarper11@gmail.com
        </Typography>
      </CardContent>
    </Card>
    </Grid>
        </WhitexicansLayout>
    </>
  )
}
