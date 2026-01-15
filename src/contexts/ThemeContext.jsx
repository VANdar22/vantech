import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * @typedef {'light' | 'dark'} Theme
 * @typedef {Object} ThemeContextType
 * @property {Theme} theme - The current theme
 * @property {() => void} toggleTheme - Function to toggle between themes
 */

const ThemeContext = createContext(undefined);

/**
 * Theme provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme');
    // Default to light theme regardless of system preference
    setTheme('dark');
    
    // Only use saved theme if it exists and is valid
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  // Update the theme class on the HTML element when theme changes
  useEffect(() => {
    if (!isMounted) return;
    
    const root = window.document.documentElement;
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // For Tailwind dark mode, we need to add/remove the 'dark' class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save the theme preference
    localStorage.setItem('theme', theme);
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Prevent hydration mismatch by not rendering until we know the theme
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the theme context
 * @returns {ThemeContextType} The theme context
 * @throws {Error} If used outside of ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
