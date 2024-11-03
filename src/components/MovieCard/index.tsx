import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { images } from '../../../assets';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

const { TheGloryImg } = images;

const MovieCard = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigation = () => {
    navigation.navigate('Details', { title: 'The Glory' });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.movieCardContainer}
    >
      <Image source={TheGloryImg} style={styles.moviePoster} />
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCardContainer: { height: 180, width: 120 },
  moviePoster: { borderRadius: 10 },
});
