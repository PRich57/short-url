import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { useUser } from "./UserContext";

// Declare RootRoute for dynamically rendering Home or Login based on auth
const RootRoute = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  function handleLogout() {
    // Clear user data and navigate to login
    console.log("Logging out");
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login', { replace: true });
  }

  // Create checkToken function to automatically log user out after expiry
  const token = localStorage.getItem('token');
  function checkToken() {
    if (!token) {
      return false;
    }

    try {
      // Decode and check expiry
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
  
      // Return truthy or falsy for every check
      return decodedToken.exp > currentTime;
    } catch (err) {
      console.error("Error decoding token: ", err);
      return false;
    }
  }

  // Use useEffect to check token expiry
  useEffect(() => {
    // Function to check token and log user out if expired
    const checkAndLogout = () => {
      if (!token) {
        return;
      }
      if (!checkToken()) {
        handleLogout();
      }
    };

    // Check immediately and every minute thereafter
    checkAndLogout();
    const interval = setInterval(checkAndLogout, 60000);

    // Cleanup on component unmount 
    return () => clearInterval(interval);
  }, [navigate]);

  return checkToken() ? <Home /> : <Login />;
};

export default RootRoute;