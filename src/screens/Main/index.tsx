import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { images } from '../../../assets/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainScreen'>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'default'} hidden />
      <ImageBackground
        source={images.TheLastJedi}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 100,
        }}
      >
        <Card
          style={{
            backgroundColor: '#121212E5',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 200,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            display: 'flex',
            paddingTop: 29,
            paddingBottom: 29,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <CustomButton
            mode="contained"
            title={'Login'}
            onPress={() => navigation.navigate('Login')}
          />
          <View style={{ height: 20 }} />
          <CustomButton
            mode="outlined"
            title={'Sign Up'}
            onPress={() => navigation.navigate('SignUp')}
          />
        </Card>
      </ImageBackground>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
