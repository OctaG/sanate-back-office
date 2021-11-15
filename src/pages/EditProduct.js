import React from 'react';

import Typography from '@mui/material/Typography';

import ProductForm from '../modules/ProductForm.js';

export default function Orders() {
  return (
    <React.Fragment>
      <Typography
        variant="h2"
        align="center"
        sx={{fontWeight:"bold", marginTop:10, marginBottom:5}}
      >
        Editar producto
      </Typography>
      <ProductForm/>
    </React.Fragment>
  );
}
