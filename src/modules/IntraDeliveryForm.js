import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Autocomplete from '@mui/material/Autocomplete';

// Generate Order Data
function createData(id, name) {
  return {id, name};
}

const rows = [
  createData(
    "1",
    'Aspirina',
  ),
  createData(
    "2",
    'Aspirina',
  ),
  createData(
    "3",
    'Aspirina',
  ),
  createData(
    "4",
    'Aspirina',
  ),
  createData(
    "5",
    'Aspirina',
  ),
];

export default function EditProductForm() {

  const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
]

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md">
        <Paper variant="outlined" sx={{ my: 5, p: 10}}>
          <Typography variant="h4" sx={{marginBottom:3}}>
            Farmacia que envía
          </Typography>
          <Autocomplete
           disablePortal
           id="sender"
           options={top100Films}
           sx={{ width: 300, marginBottom: 5 }}
           renderInput={(params) => <TextField {...params} label="Farmacia" />}
         />
         <Typography variant="h4" sx={{marginBottom:3}}>
           Farmacia que recibe
         </Typography>
         <Autocomplete
          disablePortal
          id="sender"
          options={top100Films}
          sx={{ width: 300, marginBottom: 5 }}
          renderInput={(params) => <TextField {...params} label="Farmacia" />}
        />
          <Typography variant="h4" sx={{marginBottom:5}}>
            Medicamentos a enviar
          </Typography>
          <Grid container spacing={3}>
          <Box sx={{marginBottom:5, marginLeft:3}}>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Medicamento</TableCell>
                <TableCell>Cantidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <TextField
                      required
                      id="amount"
                      name="amount"
                      label=""
                      fullWidth
                      defaultValue={0}
                      variant="standard"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Grid>
          <Box textAlign='right' sx={{marginTop:10, marginBottom:2}}>
           <Button color="secondary" variant="contained" fullWidth>
             Marcar para envío
           </Button>
          </Box>
         </Paper>
        </Container>
    </React.Fragment>
  );
}
