import Box from '@mui/material/Box';
import NavBar from './components/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <NavBar/>
    </Box>
  );
}
export default App;
