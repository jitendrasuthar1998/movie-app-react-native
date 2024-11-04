// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'; // Safe area context for iOS
import { Text, useTheme } from 'react-native-paper'; // Theme and Text components
import CustomButton from '../../components/CustomButton'; // Custom button component
import { StatusBar, StyleSheet, View } from 'react-native'; // Core React Native components
import Header from '../../components/Header'; // Custom header component
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'; // Navigation type
import CustomInput from '../../components/CustomInput'; // Custom input field component
import { RootStackParamList } from '../../types'; // Type definitions for navigation
import { icons } from '../../../assets'; // Import icon assets
import { loginUser } from '../../redux/userSlice'; // Action to log in user
import { AppDispatch, RootState } from '../../redux/store'; // Type definitions for Redux store
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks for state management

// Destructure icons for easier access
const { LockIcon, MessageIcon, EyeIcon } = icons;

// Type definition for Login screen props, including navigation
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

// Main Login component
const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  // Local state for email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme(); // Get theme colors
  const dispatch = useDispatch<AppDispatch>(); // Get dispatch function for Redux actions
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn); // Get login state from Redux store

  // Navigate to Start screen if user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Start');
    }
  }, [isLoggedIn, navigation]);

  // Handle login action
  const handleLogin = () => {
    if (email && password) {
      // Dispatch login action with email and password
      dispatch(loginUser({ email, password }));
    } else {
      alert('Please fill all fields'); // Alert if fields are empty
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Set the background color of the status bar */}
      <StatusBar backgroundColor={theme.colors.background} />

      {/* Header component with title */}
      <Header title={'Login'} size={24} />

      <View style={styles.inputContainer}>
        {/* Custom input for email */}
        <CustomInput
          label={'Email'}
          value={email}
          setValue={setEmail}
          leftIcon={<MessageIcon width={18} height={18} />} // Icon for email input
        />
        {/* Custom input for password */}
        <CustomInput
          label={'Password'}
          value={password}
          setValue={setPassword}
          leftIcon={<LockIcon width={18} height={18} />} // Icon for password input
          rightIcon={<EyeIcon width={18} height={18} />} // Eye icon for password visibility
        />
        {/* Custom button for logging in */}
        <CustomButton
          mode={'contained'}
          title={'Login'}
          onPress={handleLogin} // Handle login when button is pressed
        />
        {/* Helper text with link to sign up */}
        <Text style={styles.helperText}>
          Haven't made an account?{' '}
          <Text
            style={{ color: '#95ACFF' }} // Link color
            onPress={() => navigation.navigate('SignUp')} // Navigate to SignUp screen
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

// Styles for consistent layout and appearance
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 20, // Space between elements
    padding: 10,
    justifyContent: 'center', // Center content vertically
  },
  inputContainer: {
    height: 334, // Fixed height for input container
    display: 'flex',
    gap: 20, // Space between input fields and button
  },
  helperText: {
    textAlign: 'center', // Center the helper text
    fontFamily: 'Inter-Regular', // Font style for helper text
    fontSize: 13, // Font size for helper text
  },
});
