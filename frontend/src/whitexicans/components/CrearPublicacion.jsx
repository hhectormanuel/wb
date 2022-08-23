import { SaveOutlined } from '@mui/icons-material'
import { Avatar, Button, Grid, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useScreenSize } from '../hooks/useScreenSize';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { CreateContext } from '../context/CreateContex';

const formData = {
  Titulo: '',
  Descripcion: '',
}  

export const CrearPublicacion = () => {

  const { Titulo, Descripcion, onInputChange } = useForm(formData);

  const [Cat, setCat] = useState();

  const { openModal, setOpenModal } = useContext(AuthContext);

  const { createPublication, Categorias } = useContext(CreateContext);
  console.log(Categorias)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

    const { width, height } = useScreenSize();

    const onNewPublication = (e) => {
      e.preventDefault();
      console.log(Titulo, Descripcion, Cat);
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
      };

  return (
    <Grid container sx={{ mt: 3 }} spacing={0} direction="column" alignItems="center" justify="center">
    <Grid className='animate__animated animate__fadeIn' container direction='row' justify="center" alignItems='center' sx={{ mb: 1, maxWidth: `${ open ? '1000px' : '280px'}`, ml: `${ open ? '0px' : '40px' }` }}>
    {/* <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
        </Button>
    </Grid> */}

    <Grid container>
    <TextField 
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
            >
              {
              Categorias.data.map(categoria=>
                <MenuItem value={ Cat } key={ categoria.category_name } onChange={ (e)=>setCat(e.target.value) } >{ categoria.category_name }</MenuItem>
                )
            }
            </Select>
            </Grid>   

        <input type="file" ref={ inputRef } hidden />
                <Box textAlign='center'>
                <Button
                onClick={ ()=>inputRef.current.click() }
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <ImageIcon/>&nbsp;
                AGREGAR IMAGEN
              </Button>
              </Box>
        
                      <Button
                type="submit"
                fullWidth
                variant="contained"
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
