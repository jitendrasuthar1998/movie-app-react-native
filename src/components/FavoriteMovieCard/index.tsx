import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { images } from '../../../assets';
import { Text, useTheme } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { removeMovieFromFavorites } from '../../redux/movieSlice';
import { Movie } from '../../types';

const { NoPosterImg } = images;

interface Url {
  backdrop: string;
  poster: string;
  profile: string;
}

type FavoriteMovieCardProps = {
  item: Movie;
  url: Url;
};

const FavoriteMovieCard: React.FC<FavoriteMovieCardProps> = ({ item, url }) => {
  const theme = useTheme();
  const posterSource = item.poster_path
    ? { uri: url.poster + item.poster_path }
    : NoPosterImg;

  const dispatch = useDispatch();

  const handleLikeDislike = () => {
    dispatch(removeMovieFromFavorites(item));
  };

  const truncatedTitle =
    item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title;

  return (
    <View
      style={[
        styles.movieCardContainerStyle,
        { borderColor: theme.colors.onBackground, borderWidth: 0.2 },
      ]}
    >
      <Image
        source={posterSource}
        resizeMode="cover"
        style={styles.moviePosterImgStyle}
      />
      <View style={styles.movieDetailsContainerStyle}>
        <View style={{ gap: 10 }}>
          <Text style={styles.movieTitleStyle}>{truncatedTitle}</Text>
          <Text style={styles.movieYearStyle}>
            {dayjs(item.release_date).format('MMM D, YYYY')}
          </Text>
        </View>
        <View style={styles.movieLikeContainerStyle}>
          <Ionicons
            onPress={handleLikeDislike}
            name={'heart'}
            size={20}
            color={theme.colors.primary}
          />
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
