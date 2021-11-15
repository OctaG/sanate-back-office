import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function OrderSummaryCard() {
  return(
    <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
      <Typography align="center" variant="h2">
        Orden no. 123456
      </Typography>
      <Typography align="left" variant="h5" gutterBottom>
        Cliente: Juan Perez
      </Typography>
      <Typography align="left" variant="h5" gutterBottom>
        Enviar a: Av Carlos Lazo 100, Santa Fe, La Loma, Álvaro Obregón,
        01389 Ciudad de México, CDMX
      </Typography>
      <Typography align="left" variant="h5" gutterBottom>
        Total: $1,200.00
      </Typography>
      <Button color="secondary" variant="contained" fullWidth>
        Orden lista
      </Button>
    </Paper>
  );
}
