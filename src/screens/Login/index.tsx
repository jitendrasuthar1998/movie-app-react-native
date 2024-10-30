import React, { useState } from 'react';
import CustomInput from '../../components/CustomInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useTheme } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import { StatusBar, View } from 'react-native';
import Header from '../../components/Header';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { RootStackParamList } from '../../types';
import { icons } from '../../../assets';

const { LockIcon, MessageIcon, EyeIcon } = icons;

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const theme = useTheme();

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
      <StatusBar backgroundColor={theme.colors.background} />

      <Header title={'Login'} size={24} />

      <View style={{ height: 334, display: 'flex', gap: 20 }}>
        <CustomInput
          label={'Email'}
          value={email}
          setValue={setEmail}
          leftIcon={<MessageIcon width={18} height={18} />}
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
          title={'Login'}
          onPress={() => navigation.navigate('Home')}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Inter-Regular',
            fontSize: 13,
          }}
        >
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
