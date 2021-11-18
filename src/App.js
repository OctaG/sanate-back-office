import React, {useState} from 'react';

import Box from '@mui/material/Box';

import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar.js'
import LogIn from './pages/LogIn.js'

import firebase from "./utils/firebase.js";

import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      setUser(true);
    } else {
      setUser(false);
    }
  });

  return (
    <Router>
    {!user?
        <Box>
          <LogIn/>
        </Box>
      :
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <NavBar/>
        </Box>
    }
    </Router>
  );
}
export default App;
