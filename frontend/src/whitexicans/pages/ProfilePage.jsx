import { AppBar, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { CheckingAuth } from '../../UI/CheckingAuth'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import MenuIcon from '@mui/icons-material/Menu';
import { useScreenSize } from '../hooks/useScreenSize'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useForm } from '../hooks/useForm'
import { CreateContext } from '../context/CreateContex'
import ImageIcon from '@mui/icons-material/Image';
import Swal from 'sweetalert2'

const formData = {
  Titulo: '',
  Descripcion: '',
  Imagen: []
}  

export const ProfilePage = () => {

    const { user } = useContext(AuthContext);

    const { Titulo, Descripcion, onInputChange, Imagen } = useForm(formData);

    const [Cat, setCat] = useState('');
    
    const { width, height } = useScreenSize();
    const { openModal, setOpenModal } = useContext(AuthContext);
    const { createPublication, Categorias, Publicacion, startUploadingFiles, Photos } = useContext(CreateContext);
    const inputRef = useRef();
    const isSavingPost = useMemo( () => Publicacion.isSaving === true );

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

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${open ? '800px' : '400px'}`,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
      };

      const handleChange = event => {
        setCat(event.target.value);
      };

      const onNewPublication = (e) => {
        e.preventDefault();
        createPublication(Titulo, Descripcion, Cat);
        Swal.fire({
          icon: 'success',
          title: 'Publicado',
          showConfirmButton: false,
          timer: 1500
        })
        setOpenModal(false);
      }

      const onFileInputChange = (e) => {
        if(e.target.files === 0) return;
        startUploadingFiles(e.target.files)
      }

  return (
    <WhitexicansLayout>
              <div className="py-5 bg-image-full" style={{ backgroundImage: `url("https://static.depositphotos.com/storage/portfolio-cover/387/3922387.jpg?1593139829")`, width: '100%'}}>
            <div className="text-center">
              {/* my-5 */}
                <img className="img-fluid rounded-circle mb-4" src="https://dummyimage.com/150x150/6c757d/dee2e6.jpg" alt="..." />
                <h1 className="text-dark fs-3 fw-bolder">@{ user.username }</h1>
                {/* <p class="text-white-50 mb-0">Landing Page Template</p> */}
            </div>
        </div>
            <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar sx={{ backgroundColor:'#E9E9E9' }} position="static">
        <Toolbar>
        <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
          <PostAddIcon/>{ user.posts.length }
          </Typography>
          <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
              <PeopleAltIcon/>{ user.follows.length }
          </Typography>
          <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
          <GroupAddIcon/>{ user.posts.length }
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <Grid container sx={{ mt: 3 }} spacing={0} direction="column" alignItems="center" justify="center">
    <Grid className='animate__animated animate__fadeIn' container direction='row' justify="center" alignItems='center' sx={{ mb: 1, maxWidth: `${ open ? '1000px' : '280px'}`, ml: `${ open ? '0px' : '40px' }` }}>

    <Grid container>
    <TextField 
            disabled={isSavingPost}
            onClick={handleOpen}
            readOnly
            variant="filled"
            fullWidth
            label="¿En que piensas hoy?"
            sx={{ border: 'none', mb: 1 }}
            name='title'
            value=''
        />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align='center' variant='h6' sx={{ mb: 2 }}>CREAR PUBLICACIÓN</Typography>
          <hr/>
          <form onSubmit={onNewPublication}>
        <TextField 
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un título"
            label="Título"
            sx={{ border: 'none', mb: 1, mt: 1 }}
            name='Titulo'
            value={Titulo}
            onChange={onInputChange}
        />

        <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió en el día de hoy?"
            minRows={ 5 }
            name='Descripcion'
            value={Descripcion}
            onChange={onInputChange}
        />

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={
              { mt: 2}
            }
          >
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"

              onChange={ handleChange }
              value={Cat}
            >
              {
              Categorias.data.map(categoria=>
                <MenuItem value={ categoria.id} key={ categoria.id }  >{ categoria.category_name }</MenuItem>
                )
            }
            </Select>
            </Grid>   

        <input type="file" multiple name='Imagen' onChange={onFileInputChange} ref={ inputRef } hidden />
                <Box textAlign='center'>
                <Button
                disabled={isSavingPost}
                onClick={ ()=>inputRef.current.click() }
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <ImageIcon/>&nbsp;
                AGREGAR IMAGEN
              </Button>
              </Box>

              <div className="text-center">
              {
                Photos.length === 0
                ? null
                :(
                  Photos.map(Photo=>
                    <img key={Photo} src={Photo} width='150'></img>
                    )
                )
              }
              </div>
        
                      <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSavingPost}
                sx={{ mt: 3, mb: 2 }}
              >
                PUBLICAR
              </Button>
              </form>
        </Box>
      </Modal>
    </Grid>
</Grid></Grid>
    {
       user.posts.map(post=>
    <Grid key={post.id} container spacing={0} direction="column" alignItems="center" justify="center">
    <Grid item xs={3}></Grid>
    <Card sx={{ width: `${ open ? '450px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="recipe">
          R
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
    <CardMedia
      component="img"
      height="194"
      // image="https://upload.wikimedia.org/wikipedia/commons/c/c7/Portrait_of_an_Iguana.jpg"
      image={post.images[0]}
      alt="Paella dish"
    />
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
    }
    </WhitexicansLayout>
  )
}
