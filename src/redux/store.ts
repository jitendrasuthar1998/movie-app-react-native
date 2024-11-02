// store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

// RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
