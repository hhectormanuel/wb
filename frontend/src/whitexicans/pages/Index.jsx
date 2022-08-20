import { AddOutlined, LineAxisOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { CrearPublicacion } from '../components/CrearPublicacion'
import { Publicaciones } from '../components/Publicaciones'


export const Index = () => { 

  return (
    <>
    <WhitexicansLayout>
      <CrearPublicacion/>
        <Publicaciones/>

        <IconButton
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
