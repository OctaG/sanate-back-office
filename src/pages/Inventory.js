import React from 'react';

import Typography from '@mui/material/Typography';

import InventoryTable from '../components/InventoryTable.js'

import { useLocation } from "react-router-dom";

export default function OrderDetails() {

  const location = useLocation();
  const product = location.state.data;

  return(
    <React.Fragment>
      <Typography
        variant="h2"
        align="center"
        sx={{fontWeight:"bold", marginTop:10, marginBottom:5}}
      >
        Inventario de {product.pname}
      </Typography>
      <InventoryTable product={product}/>
    </React.Fragment>
  );
}
