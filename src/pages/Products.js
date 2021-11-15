import React from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import ProductsTable from '../modules/ProductsTable.js';

export default function Orders() {
  return (
    <React.Fragment>
      <Typography
        variant="h2"
        align="center"
        sx={{fontWeight:"bold", marginTop:10, marginBottom:5}}
      >
        Administrar productos
      </Typography>
      <ProductsTable/>
    </React.Fragment>
  );
}
