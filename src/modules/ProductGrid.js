import React, {useState, useEffect} from 'react';

import Grid from '@mui/material/Grid';

import Product from '../components/Product.js'

import axios from 'axios';

export default function SpacingGrid(params) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios.get(
      `http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/getProductsOfOrder`,
       { params: { id: params.orderID } }
    )
         .then(res => {
           setRows(res.data.Item.products);
         });
  }, []);

  return(
    <Grid container rowSpacing={4} columnSpacing={4}>
      {Object.entries(rows).map((value) => (
        <Grid key={value[0]} item>
          <Product id={value}/>
        </Grid>
      ))}
    </Grid>
  );
}
