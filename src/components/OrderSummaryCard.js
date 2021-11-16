import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLocation } from "react-router-dom";

export default function OrderSummaryCard(props) {

  const order = props.orderData;

  return(
    <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
      <Typography align="center" variant="h2">
        Orden no. {order.sanate_ordenes}
      </Typography>
      <Typography align="left" variant="h5" gutterBottom>
        Cliente: {order.customer}
      </Typography>
      <Typography align="left" variant="h5" gutterBottom>
        Enviar a: {order.address}
      </Typography>
      <Typography align="left" variant="h5" gutterBottom>
        Total: ${order.price}
      </Typography>
      <Button color="secondary" variant="contained" fullWidth>
        Orden lista
      </Button>
    </Paper>
  );
}
