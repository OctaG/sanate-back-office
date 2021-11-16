import React from 'react';

import Typography from '@mui/material/Typography';

import IntraDeliveryForm from '../modules/IntraDeliveryForm.js';

export default function CoordinateDelivery() {
  return (
    <React.Fragment>
      <Typography
        variant="h2"
        align="center"
        sx={{fontWeight:"bold", marginTop:10, marginBottom:5}}
      >
        Coordinar entrega
      </Typography>
      <IntraDeliveryForm/>
    </React.Fragment>
  );
}
