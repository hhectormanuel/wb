import { SaveOutlined } from '@mui/icons-material'
import { Alert, Avatar, Button, CircularProgress, Grid, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useMemo, useRef } from 'react'
import { useScreenSize } from '../hooks/useScreenSize';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { CreateContext } from '../context/CreateContex';
import Swal from 'sweetalert2'
import { LoadingThink } from '../../UI/LoadingThink';
import { useEffect } from 'react';

const formData = {
  Titulo: '',
  Descripcion: '',
};

const formValidations = {
  Titulo: [ (value) => value.length <= 40 && value.length >= 1 , '40 carácteres máximo'],
  Descripcion: [  (value) => value.length <= 255 && value.length >= 1, '255 carácteres máximo' ],
}

export const CrearPublicacion = () => {

  const { Titulo, Descripcion, onInputChange, isFormValid, TituloValid, DescripcionValid } = useForm(formData, formValidations);

  const [Cat, setCat] = useState('');

  const { openModal, setOpenModal, onRefreshPublications } = useContext(AuthContext);

  const { createPublication, Categorias, Publicacion, Photos, startUploadingFiles } = useContext(CreateContext);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [Mensaje, setMensaje] = useState();

  const isSavingPost = useMemo( () => Publicacion.isSaving === true );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

    const { width, height } = useScreenSize();

    const onNewPublication = (e) => {
      e.preventDefault();
      setFormSubmitted(true);
      if (!isFormValid) return;
      createPublication(Titulo, Descripcion, Cat);
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Publicado',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      setOpenModal(false);
      onRefreshPublications();
      setMensaje('Publicación realizada con éxito')
    }
    
    const inputRef = useRef();

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
        overflow: `${ open ? null : 'scroll' }`,
        display:`${ open ? null : 'block' }`,
        height:`${ open ? null : '100%' }`,
      };

      const handleChange = event => {
        setCat(event.target.value);
      };

      const [Severidad, setSeveridad] = useState();

      const png = '.png';
      const jpg = '.jpg';
      const jpeg = '.jpeg';

      const onFileInputChange = (e) => {
        if(e.target.files === 0) return;
        for(let i=0; i<=e.target.files.length; i++){
          if(e.target.files[i] === undefined){
            break;
          }
          if(e.target.files[0].name.endsWith(png)){
            startUploadingFiles(e.target.files);
            setSeveridad();
            setMensaje();
            return;
          }else if(e.target.files[0].name.endsWith(jpg)){
            startUploadingFiles(e.target.files);
            setSeveridad();
            setMensaje();
            return;
          }else if(e.target.files[0].name.endsWith(jpeg)){
            startUploadingFiles(e.target.files);
            setSeveridad();
            setMensaje();
            return;
          }else{
            setSeveridad('error');
            setMensaje('Formato de imagen no válido. ');
          }
        }
      }

  return (
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

            {
              Mensaje
              ? (
                <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                >
                <Grid item xs={3} sx={{mt: 2}} align='center'>
                  <Alert severity={Severidad}>{Mensaje}</Alert>
                </Grid>
              </Grid>
              )
              : null
            }

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align='center' variant='h6' sx={{ mb: 0 }}>CREAR PUBLICACIÓN</Typography>
          <Box textAlign='center'>
          <Button onClick={handleClose}>Cancelar</Button>
          </Box>
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
            error={ !!TituloValid && formSubmitted }
            helperText={ TituloValid }
        />

        <p className='text-secondary'>{Titulo.length}/40</p>

        <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió en el día de hoy?"
            minRows={ 4 }
            name='Descripcion'
            value={Descripcion}
            onChange={onInputChange}
            error={ !!DescripcionValid && formSubmitted }
            helperText={ DescripcionValid }
        />

        <p className='text-secondary'>{Descripcion.length}/255</p>

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
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"

              onChange={ handleChange }
              value={Cat}
            >
              {
                Categorias.isLoading
                ? <LoadingThink/>
                :(
              Categorias.data.map(categoria=>
                <MenuItem value={ categoria.id} key={ categoria.id }  >{ categoria.category_name }</MenuItem>
                )
                )
            }
            </Select>
            </Grid>   

            <input type="file" multiple name='Imagen' onChange={onFileInputChange} ref={ inputRef } hidden />
                <Box textAlign='center'>
                <Button
                disabled={ isSavingPost }
                onClick={ ()=>inputRef.current.click() }
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <ImageIcon/>&nbsp;
                AGREGAR IMAGEN
              </Button>
              </Box>
              <div className="text-center text-secondary">
                {
                  Photos.length === 0 ? 'Formatos Válidos: (png, jpg, jpeg)' : null
                }
              </div>
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
              {
              Mensaje
              ? (
                <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                >
                <Grid item xs={3} sx={{mt: 2}} align='center'>
                  <Alert severity={Severidad}>{Mensaje}</Alert>
                </Grid>
              </Grid>
              )
              : null
            }
              </div>
        
                      <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={ isSavingPost }
                sx={{ mt: 3, mb: 2 }}
              >
                PUBLICAR
              </Button>
              </form>
        </Box>
      </Modal>
    </Grid>
</Grid></Grid>
  )
}
