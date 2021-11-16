import Box from '@mui/material/Box';
import NavBar from './components/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <NavBar/>
      </Box>
    </Router>
  );
}
export default App;
