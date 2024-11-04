import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import { StatusBar, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import CustomInput from '../../components/CustomInput';
import { RootStackParamList } from '../../types';
import { icons } from '../../../assets';
import { loginUser } from '../../redux/userSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

const { LockIcon, MessageIcon, EyeIcon } = icons;

// Type definition for Login screen props, including navigation
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Start');
    }
  }, [isLoggedIn, navigation]);

  const handleLogin = () => {
    if (email && password) {
      dispatch(loginUser({ email, password }));
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar backgroundColor={theme.colors.background} />

      <Header title={'Login'} size={24} />

      <View style={styles.inputContainer}>
        <CustomInput
          label={'Email'}
          value={email}
          setValue={setEmail}
          leftIcon={<MessageIcon width={18} height={18} />}
        />
        <CustomInput
          label={'Password'}
          value={password}
          isPassword
          setValue={setPassword}
          leftIcon={<LockIcon width={18} height={18} />}
        />
        <CustomButton
          mode={'contained'}
          title={'Login'}
          onPress={handleLogin}
        />
        <Text style={styles.helperText}>
          Haven't made an account?{' '}
          <Text
            style={{ color: '#95ACFF' }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 20,
    padding: 10,
    justifyContent: 'center',
  },
  inputContainer: {
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
