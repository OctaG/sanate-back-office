import React from 'react';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Generate Order Data
function createData(id, name, type, amount, price) {
  return { id, name, type, amount, price };
}

const rows = [
  createData(
    '123456',
    'Aspirina',
    'Medicamento',
    50,
    312.44,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Cantidad disponible</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell align="right">Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{`$${row.price}`}</TableCell>
              <TableCell align="right">
                <Link color="primary" href="#" onClick={preventDefault}>
                Ver detalles
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
