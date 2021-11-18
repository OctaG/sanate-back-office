import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import OrderSummaryCard from '../components/OrderSummaryCard.js'

import ProductGrid from '../modules/ProductGrid.js'

import { useLocation } from "react-router-dom";


export default function OrderDetails() {
  const location = useLocation();

  return(
    <Box sx={{ flexGrow: 1 }}>
     <Grid container spacing={2}>
       <Grid item xs={7}>
         <ProductGrid orderID={location.state.data.sanate_ordenes}/>
       </Grid>
       <Grid item xs={5}>
        <OrderSummaryCard orderData={location.state.data}/>
       </Grid>
     </Grid>
   </Box>
  );
}
