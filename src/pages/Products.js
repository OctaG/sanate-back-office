import React from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import ProductsTable from '../modules/ProductsTable.js';

export default function Orders() {
  return (
    <React.Fragment>
      <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h2" sx={{marginBottom:2}}>
          Productos
        </Typography>
        <ProductsTable/>
      </Paper>
    </React.Fragment>
  );
}
