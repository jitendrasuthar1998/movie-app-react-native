// Import necessary libraries and components
import React, { useState } from 'react'; // React core and hooks
import { StyleSheet, View } from 'react-native'; // Core React Native components
import { SafeAreaView } from 'react-native-safe-area-context'; // Safe area context for iOS
import { Text, useTheme } from 'react-native-paper'; // Theme and Text components from react-native-paper
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Navigation type for stack navigation

// Custom components, icons, and types
import CustomButton from '../../components/CustomButton'; // Custom button component
import CustomInput from '../../components/CustomInput'; // Custom input field component
import Header from '../../components/Header'; // Custom header component
import { icons } from '../../../assets'; // Import icon assets
import { RootStackParamList } from '../../types'; // Type definitions for navigation
import { AppDispatch } from '../../redux/store'; // Type definitions for Redux store
import { useDispatch } from 'react-redux'; // Redux hook for dispatching actions
import { signUpUser } from '../../redux/userSlice'; // Action to sign up user

// Destructure icons for easier access
const { LockIcon, MessageIcon, EyeIcon, UserIcon } = icons;

// Type definition for SignUp screen props, including navigation
type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>; // Navigation prop for navigating to Login screen
};

// Main SignUp component
const SignUp: React.FC<SignUpScreenProps> = ({ navigation }) => {
  // Local state for email, password, and username inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const theme = useTheme(); // Get theme colors for styling
  const dispatch = useDispatch<AppDispatch>(); // Get dispatch function for Redux actions

  // Handle signup action
  const handleSignUp = () => {
    // Check if all fields are filled
    if (userName && email && password) {
      // Dispatch signup action with username, email, and password
      dispatch(signUpUser({ username: userName, email, password }));
      alert('User signed up successfully!'); // Alert on successful signup

      // Navigate to Login screen after signup
      navigation.navigate('Login');
    } else {
      alert('Please fill all fields'); // Alert if fields are empty
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]} // Set background color from theme
    >
      {/* Header component with title */}
      <Header title={'Sign Up'} size={24} />
      <View style={styles.inputFieldsContainer}>
        {/* Custom input for email */}
        <CustomInput
          label={'Email'}
          value={email}
          setValue={setEmail}
          leftIcon={<MessageIcon width={18} height={18} />} // Icon for email input
        />
        {/* Custom input for username */}
        <CustomInput
          label={'Username'}
          value={userName}
          setValue={setUserName}
          leftIcon={<UserIcon width={18} height={18} />} // Icon for username input
        />
        {/* Custom input for password */}
        <CustomInput
          label={'Password'}
          value={password}
          setValue={setPassword}
          leftIcon={<LockIcon width={18} height={18} />} // Icon for password input
          rightIcon={<EyeIcon width={18} height={18} />} // Eye icon for password visibility
        />
        {/* Custom button for signing up */}
        <CustomButton
          mode={'contained'}
          title={'Sign Up'}
          onPress={handleSignUp} // Handle sign up when button is pressed
        />
        {/* Helper text with link to login */}
        <Text style={styles.helperText}>
          Already have an account?{' '}
          <Text
            style={{ color: '#95ACFF' }} // Link color
            onPress={() => navigation.navigate('Login')} // Navigate to Login screen
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

// Styles for consistent layout and appearance
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 20, // Space between elements
    padding: 10,
    justifyContent: 'center', // Center content vertically
  },
  inputFieldsContainer: {
    height: 334, // Fixed height for input fields container
    display: 'flex',
    gap: 20, // Space between input fields and button
  },
  helperText: {
    textAlign: 'center', // Center the helper text
    fontFamily: 'Inter-Regular', // Font style for helper text
    fontSize: 13, // Font size for helper text
  },
});
