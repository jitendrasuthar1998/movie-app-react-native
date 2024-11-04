import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Custom components, icons, and types
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/Header';
import { icons } from '../../../assets';
import { RootStackParamList } from '../../types';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/userSlice';
const { LockIcon, MessageIcon, EyeIcon, UserIcon } = icons;

// Type definition for SignUp screen props, including navigation
type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const SignUp: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  // Handle signup action
  const handleSignUp = () => {
    // Check if all fields are filled
    if (userName && email && password) {
      // Dispatch signup action with username, email, and password
      dispatch(signUpUser({ username: userName, email, password }));
      alert('User signed up successfully!');

      // Navigate to Login screen after signup
      navigation.navigate('Login');
    } else {
      alert('Please fill all fields'); // Alert if fields are empty
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title={'Sign Up'} size={24} />
      <View style={styles.inputFieldsContainer}>
        {/* Custom input for email */}
        <CustomInput
          label={'Email'}
          value={email}
          setValue={setEmail}
          leftIcon={<MessageIcon width={18} height={18} />}
        />
        {/* Custom input for username */}
        <CustomInput
          label={'Username'}
          value={userName}
          setValue={setUserName}
          leftIcon={<UserIcon width={18} height={18} />}
        />
        {/* Custom input for password */}
        <CustomInput
          label={'Password'}
          value={password}
          setValue={setPassword}
          isPassword
          leftIcon={<LockIcon width={18} height={18} />}
        />
        {/* Custom button for signing up */}
        <CustomButton
          mode={'contained'}
          title={'Sign Up'}
          onPress={handleSignUp}
        />
        {/* Helper text with link to login */}
        <Text style={styles.helperText}>
          Already have an account?{' '}
          <Text
            style={{ color: '#95ACFF' }}
            onPress={() => navigation.navigate('Login')}
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
