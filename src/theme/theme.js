import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

export const theme = createTheme({
  typography:{
    fontFamily: ["JetBrains Mono", 'monospace']
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#b4bbea',
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
  components:{
    MuiToggleButton:{
      styleOverrides:{
        root:{
          color: 'rgba(255, 255, 255, 54%)',
          border: '1px solid rgba(123, 123, 123, 0.12)'
        }
      }
    },
    MuiButtonGroup:{
      styleOverrides:{
        root:{
          padding: '10px',
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          backgroundColor: '#FFF'
        }
      }
    },
    MuiTableContainer:{
      styleOverrides:{
        root:{
          backgroundColor: '#242a34',
        }
      }
    },
    MuiTableCell:{
      styleOverrides:{
        root:{
          color: "#fff"
        }
      }
    },
    MuiTablePagination:{
      styleOverrides:{
        root:{
          color: "#fff"
        }
      }
    },
  },
  ruRU
});