// src/context/DarkModeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const DarkModeContext = createContext();

// Dark Mode Provider Component
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode !== null) {
      setDarkMode(JSON.parse(storedMode));
    }
  }, []);

  // Toggle and save mode to localStorage
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
