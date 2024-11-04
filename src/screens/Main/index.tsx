// Import necessary components and libraries
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Navigation type for stack
import { useTheme } from 'react-native-paper'; // Hook to use theme for dark/light mode
import { useSelector } from 'react-redux'; // Hook to access the Redux store
import { images } from '../../../assets/index'; // Import image assets
import CustomButton from '../../components/CustomButton'; // Custom button component
import { RootStackParamList } from '../../types'; // Type definitions for navigation stack
import { RootState } from '../../redux/store'; // Root state type for Redux store

// Destructure TheLastJediImg from imported images
const { TheLastJediImg } = images;

// Define props for MainScreen including navigation prop
type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
};

// Main screen component showing a background image and buttons for navigation
const Main: React.FC<MainScreenProps> = ({ navigation }) => {
  const theme = useTheme(); // Get theme settings (dark or light) from the app theme provider

  // Access current theme mode from Redux store
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );

  return (
    <View style={styles.container}>
      {/* Customize the StatusBar based on theme settings */}
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />

      {/* Display background image covering the entire screen */}
      <ImageBackground
        source={TheLastJediImg} // Background image source
        resizeMode="cover" // Set image resizing mode to cover the screen
        style={styles.heroImg} // Apply styling to cover entire screen
      >
        {/* Container for buttons positioned at the bottom of the screen */}
        <View style={styles.buttonsContainer}>
          {/* Login button that navigates to the Login screen */}
          <CustomButton
            mode="contained"
            title={'Login'}
            onPress={() => navigation.navigate('Login')}
          />
          {/* Spacer between buttons */}
          <View style={{ height: 20 }} />
          {/* Sign Up button that navigates to the Sign Up screen */}
          <CustomButton
            mode="outlined"
            title={'Sign Up'}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Main;

// StyleSheet for the Main component
const styles = StyleSheet.create({
  container: { flex: 1 }, // Main container takes full screen height
  heroImg: {
    position: 'absolute', // Position image to cover entire screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonsContainer: {
    backgroundColor: '#121212E5', // Semi-transparent background for button container
    position: 'absolute', // Position container at bottom of screen
    bottom: 0,
    left: 0,
    right: 0,
    height: 200, // Set height for container
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    display: 'flex', // Flex display for alignment
    paddingTop: 29, // Padding for layout spacing
    paddingBottom: 29,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
