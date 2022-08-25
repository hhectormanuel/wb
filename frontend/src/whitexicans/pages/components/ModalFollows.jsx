import { Button, Modal } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../../auth/context/AuthContext'

export const ModalFollows = () => {

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
        <Button sx={{ color:'black' }} onClick={handleOpen}>Seguidos</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
        <Box sx={{ ...style, width: 400 }}>
            <h5 className='text-center' id="parent-modal-title">Seguidos</h5><hr />
            {
                user.follows.length === 0
                ? null
                : (
                    user.follows.map(follow=>
                            <h5 key={follow}>{follow}</h5>
                        )
                )
            }
        </Box>
        </Modal>
    </div>
  )
}
