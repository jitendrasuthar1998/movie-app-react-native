import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { images } from '../../../assets/index';
import CustomButton from '../../components/CustomButton';
import { RootStackParamList } from '../../types';
import { RootState } from '../../redux/store';

const { TheLastJediImg } = images;

// Define props for MainScreen including navigation prop
type MainScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
};

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
        source={TheLastJediImg}
        resizeMode="cover"
        style={styles.heroImg}
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
