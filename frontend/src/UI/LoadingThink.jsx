import { CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { WhitexicansLayout } from './layout/WhitexicansLayout'

export const LoadingThink = () => {
  return (
<Grid container direction='row' justifyContent='center' sx={{ mt: 10 }}>
                <CircularProgress
                 color='warning'/>
            </Grid>
  )
}
