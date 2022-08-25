import { Grid, Typography } from '@mui/material'
import React from 'react'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { useScreenSize } from '../hooks/useScreenSize';

export const MostPopularPublications = () => {
  
  const { width, height } = useScreenSize();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
    <WhitexicansLayout>
    <Typography align="center" component="h1" variant="h5" sx={{ mt: 2 }}>
              PUBLICACIONES MÁS POPULARES
            </Typography>
    </WhitexicansLayout>
  )
}
