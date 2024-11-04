import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';

// Import app screens
import Details from './src/screens/Details';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Main from './src/screens/Main';
import Start from './src/screens/Start';

// redux actions, store, and action type
import {
  loadCurrentUser,
  loadUserLoginState,
  loadUsers,
} from './src/redux/userSlice';
import { RootState, store, AppDispatch } from './src/redux/store';
import { loadThemePreference } from './src/redux/themeSlice';
import { loadFavoriteMovies } from './src/redux/movieSlice';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Provider gives access to the Redux store across the app
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

function MainApp() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Load user preferences and data on app start
    dispatch(loadThemePreference());
    dispatch(loadUsers());
    dispatch(loadCurrentUser());
    dispatch(loadUserLoginState());
    dispatch(loadFavoriteMovies());
  }, [dispatch]);

  // Load custom fonts for the app
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
    // Hide splash screen once fonts are loaded
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Show nothing until fonts are loaded
  if (!loaded && !error) {
    return null;
  }

  return <MainNavigator />;
}

// MainNavigator: handles the screen navigation and conditional routing
function MainNavigator() {
  // Get the current theme from Redux store
  const theme = useSelector((state: RootState) => state.theme.theme);

  // Check user login status from Redux store
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    // PaperProvider applies the app theme (dark/light)
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // Style for headers
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
          {/* Conditionally render screens based on login status */}
          {isLoggedIn ? (
            <>
              {/* User is logged in, show main app screens */}
              <Stack.Screen
                name="Start"
                options={{ headerShown: false }}
                component={Start}
              />
              <Stack.Screen name="Details" component={Details} />
            </>
          ) : (
            <>
              {/* User is not logged in, show authentication screens */}
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
