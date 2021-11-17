import React from 'react';

import Typography from '@mui/material/Typography';

import ProductForm from '../modules/ProductForm.js';

import { useLocation } from "react-router-dom";

export default function Orders() {

  const location = useLocation();
  const product = location.state.data;

  return (
    <React.Fragment>
      <Typography
        variant="h2"
        align="center"
        sx={{fontWeight:"bold", marginTop:10, marginBottom:5}}
      >
        Editar producto
      </Typography>
      <ProductForm edit product={product}/>
    </React.Fragment>
  );
}
