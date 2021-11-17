import React, {useState, useEffect} from 'react';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useHistory } from "react-router-dom";

import axios from 'axios';



function preventDefault(event) {
  event.preventDefault();
}

export default function Products() {

  const history = useHistory();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const rows = [];
    axios.get(
      `http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/getAllProducts`
    )
         .then(res => {
           for(let index in res.data.Items){
             let product = res.data.Items[index]
             rows.push(product);
           }
           setRows(rows);
         });
  }, []);

  function addProduct(){
    history.push("/add-product");
  }

  function goToEdit(row){
    console.log(row);
    history.push("/edit-product", {data:row});
  }

  function deleteProduct(row){
    console.log(row);
  }

  return (
    <React.Fragment>
      <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h2">
          Productos
        </Typography>
        <Box textAlign='right' sx={{marginBottom:2}}>
          <Button
            color="secondary"
            aria-label="add"
            endIcon={<AddCircleIcon/>}
            onClick={addProduct}
          >
            Añadir producto
          </Button>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.pname}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{`$${row.price}`}</TableCell>
                <TableCell align="right">
                  <DropdownButton id="dropdown-basic-button" title="">
                    <Dropdown.Item onClick={() => goToEdit(row)}>
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteProduct(row)}>
                      Eliminar
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
