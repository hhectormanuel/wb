import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { LoadingThink } from '../../UI/LoadingThink';
import { useScreenSize } from '../hooks/useScreenSize';
import Carousel from 'react-material-ui-carousel'

export const ModalPhotos = ({ imagenes: data }) => {

      const [open, setOpen] = React.useState(false);
      const [openn, setOpenn] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const { width } = useScreenSize();

      const [Imagenes, setImagenes] = useState({
        imagenes: [],
        isLoading: true
      });

      const imagenes = [];

      const addImagenToArray = () => {
        if (data.length >= 1){
            for (const image of data) {
                imagenes.push(image);
            }
            setImagenes({
                imagenes: imagenes,
                isLoading: false
            });
        }
      };

      const getSizeScreen = () => {
        if(width >= 606) {
          setOpenn(true);
        };
    
        if(width <= 599){
          setOpenn(false);
        }
      };
  
      React.useEffect(() => {
        getSizeScreen();
      }, [width]);

      useEffect(() => {
        addImagenToArray()
      }, []);   

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${openn ? '600px' : '400px'}`,
        height: `${openn ? '500px' : '500px' }`,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
      };

  return (
    <div>
        {
            Imagenes.isLoading
            ? <LoadingThink/>
            :(
                <img onClick={handleOpen} src={Imagenes.imagenes[0]} alt="" height="200" width='100%' />
            )
        }
        {
            Imagenes.isLoading
            ? <LoadingThink/>
            :(
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                <Carousel>
                    {
                        Imagenes.imagenes.map(imagen=>
                                <img key={imagen} src={imagen} width='600px'></img>
                            )
                    }
                </Carousel>
                </Box>
              </Modal>
            )
        }
  </div>
  )
}
