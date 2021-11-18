import React, {useState, useEffect} from 'react';

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

import axios from 'axios';

export default function OrderTable(props) {

  let history = useHistory();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const rows = [];
    axios.get(
      `http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/getAllOrders`
    )
         .then(res => {
           for(let elem in res.data.Items){
             rows.push(res.data.Items[elem]);
           }
           props.mini? setRows(rows.slice(0, 5)) : setRows(rows);
         });
  }, []);

  function goToOrderDetails(row){
    history.push("/order-details", {data: row});
  }

  function cancelOrder(row){
    axios({
      method: "post",
      url: "http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/changeOrderStatus",
      params: {
        id: row.sanate_ordenes,
        status: "Cancelled"
      },
      headers:{ "Content-Type": "application/json" }
    }).then(() => {
      window.location.reload(false);
    });
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
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Total de compra</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.sanate_ordenes}>
                <TableCell>{row.sanate_ordenes}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.orderState}</TableCell>
                <TableCell align="right">
                  <DropdownButton id="dropdown-basic-button" title="">
                    <Dropdown.Item onClick={() => goToOrderDetails(row)}>
                      Preparar orden
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => cancelOrder(row)}>
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
