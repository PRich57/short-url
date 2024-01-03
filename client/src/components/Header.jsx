import React, { useState, useEffect } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import "../App.css";
import "../style/Header.css";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // State for keeping track of active tab
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "login" || "home"
  );
  const location = useLocation();

  useEffect(() => {
    // Remove the slash before the path
    const currentPath = location.pathname.substring(1);
    // Default to home
    const tab = currentPath || "login";
    setActiveTab(tab);
    // Store location in local storage
    localStorage.setItem("activeTab", tab);
  }, [location, location.pathname]);

  // Function to set new active tab when clicked
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  // Function to determine button class
  const getButtonClass = (path) => {
    return `btn ${activeTab === path ? "active-btn" : ""}`;
  };

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
    navigate("/login");
  };

  const getMenuItems = () => {
    const items = [];

    items.push(
      <MenuItem
        key="home"
        onClick={() => {
          navigate("/home");
          handleMenuClose();
          handleTabClick("home");
        }}
        className={getButtonClass("home")}
        sx={{
          color: "white",
        }}
      >
        HOME
      </MenuItem>
    );

    if (user) {
      items.push(
        <MenuItem
          key="profile"
          onClick={() => {
            navigate("/profile");
            handleMenuClose();
            handleTabClick("profile");
          }}
          className={getButtonClass("profile")}
          sx={{
            color: "white",
          }}
        >
          PROFILE
        </MenuItem>
      );
      items.push(
        <MenuItem
          key="logout"
          onClick={handleLogout}
          className="btn"
          sx={{
            color: "#FFC27F",
          }}
        >
          SIGN OUT
        </MenuItem>
      );
    } else {
      items.push(
        <MenuItem
          key="login"
          onClick={() => {
            navigate("/login");
            handleMenuClose();
            handleTabClick("login");
          }}
          className={getButtonClass("login")}
          sx={{
            color: "white",
          }}
        >
          SIGN IN
        </MenuItem>
      );
      items.push(
        <MenuItem
          key="signup"
          onClick={() => {
            navigate("/register");
            handleMenuClose();
            handleTabClick("register");
          }}
          className={getButtonClass("register")}
          sx={{
            color: "white",
          }}
        >
          SIGN UP
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
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {getMenuItems()}
    </Menu>
  );

  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            component="div"
            style={{ textAlign: "start" }}
            sx={{
              mr: 2,
              fontWeight: 700,
              color: "#FFC27F",
              textDecoration: "none",
              flexGrow: 1,
              fontSize: "calc(12px + 1.5vw)",
            }}
          >
            YO<span style={{ color: "#8EE4AF" }}><span className="split-color">U</span> RL</span>
          </Typography>
          <div className="desktopMenu">
            <Button
              color="inherit"
              onClick={() => {
                navigate("/home");
                handleTabClick("home");
              }}
              className={getButtonClass("home")}
            >
              HOME
            </Button>
            {user ? (
              <>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/profile");
                    handleTabClick("profile");
                  }}
                  className={getButtonClass("profile")}
                >
                  PROFILE
                </Button>
                <Button
                  style={{ color: "#FFC27F" }}
                  color="inherit"
                  onClick={handleLogout}
                  className="btn"
                >
                  SIGN OUT
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/login");
                    handleTabClick("login");
                  }}
                  className={getButtonClass("login")}
                >
                  SIGN IN
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/register");
                    handleTabClick("register");
                  }}
                  className={getButtonClass("register")}
                >
                  SIGN UP
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
            sx={{
              mr: 2,
              display: { xl: "none", md: "none" },
              fontWeight: 700,
              color: "inherit",
            }}
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
