import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar } from '../NavBar';
import { SideBar } from '../SideBar';

export const WhitexicansLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn'>

    <NavBar/>

    <SideBar/>

    <Box  component='main' sx={{ flexGrow: 1 }}>
        <Toolbar />

        { children }
        
    </Box>
</Box>
  )
}
