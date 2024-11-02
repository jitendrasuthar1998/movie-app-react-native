import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { images } from '../../../assets';
import { Text, useTheme } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const FavoriteMovieCard = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.movieCardContainerStyle,
        { borderColor: theme.colors.onBackground, borderWidth: 0.2 },
      ]}
    >
      <Image
        source={images.WarriorsImg}
        resizeMode="cover"
        style={styles.moviePosterImgStyle}
      />
      <View style={styles.movieDetailsContainerStyle}>
        <View style={{ gap: 10 }}>
          <Text style={styles.movieTitleStyle}>Warriors</Text>
          <Text style={styles.movieYearStyle}>2019</Text>
        </View>
        <View style={styles.movieLikeContainerStyle}>
          <Ionicons name={'heart'} size={20} color={'white'} />
        </View>
      </View>
    </View>
  );
};

export default FavoriteMovieCard;

const styles = StyleSheet.create({
  movieCardContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 100,
    width: '100%',
    display: 'flex',
    gap: 10,
    // elevation: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 10,
  },
  moviePosterImgStyle: {
    height: 80,
    width: 60,
    borderRadius: 10,
  },
  movieDetailsContainerStyle: {
    width: 250,
    height: 80,
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieTitleStyle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#F3F3F3',
  },
  movieYearStyle: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    lineHeight: 11,
    color: '#969696',
  },
  movieLikeContainerStyle: {
    height: 30,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
