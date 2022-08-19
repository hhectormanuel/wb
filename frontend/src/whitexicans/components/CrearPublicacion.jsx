import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useScreenSize } from '../hooks/useScreenSize';

export const CrearPublicacion = () => {

    const { width, height } = useScreenSize();

    const [open, setOpen] = React.useState(false);

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
      }, [width])

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center">
    <Grid className='animate__animated animate__fadeIn' container direction='row' justify="center" alignItems='center' sx={{ mb: 1, maxWidth: `${ open ? '1000px' : '280px'}`, ml: `${ open ? '0px' : '40px' }` }}>
    {/* <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
        </Button>
    </Grid> */}

    <Grid container>
        <TextField 
            type="text"
            variant="filled"
            fullWidth
            placeholder="Ingrese un título"
            label="Título"
            sx={{ border: 'none', mb: 1 }}
            name='title'
        />

        <TextField 
            type="text"
            variant="filled"
            fullWidth
            multiline
            placeholder="¿Qué sucedió en el día de hoy?"
            minRows={ 5 }
            name='body'
        />
    </Grid>
</Grid></Grid>
  )
}
