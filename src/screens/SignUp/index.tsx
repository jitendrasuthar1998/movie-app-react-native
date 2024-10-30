import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// custom components, icons and types
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Header from '../../components/Header';
import { icons } from '../../../assets';
import { RootStackParamList } from '../../types';

const { LockIcon, MessageIcon, EyeIcon, UserIcon } = icons;

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const SignUp: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const theme = useTheme();

  const handleSignUp = () => {
    alert('Sign Up button clicked');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.background,
        display: 'flex',
        flex: 1,
        gap: 20,
        padding: 10,
        justifyContent: 'center',
      }}
    >
      <Header title={'Sign Up'} size={24} />
      <View style={{ height: 334, display: 'flex', gap: 20 }}>
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
          leftIcon={<LockIcon width={18} height={18} />}
          rightIcon={<EyeIcon width={18} height={18} />}
        />
        <CustomButton
          mode={'contained'}
          title={'Sign Up'}
          onPress={handleSignUp}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Inter-Regular',
            fontSize: 13,
          }}
        >
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
