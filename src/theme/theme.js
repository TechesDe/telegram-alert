import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

export const theme = createTheme({
  typography:{
    fontFamily: ["JetBrains Mono", 'monospace']
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    status:{
      success: '#91c483',
      broken: '#ffe162',
      failed: '#ff6464',
      fail: '#ff6464',
      skipped: '#d9d9d9',
      skip: '#d9d9d9'
    }
  },
  ruRU
});