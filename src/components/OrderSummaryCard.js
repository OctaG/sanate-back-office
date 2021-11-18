import React from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ActionFinishedModal from '../components/ActionFinishedModal.js'

import { useLocation } from "react-router-dom";

import axios from 'axios';

export default function OrderSummaryCard(props) {

  const order = props.orderData;
  const [open, setOpen] = React.useState(false);


  function changeOrderStatus(){
    axios({
      method: "post",
      url: "http://ec2-34-239-232-157.compute-1.amazonaws.com:3000/changeOrderStatus",
      params: {
        id: order.sanate_ordenes,
        status: "Shipping",
      },
      headers:{ "Content-Type": "application/json" }
    }).then(() => {
      setOpen(true);
    });
  }

  return(
    <div>
      {open?
        <ActionFinishedModal
          title={"¡Genial! La acción se ha completado con éxito"}
          paragraph={"El estado de la orden ahora es: En tránsito"}
          buttonText={"Entiendo"}
          nextLayout={"./orders"}
        />
        :
        null
      }
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
          Total: ${order.total}
        </Typography>
        <Button onClick={changeOrderStatus} color="secondary" variant="contained" fullWidth>
          Orden lista
        </Button>
      </Paper>
    </div>
  );
}
