import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useThemeContext } from './src/themeContext';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Stack navigator for navigation
const Stack = createNativeStackNavigator();

// Screens
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Settings from './src/screens/Settings';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Main from './src/screens/Main';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  // loading custom fonts using useFonts

  const [loaded, error] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
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

  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme } = useThemeContext();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main Screen"
          screenOptions={{
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
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
          <Stack.Screen
            name="Main Screen"
            options={{ headerShown: false }}
            component={Main}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
