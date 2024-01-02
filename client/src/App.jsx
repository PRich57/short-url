import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from './pages/Error';
import Register from './pages/Register'
import Header from './components/Header';
import Profile from './pages/Profile';
import RootRoute from './components/RootRoute';
import client from './utils/auth/auth';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

// // Declare RootRoute for dynamically rendering Home or Login based on auth
// const RootRoute = () => {
//   const navigate = useNavigate();
//   // Use useEffect to check token expiry every minute
//   useEffect(() => {
//     // Function to check token and log user out if expired
//     const checkAndLogout = () => {
//       const isAuthenticated = checkToken();
//       console.log(isAuthenticated);
//       if (!isAuthenticated) {
//         logoutUser(navigate);
//       }
//     };

//     // Check immediately and every minute thereafter
//     checkAndLogout();
//     const interval = setInterval(checkAndLogout, 30000);
//     console.log(interval);
//     // Cleanup on component unmount 
//     return () => clearInterval(interval);
//   }, []);

//   // Check if token is expired
//   const isAuthenticated = checkToken();
//   return isAuthenticated ? <Home /> : <Login />;
// };

// // Create checkToken function to automatically log user out after expiry
// function checkToken() {
//   const token = localStorage.getItem('token');
//   if (!token) return false;

//   // Decode and check expiry
//   const decodedToken = jwtDecode(token);
//   const currentTime = Date.now() / 1000;
//   console.log(decodedToken.exp, "++++++++++++++++++++++");
//   console.log(currentTime, "-----------------------");

//   // Return truthy or falsy for every check
//   return decodedToken.exp > currentTime;
// }

// function logoutUser(navigate) {
//   localStorage.removeItem("token");
//   localStorage.setItem("userData", null);
//   navigate('/login');
// };

export default App;