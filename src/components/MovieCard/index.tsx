import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { images } from '../../../assets';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Text } from 'react-native-paper';

const { NoPosterImg } = images;

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
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
    navigation.navigate('Details', { title: item.title });
  };

  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.movieCardContainer}
    >
      <Image source={posterSource} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  movieCardContainer: {
    height: 180,
    width: 120,
    alignItems: 'center',
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
    textAlign: 'center',
  },
});
