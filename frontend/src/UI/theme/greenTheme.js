import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const greenTheme = createTheme({
    palette: {
        primary: {
            main: '#388e3c'
        },
        secondary: {
            main: '#e3f2fd'
        },
        error: {
            main: red.A400
        }
    }
})