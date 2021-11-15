import React from 'react';

import Grid from '@mui/material/Grid';

import Product from '../components/Product.js'

export default function SpacingGrid() {
  return(
    <Grid item xs={6}>
      <Grid container rowSpacing={4} columnSpacing={4}>
        {[0, 1, 2, 3].map((value) => (
          <Grid key={value} item>
            <Product/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
