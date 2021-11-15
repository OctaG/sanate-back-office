import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Aspirina
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: 106537893
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sección: Fármcos sin receta
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cantidad: 2
        </Typography>
      </CardContent>
    </Card>
  );
}
