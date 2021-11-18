import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ActionFinishedModal from '../components/ActionFinishedModal.js'

import axios from 'axios';


export default function ProductForm(params) {

  const [image, setImage] = useState(params.edit? params.product.image : "");
  const [open, setOpen] = React.useState(false);

  const sucursales = [["Polanco"], ["Interlomas"], ["Condesa"], ["Tecamachalco"]];

  const editProduct = (e) => {
    const data = new FormData(e.currentTarget);
    const inventory = [];

    e.preventDefault();

    Object.keys(params.product.inventory).map((key) => {
      return inventory.push([key, data.get('amount_'+ key)]);
    });

    axios({
      method: "post",
      url: "http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/updateProduct",
      params: {
        id: params.product.id,
        pname: data.get('name'),
        description: data.get('description'),
        price: data.get('price'),
        inventory: Object.fromEntries(inventory),
        image: image,
      },
      headers:{ "Content-Type": "application/json" }
    }).then(() => {
      setOpen(true);
    });
  };

  const createProduct = (e) => {
    const data = new FormData(e.currentTarget);
    const inventory = [];

    e.preventDefault();

    sucursales.map((key) => {
      return inventory.push([key, data.get('amount_'+ key)]);
    });

    axios({
      method: "post",
      url: "http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/putProduct",
      params: {
        id: (Math.random() + 1).toString(36).substring(7), //https://stackoverflow.com/questions/1349404/
        pname: data.get('name'),
        description: data.get('description'),
        price: data.get('price'),
        inventory: Object.fromEntries(inventory),
        image: image,
      },
      headers:{ "Content-Type": "application/json" }
    }).then(() => {
      setOpen(true);
    });
  };

const changeImage = (value) => {
  setImage(value);
};

  return (
    <React.Fragment>
      {open?
        <ActionFinishedModal
          title={"¡Genial! La acción se ha completado con éxito"}
          paragraph={"El producto se ha agregado a la tienda. Los clientes ya pueden acceder a él."}
          buttonText={"Entiendo"}
          nextLayout={"./products"}
        />
        :
        null
      }
      <Container component="main" maxWidth="md">
        <Paper variant="outlined" sx={{ my: 5, p: 10}}>
          <Box
            component="form"
            noValidate
            onSubmit={params.edit? editProduct : createProduct}
              sx={{ mt: 3 }}
          >
            <Typography variant="h4" sx={{marginBottom:5}}>
              Información del producto
            </Typography>
            <Grid container spacing={3} sx={{marginBottom:5}}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Nombre del producto"
                  fullWidth
                  defaultValue={params.edit? params.product.pname : ""}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Descripción"
                  fullWidth
                  defaultValue={params.edit? params.product.description : ""}
                  variant="standard"
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="price"
                  name="price"
                  label="Precio"
                  fullWidth
                  defaultValue={params.edit? params.product.price : ""}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Typography variant="h4" sx={{marginBottom:5}}>
              Imágen
            </Typography>
            <Grid container spacing={3}>
            <img
              style={{marginLeft: 30, height: 125, width: 125}}
              src={image}
              alt="product_img"
            />
            </Grid>
            <TextField
              id="image"
              name="image"
              label="URL de la imágen"
              fullWidth
              defaultValue={params.edit? image : ""}
              variant="standard"
              sx={{marginTop: 3, marginBottom: 5}}
              onChange = {(e) => changeImage(e.target.value)}
            />
            <Typography variant="h4" sx={{marginBottom:5}}>
              Inventario
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sucursal</TableCell>
                  <TableCell>Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(params.edit? Object.entries(params.product.inventory) : sucursales).map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>
                      <TextField
                        id={"amount_"+row[0]}
                        name={"amount_"+row[0]}
                        label=""
                        fullWidth
                        defaultValue={ params.edit? row[1] : 0}
                        variant="standard"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box textAlign='right' sx={{marginTop:10, marginBottom:2}}>
               <Button type="submit" color="secondary" variant="contained" fullWidth>
                 {params.edit? "Editar" : "Crear"}
               </Button>
            </Box>
          </Box>
         </Paper>
        </Container>
    </React.Fragment>
  );
}
