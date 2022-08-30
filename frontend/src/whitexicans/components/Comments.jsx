import { Grid } from '@mui/material'
import axios from 'axios';
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingThink } from '../../UI/LoadingThink';
import { CreateContext } from '../context/CreateContex';
import { useScreenSize } from '../hooks/useScreenSize';
import { ModalCreateComment } from './ModalCreateComment';

export const Comments = ({ comment }) => {

  const { Comment, onGetComments } = useContext(CreateContext);

  const { id } = useParams();

    const [open, setOpen] = React.useState(false);

    const { width, height } = useScreenSize();

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

  return (
    <>
        <Grid container sx={{ mt: 3 }} spacing={0} direction="column" alignItems="center" justify="center">
    <Grid className='animate__animated animate__fadeIn' container direction='row' justify="center" alignItems='center' sx={{ mb: 1, maxWidth: `${ open ? '1000px' : '280px'}`, ml: `${ open ? '0px' : '40px' }` }}>

                                <section className='mx-auto'>
                                <div className="card bg-light" >
                                        <div className="card-body">
                                        <ModalCreateComment id={id}/><br /><br />
                                        {
                                    Comment.isLoading
                                    ? <LoadingThink/>
                                    :(
                                      Comment.comment.map(c=>
                                        <div key={c.comment_id} className="d-flex mb-4">
                                            <div className="flex-shrink-0"><img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div className="ms-3">
                                                <div className="fw-bold">{c.username}</div>
                                                <p width='20px'>{ c.content_comment }</p>
                                            </div>
                                        </div>
                                        )
                                        )
                                      }
                                    </div>

                                </div>
                            </section>
                            </Grid>
                            </Grid>

    </>
  )
}
