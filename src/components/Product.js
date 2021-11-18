import React, {useState, useEffect} from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from 'axios';

export default function MediaCard(params) {
  const [rows, setRows] = useState([]);
  console.log("Product ID: " + params.id[0]);
  console.log("Cantidad: " + params.id[1]);
  useEffect(() => {
    const rows = [];
    axios.get(
      `http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/getProductInfo`,
       { params: { id: params.id[0] } }
    )
         .then(res => {
          console.log(res.data.Item);
          setRows(res.data.Item)
         });
  }, []);
  return (
    <Card sx={{ minWidth: 250, maxWidth: 350 }}>
      <CardMedia
        component="img"
        height="300"
        image={rows.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {rows.pname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {rows.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sección: {rows.section}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cantidad: {params.id[1]}
        </Typography>
      </CardContent>
    </Card>
  );
}
