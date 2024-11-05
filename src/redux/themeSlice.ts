// Import necessary functions and types from Redux Toolkit and React Native Paper
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  MD3Theme,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge'; // Utility for merging theme objects
import { Colors } from '../constants/colors';
import { getItem, setItem } from '../utils/AsyncStorage';

// Define custom themes by merging base themes with custom color schemes
const customDarkTheme: MD3Theme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme: MD3Theme = { ...MD3LightTheme, colors: Colors.light };

// Adapt navigation themes to match React Native Paper's dark and light themes
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Combine React Navigation themes with custom color themes for consistency
const CombinedDefaultTheme: MD3Theme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme: MD3Theme = merge(DarkTheme, customDarkTheme);

// Define the initial theme state structure
interface ThemeState {
  isDarkTheme: boolean;
  theme: MD3Theme;
}

// Set the initial theme state to dark mode by default
const initialState: ThemeState = {
  isDarkTheme: true,
  theme: CombinedDarkTheme,
};

// Async action to load the user's saved theme preference from storage
export const loadThemePreference = createAsyncThunk(
  'theme/loadPreference', // Action type
  async () => {
    const isDarkTheme = await getItem('isDarkTheme');
    return isDarkTheme !== null ? isDarkTheme : true;
  }
);

// Async action to save the user's theme preference to storage
export const saveThemePreference = createAsyncThunk(
  'theme/savePreference', // Action type
  async (isDarkTheme: boolean) => {
    await setItem('isDarkTheme', isDarkTheme);
  }
);

// Define the theme slice, which contains actions and reducers for managing theme state
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Action to toggle between dark and light themes
    toggleTheme: (state: ThemeState) => {
      state.isDarkTheme = !state.isDarkTheme;
      state.theme = state.isDarkTheme
        ? CombinedDarkTheme
        : CombinedDefaultTheme;
      setItem('isDarkTheme', state.isDarkTheme);
    },
    // Action to set the theme explicitly to dark or light
    setTheme: (state: ThemeState, action: PayloadAction<boolean>) => {
      state.isDarkTheme = action.payload;
      state.theme = action.payload ? CombinedDarkTheme : CombinedDefaultTheme;
      setItem('isDarkTheme', state.isDarkTheme);
    },
  },
  // Handle extra actions, such as async actions for loading preferences
  extraReducers: (builder) => {
    // Set the theme state based on the loaded preference from storage
    builder.addCase(loadThemePreference.fulfilled, (state, action) => {
      state.isDarkTheme = action.payload;
      state.theme = state.isDarkTheme
        ? CombinedDarkTheme
        : CombinedDefaultTheme;
    });
  },
});

// Export theme actions for use in components
export const { toggleTheme, setTheme } = themeSlice.actions;

// Export the reducer to be included in the store configuration
export default themeSlice.reducer;
