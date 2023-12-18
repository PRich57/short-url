import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import "../App.css"

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // State for mobile menu
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Remove user data from local storage and state
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const getMenuItems = () => {
    const items = [];
  
    items.push(
      <MenuItem key="home" onClick={() => { navigate('/shorten-url'); handleMenuClose(); }}>
        Home
      </MenuItem>
    );
  
    if (user) {
      items.push(
        <MenuItem key="profile" onClick={() => { navigate('/profile'); handleMenuClose(); }}>
          Profile
        </MenuItem>
      );
      items.push(
        <MenuItem key="logout" onClick={handleLogout}>
          Logout
        </MenuItem>
      );
    } else {
      items.push(
        <MenuItem key="login" onClick={() => { navigate('/'); handleMenuClose(); }}>
          Login
        </MenuItem>
      );
      items.push(
        <MenuItem key="signup" onClick={() => { navigate('/register'); handleMenuClose(); }}>
          Sign Up
        </MenuItem>
      );
    }
  
    return items;
  };

  // Render mobile menu
  const renderMobileMenu = (
    <Menu
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
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {getMenuItems()}
    </Menu>
  );

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            style={{ textAlign: "start" }}
            sx={{ flexGrow: 1 }}
          >
            URL Shortener
          </Typography>
          <div className="desktopMenu">
            <Button color="inherit" onClick={() => navigate("/shorten-url")}>
              Home
            </Button>
            {user ? (
              <>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            className="mobileMenuButton"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      {renderMobileMenu}
    </AppBar>
  );
}

export default Header;
