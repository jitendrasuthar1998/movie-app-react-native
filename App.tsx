// App.tsx
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';

import { RootState, store, AppDispatch, persistor } from './src/redux/store';
import { loadThemePreference } from './src/redux/themeSlice';
import { PersistGate } from 'redux-persist/integration/react';
// Screens
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Settings from './src/screens/Settings';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Main from './src/screens/Main';
import Start from './src/screens/Start';
import {
  loadCurrentUser,
  loadUserLoginState,
  loadUsers,
} from './src/redux/userSlice';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

function MainApp() {
  // Load custom fonts

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadThemePreference());
    dispatch(loadUsers());
    dispatch(loadCurrentUser());
    dispatch(loadUserLoginState());
  }, [dispatch]);

  const [loaded, error] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <MainNavigator />;
}

function MainNavigator() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.onBackground,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTitleStyle: {
              color: theme.colors.onBackground,
              fontFamily: 'Inter-Bold',
              fontSize: 18,
            },
          }}
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Start"
                options={{ headerShown: false }}
                component={Start}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen
                name="Settings"
                options={{ headerShown: false }}
                component={Settings}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Main"
                options={{ headerShown: false }}
                component={Main}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
