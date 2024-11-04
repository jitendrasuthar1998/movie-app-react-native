import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import movieReducer from './movieSlice';

// Wrap reducers with persistReducer
const rootReducer = {
  theme: themeReducer,
  user: userReducer,
  movie: movieReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

// RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
