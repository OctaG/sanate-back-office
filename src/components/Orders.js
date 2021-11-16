import React from 'react';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useHistory } from "react-router-dom";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'En tránsito',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'Entregado',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'Entregado', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'Cancelado',
    654.39,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  let history = useHistory();

  function goToOrderDetails(row){
    console.log(row);
    history.push("/order-details")
  }
  return (
    <React.Fragment>
    <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h2" sx={{marginBottom:2}}>
      Ordenes
    </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Total de venta</TableCell>
            <TableCell align="right">Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{`$${row.amount}`}</TableCell>
              <TableCell align="right">
                <DropdownButton id="dropdown-basic-button" title="">
                  <Dropdown.Item onClick={() => goToOrderDetails(row)}>
                    Preparar ordenes
                  </Dropdown.Item>
                  <Dropdown.Item>
                    Cancelar orden
                  </Dropdown.Item>
                </DropdownButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    </React.Fragment>
  );
}
