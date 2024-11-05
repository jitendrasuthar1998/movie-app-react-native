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
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
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

  const { users } = useSelector((state: RootState) => state.user);

  const handleSignUp = () => {
    let userExist = users.some((user) => user.email === email);

    // Check if all fields are filled
    if (userName && email && password) {
      if (userExist) {
        alert(`User ${userName} already exists. Login with ${email}`);
        navigation.navigate('Login');
      } else {
        dispatch(signUpUser({ username: userName, email, password }));
        navigation.navigate('Login');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title={'Sign Up'} size={24} />
      <View style={styles.inputFieldsContainer}>
        <CustomInput
          label={'Email'}
          value={email}
          setValue={setEmail}
          leftIcon={<MessageIcon width={18} height={18} />}
        />

        <CustomInput
          label={'Username'}
          value={userName}
          setValue={setUserName}
          leftIcon={<UserIcon width={18} height={18} />}
        />

        <CustomInput
          label={'Password'}
          value={password}
          setValue={setPassword}
          isPassword
          leftIcon={<LockIcon width={18} height={18} />}
        />

        <CustomButton
          mode={'contained'}
          title={'Sign Up'}
          onPress={handleSignUp}
        />

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
    gap: 20,
    padding: 10,
    justifyContent: 'center',
  },
  inputFieldsContainer: {
    height: 334,
    display: 'flex',
    gap: 20,
  },
  helperText: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: 13,
  },
});
