import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    // Remove user data from local storage and state
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;