import React, {useState, useEffect} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useHistory } from "react-router-dom";

import axios from 'axios';

export default function ProductTable(props) {

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
            props.mini? setRows(rows.slice(0, 5)) : setRows(rows);
         });
  }, []);

  function addProduct(){
    history.push("/add-product");
  }

  function goToEdit(row){
    history.push("/edit-product", {data:row});
  }

  function goToInventory(row){
    history.push("/inventory", {data:row});
  }

  function deleteProduct(row){
    axios({
      method: "post",
      url: "http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/deleteProduct",
      params: {
        id: row.id,
      },
      headers:{ "Content-Type": "application/json" }
    }).then(() => {
      window.location.reload(false);
    });
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
              <TableCell>Imágen</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.pname}</TableCell>
                <TableCell>
                  <img
                    style={{marginLeft: 30, height: 50, width: 50}}
                    src={row.image}
                    alt="product_img"
                  />
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{`$${row.price}`}</TableCell>
                <TableCell align="right">
                  <DropdownButton id="dropdown-basic-button" title="">
                    <Dropdown.Item onClick={() => goToInventory(row)}>
                      Ver inventario
                    </Dropdown.Item>
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
