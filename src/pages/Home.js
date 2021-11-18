import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Orders from '../components/Orders.js';
import Chart from '../components/Chart.js';

import ProductsTable from '../modules/ProductsTable.js';

import { useLocation } from "react-router-dom";

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
        <Orders mini/>
      </Box>
      <Box sx={{marginBottom: 10}}>
        <ProductsTable mini/>
      </Box>
    </React.Fragment>
  );
}
