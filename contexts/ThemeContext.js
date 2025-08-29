import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance, useColorScheme } from 'react-native';

const ThemeContext = createContext({
    isDarkMode: false,
    toggleTheme: () => {},
  });

export const ThemeProvider = ({ children }) => {
const systemColorScheme = useColorScheme();
const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
}, []);

const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
};

return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
    {children}
    </ThemeContext.Provider>
);
};

export const useTheme = () => useContext(ThemeContext);
