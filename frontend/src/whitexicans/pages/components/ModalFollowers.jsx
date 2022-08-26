import { Button, Modal } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../auth/context/AuthContext';
import { LoadingThink } from '../../../UI/LoadingThink';

export const ModalFollowers = () => {

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
                user.followers === undefined
                ? <LoadingThink/>
                : (
                  user.followers.map(follower=>
                    <div key={follower.id} className="d-flex align-items-center justify-content-center">
                    <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                    <button onClick={()=>onClickUser(follower.username_slug)} className="fw-bold btn btn-light">
                        { follower.username }
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
