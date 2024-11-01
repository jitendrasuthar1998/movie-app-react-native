import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import MovieSection from '../../components/MovieSection';
import { useTheme } from 'react-native-paper';
import { images } from '../../../assets';

const { MadameWebImg } = images;

const MainHome = () => {
  const theme = useTheme();
  return (
    <ScrollView
      style={[
        styles.scrollViewContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Image source={MadameWebImg} style={styles.heroImg} />
      <MovieSection />
      <MovieSection />
      <MovieSection />
    </ScrollView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  heroImg: {
    width: '100%',
    height: 450,
  },
});
