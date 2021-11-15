import React, { useState } from 'react';

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

import AddCircleIcon from '@mui/icons-material/AddCircle';

const Input = styled('input')({
  display: 'none',
});

export default function EditProductForm() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([])
  const [rows, setRows] = useState([])

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md">
        <Paper variant="outlined" sx={{ my: 5, p: 10}}>
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
                defaultValue={name}
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
                defaultValue={description}
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
                defaultValue={price}
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
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.store}</TableCell>
                  <TableCell>
                    <TextField
                      required
                      id="amount"
                      name="amount"
                      label=""
                      fullWidth
                      defaultValue={row.amount}
                      variant="standard"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box textAlign='right' sx={{marginTop:10, marginBottom:2}}>
           <Button color="secondary" variant="contained" fullWidth>
             Actualizar
           </Button>
          </Box>
         </Paper>
        </Container>
    </React.Fragment>
  );
}
