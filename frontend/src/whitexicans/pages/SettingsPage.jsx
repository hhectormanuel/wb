import React, { useContext, useMemo, useRef } from 'react'
import { AuthContext } from '../../auth/context/AuthContext';
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import ImageIcon from '@mui/icons-material/Image';
import { AppBar, Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { CreateContext } from '../context/CreateContex';
import axios from 'axios';

export const SettingsPage = () => {

  const { user, Data } = useContext(AuthContext);
  const { isSaving, Publicacion, isSavingFalse } = useContext(CreateContext)
  const isSavingPost = useMemo( () => Publicacion.isSaving === true );
  const inputRef = useRef();
  const [Foto, setFoto] = useState();

  const fileUpload2 = async( file ) => {
    isSaving();
    if(!file) throw new Error('No hay nada para subir');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/djxmfnsct/image/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'whitexicans');
    formData.append('file', file);
    try {
      const resp = await fetch(cloudUrl,{
        method: 'POST',
        body: formData
      });
      if(!resp.ok) throw new Error('No se pudo subir la imagen');
      const cloudResp = await resp.json();
      setFoto(cloudResp.secure_url);
        isSavingFalse();
    } catch (error) {
      console.log(error)
      throw new Error(error.message);
    }
  };

  const startUploadingFiles = async( files ) => {
    fileUpload2(files[0]);
  };

  const onGetImagen = (e) => {
    isSaving();
    startUploadingFiles(e.target.files)
  }

  const onChangeProfilePhoto = async() => {
    const url = `http://localhost:8000/profilepic/`;
    const token = localStorage.getItem('token');
    if(!token) return;

    try {
      const resp = await axios.put(url,{img: Foto},{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <WhitexicansLayout>
        <div className="py-5 bg-image-full" style={{ backgroundImage: `url("https://static.depositphotos.com/storage/portfolio-cover/387/3922387.jpg?1593139829")`, width: '100%'}}>
          <div className="text-center">
              <img className="img-fluid rounded-circle mb-4" src={`${user.img ? user.img : 'https://dummyimage.com/150x150/6c757d/dee2e6.jpg'}`} width='150px' height='150px' alt="..." />&nbsp;
              <h1 className="text-dark fs-3 fw-bolder">@{ user.username }</h1>
          </div>
        </div>

        <Box sx={{ flexGrow: 1, mb: 5 }}>
                         <AppBar sx={{ backgroundColor:'#E9E9E9' }} position="static">
                          <Toolbar>
                           <Typography variant="h6" align="center" component="div" sx={{ flexGrow: 1, color:'black' }}>
                                AJUSTES DE USUARIO
                             </Typography>
                          </Toolbar>
                        </AppBar>
                      </Box>

                      <Typography align="center" component="h1" variant={ open ? 'h5' : 'h6' } sx={{ ml: `${ open ? '0px' : '40px'}`, mt: 5 }}>
              FOTO DE PERFÍL
            </Typography>
            {
              Foto === undefined
              ? null
              :(<div className='text-center'>
                <img src={Foto} width='150px'></img>
              </div>)
            }


            <input type='file' onChange={onGetImagen} name='Imagen' ref={inputRef} hidden></input>

            <Box textAlign='center'>
              {
                Foto === undefined
                ? <Button disabled={isSavingPost} onClick={ ()=>inputRef.current.click() } variant="contained" sx={{ mt: 3, mb: 2 }}><ImageIcon/>&nbsp;CAMBIAR</Button>
                : <Button disabled={isSavingPost} onClick={ onChangeProfilePhoto } variant="contained" sx={{ mt: 3, mb: 2 }}><ImageIcon/>&nbsp;GUARDAR</Button>
              }
              
            </Box>
        </WhitexicansLayout>
    </>
  )
}
