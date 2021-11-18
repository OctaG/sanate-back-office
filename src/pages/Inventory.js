import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import InventoryTable from '../components/InventoryTable.js'

import { useLocation } from "react-router-dom";

export default function OrderDetails() {

  const location = useLocation();
  const product = location.state.data;

  const [rows, setRows] = useState([]);

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
