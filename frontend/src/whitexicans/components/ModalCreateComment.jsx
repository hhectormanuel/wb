import { Avatar, Button, CircularProgress, Grid, InputLabel, MenuItem, Modal, Select, TextField, Toolbar, Typography } from '@mui/material'
import { useContext, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { AuthContext } from '../../auth/context/AuthContext';
import ImageIcon from '@mui/icons-material/Image';
import { useForm } from '../hooks/useForm';
import axios from 'axios';
import { CreateContext } from '../context/CreateContex';
import { useEffect } from 'react';

const formData = {
  Contenido: '',
}  

export const ModalCreateComment = ({ id }) => {

  const { Contenido, onInputChange } = useForm(formData);

  const { onGetComments, Comment } = useContext(CreateContext);

  const onCreateNewComment = async(Contenido) => {
    const token = localStorage.getItem('token');
    try {
      const url = `http://localhost:8000/comment/${ id }`;
      const resp = await axios.post(url, { content: Contenido  },{
        headers:{
          'Authorization': `Bearer ${token}`
         } 
      });
      onGetComments(id);
    } catch (error) {
      console.log(error)
    }
  };

  // useEffect(() => {
  //   onGetComments(id);
  // }, [])
  

  const onAddComment = (e) => {
    e.preventDefault();
    onCreateNewComment(Contenido)
  }

  const { openModal, setOpenModal } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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

  const inputRef = useRef();
  return (
    <>
    <TextField
            onClick={handleOpen}
            readOnly
            variant="filled"
            fullWidth
            label="Agrega un comentario..."
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
          <Typography align='center' variant='h6' sx={{ mb: 2 }}>AGREGAR UN COMENTARIO</Typography>
          <hr/>
          <form onSubmit={onAddComment}>

        <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="Agrega aquí el comentario..."
            minRows={ 5 }
            name='Contenido'
            value={Contenido}
            onChange={onInputChange}
        />

            {/* <input type="file" multiple name='Imagen' ref={ inputRef } hidden />
                <Box textAlign='center'>
                <Button
                onClick={ ()=>inputRef.current.click() }
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <ImageIcon/>&nbsp;
                AGREGAR IMAGEN
              </Button>
              </Box> */}

              {/* <div className="text-center">
              {
                Photos.length === 0
                ? null
                :(
                  Photos.map(Photo=>
                    <img key={Photo} src={Photo} width='150'></img>
                    )
                )
              }
              </div> */}
        
                      <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                AGREGAR
              </Button>
              </form>
        </Box>
      </Modal>
      </>
  )
}
