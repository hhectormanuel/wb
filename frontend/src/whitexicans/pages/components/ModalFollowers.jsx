import { Button, Modal } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext';

export const ModalFollowers = () => {

    const { user } = useContext(AuthContext);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        pt: 2,
        px: 4,
        pb: 3,
      };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
        <Button sx={{ color:'black' }} onClick={handleOpen}>Seguidores</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style, width: 400 }}>
            <h5 className='text-center' id="parent-modal-title">Seguidores</h5><hr />
            {
                user.followers.length === 0
                ? null
                : (
                    user.followers.map(follower=>
                            <h5 key={follower}>{follower}</h5>
                        )
                )
            }
        </Box>
        </Modal>
    </div>
  )
}
