import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

import { useHistory } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function BasicModal() {
  const history = useHistory();
  return (
    <div>
      <Modal
        open={true}
        onClose={console.log("Modal")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Paper sx={{p: 4, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{fontWeight:"bold"}}>
              ¡Genial! La acción fue exitosa.
            </Typography>
            <Typography paragraph>
              El producto se ha actualizado con exito. Los clientes
              ya observan los nuevos cambios.
            </Typography>
            <Box textAlign='right' sx={{marginTop:2, marginBottom:2}}>
             <Button onClick={() => history.push("/products")} color="secondary" variant="contained" fullWidth>
               Entiendo
             </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </div>
  );
}
