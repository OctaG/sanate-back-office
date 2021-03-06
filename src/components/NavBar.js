import React from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DescriptionIcon from '@mui/icons-material/Description';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
//import StoreIcon from '@mui/icons-material/Store';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';

import ProductTable from "../components/ProductTable.js"
import OrderTable from "../components/OrderTable.js"

import UploadProduct from "../pages/UploadProduct.js"
import CoordinateDelivery from "../pages/CoordinateDelivery.js"
import OrderDetails from "../pages/OrderDetails.js"
import Home from "../pages/Home.js"
import Inventory from "../pages/Inventory.js"
import EditProduct from "../pages/EditProduct.js"

import firebase from "../utils/firebase.js";

import logo from '../assets/logo.png';

import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const menuOptions = [
  ['Resumen', '/'],
  ['Ordenes', 'orders'],
  ['Productos', 'products'],
  /*['Coordinar entregas', 'coordinate']*/
]


const drawerIcons = [
  <DashboardIcon/>,
  <ShoppingCartIcon/>,
  <LocalHospitalIcon/>,
  /*<StoreIcon/>*/
]

export default function NavBar() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function logOut(){
    firebase.auth().signOut();
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            style={{height: 50, width: 500, margin: 'auto', marginRight: -50}}
            src={logo}
            alt="logo"
          />
          <IconButton
            color="inherit"
            aria-label="logout"
            sx={{
              marginLeft: 'auto',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                logOut()
              }}
            >
              Salir
            </Button>
          </IconButton>
          {/*
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          */}
          {/*
          <IconButton color="inherit" sx={{marginLeft: "auto"}} onClick={goToOrders}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuOptions.map((text, index) => (
            <Link to={menuOptions[index][1]} style={{color:"black", textDecoration:"none" }}>
              <ListItem button key={text[0]}>
                <ListItemIcon>
                  {drawerIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text[0]}/>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        {open?
          <ListSubheader align="center"> Reportes </ListSubheader>
          :
          null
        }
        <List>
          {['Octubre', 'Q3 2021', '2020'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <DescriptionIcon/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Switch>
         <Route path="/products">
          <ProductTable/>
         </Route>
         <Route path="/orders">
          <OrderTable/>
         </Route>
         <Route path="/edit-product">
          <EditProduct/>
         </Route>
         <Route path="/add-product">
          <UploadProduct/>
         </Route>
         <Route path="/order-details">
          <OrderDetails/>
         </Route>
         <Route path="/coordinate">
          <CoordinateDelivery/>
         </Route>
         <Route path="/inventory">
          <Inventory/>
         </Route>
         <Route path="/">
          <Home/>
         </Route>
        </Switch>
      </Box>
    </Box>
  );
}
