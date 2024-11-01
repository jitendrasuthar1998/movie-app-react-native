import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { images } from '../../../assets';

const { TheGloryImg } = images;

const MovieCard = () => {
  return (
    <View style={styles.movieCardContainer}>
      <Image source={TheGloryImg} style={styles.moviePoster} />
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCardContainer: { height: 180, width: 120 },
  moviePoster: { borderRadius: 10 },
});
