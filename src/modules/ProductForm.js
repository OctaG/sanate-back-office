import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';

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

import AddCircleIcon from '@mui/icons-material/AddCircle';

import ActionFinishedModal from '../components/ActionFinishedModal.js'

import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ProductForm(params) {

  const [images, setImages] = useState([]);
  const [open, setOpen] = React.useState(false);

  const sucursales = [["Polanco"], ["Interlomas"]]

  const handleSubmit = (e) => {
    const data = new FormData(e.currentTarget);
    const inventory = [];

    e.preventDefault();

    Object.keys(params.product.inventory).map((key) => {
      inventory.push([key, data.get('amount_'+ key)]);
    });

    axios({
      method: "post",
      url: "http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/updateProduct",
      params: {
        id: params.product.id,
        name: data.get('name'),
        description: data.get('description'),
        price: data.get('price'),
        inventory: Object.fromEntries(inventory),
      },
      headers:{ "Content-Type": "application/json" }
    }).then(() => {
      setOpen(true);
    });
  };

  return (
    <React.Fragment>
      {open?
        <ActionFinishedModal/>
        :
        null
      }
      <Container component="main" maxWidth="md">
        <Paper variant="outlined" sx={{ my: 5, p: 10}}>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h4" sx={{marginBottom:5}}>
              Información del producto
            </Typography>
            <Grid container spacing={3} sx={{marginBottom:5}}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Nombre del producto"
                  fullWidth
                  defaultValue={params.product? params.product.pname : ""}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Descripción"
                  fullWidth
                  defaultValue={params.product? params.product.description : ""}
                  variant="standard"
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="price"
                  name="price"
                  label="Precio"
                  fullWidth
                  defaultValue={params.product? params.product.price : ""}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Typography variant="h4" sx={{marginBottom:5}}>
              Imágenes
            </Typography>
            <Grid container spacing={3}>
              <ImageList sx={{ width: 700, height: 150, marginLeft:3 }} cols={4} rowHeight={164}>
                 {images.map((item) => (
                   <ImageListItem key={item.img}>
                     <img
                       src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                       srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                       alt={item.title}
                     />
                   </ImageListItem>
                 ))}
               </ImageList>
            </Grid>
            <Box textAlign='right' sx={{marginBottom:2}}>
              <label htmlFor="contained-button-file">
                 <Input accept="image/*" id="contained-button-file" multiple type="file" />
                 <Button color="secondary" component="span" endIcon={<AddCircleIcon/>}>
                   Nueva imágen
                 </Button>
               </label>
            </Box>
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
                {(params.product? Object.entries(params.product.inventory) : sucursales).map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>
                      <TextField
                        required
                        id={"amount_"+row[0]}
                        name={"amount_"+row[0]}
                        label=""
                        fullWidth
                        defaultValue={ params.product? row[1] : 0}
                        variant="standard"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box textAlign='right' sx={{marginTop:10, marginBottom:2}}>
             <Button type="submit" color="secondary" variant="contained" fullWidth>
               Añadir
             </Button>
            </Box>
          </Box>
         </Paper>
        </Container>
    </React.Fragment>
  );
}
