// themeSlice.ts
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
import merge from 'deepmerge';
import { Colors } from '../constants/colors';
import { getItem, setItem } from '../utils/AsyncStorage.js';

// Define custom themes
const customDarkTheme: MD3Theme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme: MD3Theme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme: MD3Theme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme: MD3Theme = merge(DarkTheme, customDarkTheme);

// Initial state with default theme
interface ThemeState {
  isDarkTheme: boolean;
  theme: MD3Theme;
}

const initialState: ThemeState = {
  isDarkTheme: true,
  theme: CombinedDarkTheme,
};

// Async actions to load/save theme preference
export const loadThemePreference = createAsyncThunk(
  'theme/loadPreference',
  async () => {
    const darkTheme = await getItem('isDarkTheme');

    return darkTheme !== null ? darkTheme : true; // default to dark theme
  }
);

export const saveThemePreference = createAsyncThunk(
  'theme/savePreference',
  async (isDarkTheme: boolean) => {
    await setItem('isDarkTheme', isDarkTheme);
  }
);

// Slice
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      // <-- Explicitly set type
      state.isDarkTheme = !state.isDarkTheme;
      state.theme = state.isDarkTheme
        ? CombinedDarkTheme
        : CombinedDefaultTheme;
      setItem('isDarkTheme', state.isDarkTheme);
    },
    setTheme: (state: ThemeState, action: PayloadAction<boolean>) => {
      // <-- Explicitly set type
      state.isDarkTheme = action.payload;
      state.theme = action.payload ? CombinedDarkTheme : CombinedDefaultTheme;
      setItem('isDarkTheme', state.isDarkTheme);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadThemePreference.fulfilled, (state, action) => {
      // console.log('theme builder action payload', action.payload);
      state.isDarkTheme = action.payload;
      state.theme = state.isDarkTheme
        ? CombinedDarkTheme
        : CombinedDefaultTheme;
    });
  },
});

// Export actions
export const { toggleTheme, setTheme } = themeSlice.actions;

// Reducer
export default themeSlice.reducer;
