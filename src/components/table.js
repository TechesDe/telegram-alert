import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { Link } from '@mui/material';
import * as locales from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme as themeDefault } from '../theme/theme';

function createData(number, name, importance, link, message) {
  return { number, name, importance, link, message };
}

function getRows(data){
    if (data === undefined)
        return [];
    return data.tests? data.tests.map((elem)=>{
        return createData(elem.allure_id, elem.name, elem.importance, elem.link, elem.message);
    }) : [];
}

export function BasicTable({id, data}) {

    const locale = "ruRU";
    const theme = themeDefault;
    const themeWithLocale = React.useMemo(
      () => createTheme(theme, locales[locale]),
      [locale, theme],
    );

    const [num, setNum] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    React.useEffect( () => {
        setNum( id );
      }, [id]);

  return (
    
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <ThemeProvider theme={themeDefault}>
          <TableContainer component={Paper} theme = {themeDefault}>
            <Table size='small' sx={{ maxWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Номер</TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell align="right">Важность</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getRows(data[num]).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell align="right">
                      <Link 
                        href={row.link}
                        sx={{ textAlign: 'left', display: '-webkit-box',  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow:'clip', textOverflow: 'ellipsis' }}
                      >{row.name}</Link>
                      </TableCell>
                    <TableCell align="right">{row.importance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ThemeProvider theme={themeWithLocale}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={getRows(data[num]).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </ThemeProvider>
          </TableContainer>
        </ThemeProvider>
      </Paper>
  );
}