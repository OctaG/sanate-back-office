import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import OrderSummaryCard from '../components/OrderSummaryCard.js'

import ProductGrid from '../modules/ProductGrid.js'

export default function OrderDetails() {
  return(
    <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={2}>
       <Grid item xs={7}>
         <ProductGrid/>
       </Grid>
       <Grid item xs={5}>
        <OrderSummaryCard/>
       </Grid>
     </Grid>
   </Box>
  );
}
