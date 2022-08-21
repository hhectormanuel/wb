import { AddOutlined, LineAxisOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { CrearPublicacion } from '../components/CrearPublicacion'
import { Publicaciones } from '../components/Publicaciones'


export const Index = () => { 

  const { openModal, setOpenModal } = useContext(AuthContext);

  const onOpenModal = () => {
    setOpenModal(true);
  }

  return (
    <>
    <WhitexicansLayout>
      <CrearPublicacion/>
        <Publicaciones/>

        <IconButton
        onClick={onOpenModal}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'primary.main',
          ':hover': { backgroundColor: 'green', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </WhitexicansLayout>
    </>
    )
}
