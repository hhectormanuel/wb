import { Grid } from '@mui/material'
import React from 'react'
import { useScreenSize } from '../hooks/useScreenSize';

export const Comments = () => {

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

    <Grid container>
                                <section>
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <form class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
                                        <div class="d-flex mb-4">
                                            <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div class="ms-3">
                                                <div class="fw-bold">Commenter Name</div>
                                                If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            </Grid>
                            </Grid>
                            </Grid>
    </>
  )
}
