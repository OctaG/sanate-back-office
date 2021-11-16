import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import OrderSummaryCard from '../components/OrderSummaryCard.js'

import ProductGrid from '../modules/ProductGrid.js'

import { useLocation } from "react-router-dom";

import axios from 'axios';

export default function OrderDetails() {
  const location = useLocation();

  const [rows, setRows] = useState([]);

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
