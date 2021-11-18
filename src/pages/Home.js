import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import OrderTable from '../components/OrderTable.js';
import ProductTable from '../components/ProductTable.js';
import Chart from '../components/Chart.js';

export default function Home() {
  return (
    <React.Fragment>
      <Typography variant="h2" sx={{marginBottom:5, fontWeight:"bold"}}>
        Esta información te podría interesar
      </Typography>
      <Grid item sx={{marginBottom: 10}}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 300,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      <Box sx={{marginBottom: 10}}>
        <OrderTable mini/>
      </Box>
      <Box sx={{marginBottom: 10}}>
        <ProductTable mini/>
      </Box>
    </React.Fragment>
  );
}
