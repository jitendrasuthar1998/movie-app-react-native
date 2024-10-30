import React, { createContext, useState, useContext, useEffect } from 'react';
import merge from 'deepmerge';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from 'react-native-paper';

import Colors from './colors';
import { getItem, setItem } from '../utils/AsyncStorage.js';

const customDarkTheme: MD3Theme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme: MD3Theme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme: MD3Theme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme: MD3Theme = merge(DarkTheme, customDarkTheme);

// Define the type for ThemeContext
type ThemeContextType = {
  theme: MD3Theme;
  toggleTheme: () => void;
  isDarkTheme: boolean;
};

// Create the context
const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  const saveDarkTheme = async () => await setItem('isDarkTheme', isDarkTheme);

  const getDarkTheme = async () => {
    const darkTheme = await getItem('isDarkTheme');
    if (darkTheme !== null) {
      setIsDarkTheme(darkTheme);
    }
  };

  useEffect(() => {
    getDarkTheme();
  }, []);

  useEffect(() => {
    saveDarkTheme();
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
