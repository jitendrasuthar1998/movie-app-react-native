import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themeReducer from './themeSlice';
import userReducer from './userSlice';
import movieReducer from './movieSlice';

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'user', 'movie'], // Only persist specific reducers
};

// Wrap reducers with persistReducer
const rootReducer = {
  theme: persistReducer(persistConfig, themeReducer),
  user: persistReducer(persistConfig, userReducer),
  movie: persistReducer(persistConfig, movieReducer),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create a persistor to be used in the app
export const persistor = persistStore(store);

// RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
