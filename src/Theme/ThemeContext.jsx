import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext({
  colors: {
    background: '#FFFFFF',
    primary: '#B00020',
  },
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    colors: {
      background: isDarkMode ? '#121212' : '#FFFFFF',
      primary: isDarkMode ? '#FF6B6B' : '#B00020',
      accent: isDarkMode ? '#330000' : '#FFECEC',
      textPrimary: isDarkMode ? '#FFFFFF' : '#2D2D2D',
      textSecondary: isDarkMode ? '#CCCCCC' : '#757575',
      border: isDarkMode ? '#333333' : '#E0E0E0',
    },
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
