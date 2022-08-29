import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { LoadingThink } from '../../UI/LoadingThink';
import { useNavigate } from 'react-router-dom';

export const LikesModal = ({ post }) => {

  const navigate = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      };

      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const onClickUser = (slug) => {
        navigate(`/view/${ slug }`)
      }
      

  return (
    <div>
    <Button onClick={handleOpen}>{post.post_likes} Me gusta</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
            <h5 className='text-center'>Total de me gustas</h5>
            <hr />
            {
                post.people_like === undefined
                ? <LoadingThink/>
                :(
                  post.people_like.map(like=>
                    <div key={like.user_id} className="d-flex align-items-center justify-content-center">
                    <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                    <button onClick={()=>onClickUser(like.user_slug)} className="fw-bold btn btn-light">
                        { like.username }
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
