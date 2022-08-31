import { Avatar, Button, Modal } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../auth/context/AuthContext'
import { LoadingThink } from '../../../UI/LoadingThink'

export const ModalFollows = () => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

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

    const onClickUser = (slug) => {
      navigate(`/view/${ slug }`)
    }

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
                user.follows === undefined
                ? <LoadingThink/>
                : (
                    user.follows.map(follow=>
                      <div key={follow.id} className="d-flex align-items-center justify-content-center">
                        <Avatar sx={{ bgcolor: 'green' }} aria-label="recipe">
                    <img src={`${follow.user_img ? follow.user_img : 'https://dummyimage.com/40x40/ced4da/6c757d'}`} width='40px' height='40px' alt="..." />
                    </Avatar>
                      <button onClick={()=>onClickUser(follow.username_slug)} className="fw-bold btn btn-light">
                          { follow.username }
                      </button>
                  </div>
                        )
                )
            }
        </Box>
        </Modal>
    </div>
  )
}
