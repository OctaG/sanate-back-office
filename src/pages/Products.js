import React from 'react';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ProductsTable from '../modules/ProductsTable.js';

export default function Orders() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid container justifyContent="flex-end">
        <Grid item xs={12}>
          <Typography
            variant="h2"
            align="center"
            sx={{fontWeight:"bold", marginTop:10, marginBottom:5}}
          >
            Administrar productos
          </Typography>
          <ProductsTable/>
        </Grid>
      </Grid>
    </Box>
  );
}
