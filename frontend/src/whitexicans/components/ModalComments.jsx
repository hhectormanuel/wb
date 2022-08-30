import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useScreenSize } from '../hooks/useScreenSize';
import { CreateContext } from '../context/CreateContex';

export const ModalComments = () => {

    const [openn, setOpenn] = React.useState(false);
    const { width } = useScreenSize();

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${openn ? '600px' : '400px'}`,
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Ver comentarios</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5 className='text-center'>COMENTARIOS</h5>
          <hr />
        </Box>
      </Modal>
    </div>
  )
}
