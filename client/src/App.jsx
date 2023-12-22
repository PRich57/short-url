import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import Home from "./pages/Home";
import Login from "./pages/Login";
import ErrorPage from './pages/Error';
import Register from './pages/Register'
import Header from './components/Header';
import Profile from './pages/Profile';
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

// Declare RootRoute for dynamically rendering Home or Login based on auth
const RootRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Home /> : <Login />;
};

export default App;