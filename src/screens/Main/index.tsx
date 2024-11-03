import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { images } from '../../../assets/index';
import CustomButton from '../../components/CustomButton';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { TheLastJediImg } = images;

type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
};

const Main: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'default'} translucent />
      <ImageBackground
        source={TheLastJediImg}
        resizeMode="cover"
        style={styles.heroImg}
      >
        <View style={styles.buttonsContainer}>
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
        </View>
      </ImageBackground>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonsContainer: {
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
  },
});
