import Box from '@mui/material/Box';

import NavBar from './components/NavBar.js'

import Products from "./pages/Products.js"
import EditProduct from "./pages/EditProduct.js"
import UploadProduct from "./pages/UploadProduct.js"
import OrderDetails from "./pages/OrderDetails.js"
import LogIn from "./pages/LogIn.js"

function App() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <NavBar/>
    </Box>
  );
}
export default App;
