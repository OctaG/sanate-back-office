import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useHistory } from "react-router-dom";

import axios from 'axios';

export default function InventoryTable(props) {

  let history = useHistory();

  const editInventory = (e) => {
    const data = new FormData(e.currentTarget);
    const inventory = [];

    e.preventDefault();

    Object.keys(props.product.inventory).map((key) => {
      inventory.push([key, data.get('amount_'+ key)]);
    });

    axios({
      method: "post",
      url: "http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/updateProduct",
      params: {
        id: props.product.id,
        pname: props.product.pname,
        description: props.product.description,
        price: props.product.price,
        inventory: Object.fromEntries(inventory),
        image: props.product.image,
      },
      headers:{ "Content-Type": "application/json" }
    }).then(() => {
      history.push("/products");
    });
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md">
        <Paper variant="outlined" sx={{ my: 5, p: 10}}>
          <Typography variant="h4" sx={{marginBottom:5}}>
            Inventario
          </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={editInventory}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Sucursal</TableCell>
                    <TableCell>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(props.product.inventory).map((row) => (
                    <TableRow key={row[0]}>
                      <TableCell>{row[0]}</TableCell>
                      <TableCell>
                        <TextField
                          id={"amount_"+row[0]}
                          name={"amount_"+row[0]}
                          label=""
                          fullWidth
                          defaultValue={row[1]}
                          variant="standard"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Grid container spacing={3} sx={{marginBottom:5}}>
                <Grid item xs={6}>
                  <Box textAlign='right' sx={{marginTop:5, marginBottom:2}}>
                     <Button
                      onClick={() => history.push("/products")}
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                       Salir sin cambios
                     </Button>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign='right' sx={{marginTop:5, marginBottom:2}}>
                     <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      fullWidth
                    >
                       Guardar cambios
                     </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
    </React.Fragment>
  );
}
