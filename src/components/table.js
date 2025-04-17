import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { data } from './../constant/data.js';
import { Link } from '@mui/material';

function createData(number, name, importance, link) {
  return { number, name, importance, link };
}

function getRows(data){
    if (data === undefined)
        return [];
    return data.tests? data.tests.map((elem)=>{
        return createData(0, elem.title, elem.importance, elem.link);
    }) : [];
}

export function BasicTable({id, data}) {
    const [num, setNum] = React.useState(null);

    React.useEffect( () => {
        setNum( id )
      }, [id]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Номер</TableCell>
            <TableCell>Название</TableCell>
            <TableCell align="right">Важность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getRows(data[num]).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.number}
              </TableCell>
              <TableCell align="right"><Link href={row.link}>{row.name}</Link></TableCell>
              <TableCell align="right">{row.importance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}