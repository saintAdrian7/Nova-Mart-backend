import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Avatar, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../../context/AuthContext/AuthContextConsts";
import { useNavigate } from "react-router";
import { Logout } from "../../context/AuthContext/AuthContextActions";
import {  Home, ShoppingCart } from "@mui/icons-material";

const Navbar: React.FC<{ tooglemodal: () => void }> = ({ tooglemodal }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { state, dispatch } = useAuth();
  const user = state.loggedInUser;
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate(`/dashboard/${user?._id}`);
  };

  const handleAuth = () => {
    tooglemodal();
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    Logout(dispatch);
  };

  const getUserInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nova Mart
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" onClick={() => navigate('/homepage')}> <Home /></Button>
          <Button color="inherit" onClick={() => navigate(`/dashboard/${state.loggedInUser?._id}`)}> <ShoppingCart/></Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">About</Button>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 2 }}>
          <IconButton
            size="large"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate('/homepage')}>Home</MenuItem>
            <MenuItem onClick={() => navigate('/dashboard')}>Shop</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            {!state.loggedInUser ? (
              <MenuItem onClick={handleAuth}>Login or Sign up</MenuItem>
            ) : (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            )}
          </Menu>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            {user ? (
              user.image ? (
                <Avatar alt={user.firstName} src={user.image} />
              ) : (
                <Avatar>{getUserInitials(user.firstName + ' ' + user.lastName)}</Avatar>
              )
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
