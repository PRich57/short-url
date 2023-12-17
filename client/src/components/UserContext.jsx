import React, { createContext, useContext, useState, useEffect } from 'react';

// Create user context for centralized user state management
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check for user data in localStorage
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Update local storage if user changes
    localStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);