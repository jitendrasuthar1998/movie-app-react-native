import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { images } from '../../../assets';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Text } from 'react-native-paper';
import Genres from '../Genres';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import dayjs from 'dayjs';

const { NoPosterImg } = images;

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  genre_ids: Number[];
  vote_average: number;
  release_date: string;
}

type MovieCardProps = {
  item: Movie;
};

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const { url } = useSelector((state: RootState) => state.movie);

  // Set the poster source based on availability of `poster_path`
  const posterSource = item.poster_path
    ? { uri: url.poster + item.poster_path }
    : NoPosterImg;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigation = () => {
    navigation.navigate('Details', { title: item.title, id: item.id });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.movieCardContainer}
    >
      <Image source={posterSource} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.releaseDate}>
        {dayjs(item.release_date).format('MMM D, YYYY')}
      </Text>
      <Genres data={item.genre_ids.slice(0, 2)} />
      <View style={styles.ratingItem}>
        <Text style={styles.ratingText}>{item.vote_average.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCardContainer: {
    // height: 180,
    width: 120,
    // borderColor: 'red',
    // borderWidth: 0.3,
    alignItems: 'center',
    position: 'relative',
  },
  moviePoster: {
    height: 160,
    width: 110,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  releaseDate: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  ratingItem: {
    paddingHorizontal: 4,
    position: 'absolute',
    top: 140,
    right: 10,
    paddingVertical: 2,
    backgroundColor: '#eee',
    borderRadius: 50,
  },
  ratingText: {
    fontSize: 6,
    color: '#333',
  },
});
