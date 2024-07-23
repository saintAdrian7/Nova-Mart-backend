import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/AuthContext/AuthContextConsts";
import { useNavigate } from "react-router";
import { Logout } from "../../context/AuthContext/AuthContextActions";

const Navbar: React.FC<{tooglemodal: ()=> void}> = ({tooglemodal}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {state,dispatch} = useAuth()
  const user = state.loggedInUser
  const navigate =useNavigate()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate(`/dashboard/${user?._id}`)
  };
  const handleAuth = () => {
    tooglemodal()
    setAnchorEl(null);
  }
const handleLogout = () => {
  setAnchorEl(null);
  Logout(dispatch)
}
const getUserInitials = (name: string) => {
  const names = name.split(' ');
  const initials = names.map((n) => n.charAt(0)).join('');
  return initials.toUpperCase();
};
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Nova Mart
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Shop</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">About</Button>
        </Box>
        <div>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            {!state.loggedInUser ? (
     
          <MenuItem onClick={handleAuth}>Login or Sign up</MenuItem>    
       
      ) : (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      )}
             
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
