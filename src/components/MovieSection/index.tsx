import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import MovieCard from '../MovieCard';
import { Text, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Movie } from '../../types';

type MovieSectionProps = {
  category: string;
};

const MovieSection: React.FC<MovieSectionProps> = ({ category }) => {
  const theme = useTheme();

  const getCategory = (category: string): Movie[] => {
    switch (category) {
      case 'Now Playing':
        return nowPlayingMovies;
      case 'Popular':
        return popularMovies;
      case 'Top Rated':
        return topRatedMovies;
      case 'Upcoming':
        return upComingMovies;
      default:
        return [];
    }
  };

  const { popularMovies, nowPlayingMovies, topRatedMovies, upComingMovies } =
    useSelector((state: RootState) => state.movie);

  const movies = getCategory(category);
  // console.log(getCategory(category));
  // const { data, loading } = useFetch(`/movie/${getCategory(category)}`);
  // console.log('category', data);

  return (
    <View
      style={[
        styles.movieSectionContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={styles.movieSectionTitle}>{category}</Text>
      <FlatList
        horizontal
        contentContainerStyle={{ marginTop: 10 }}
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        showsHorizontalScrollIndicator={false}
        data={movies}
        renderItem={({ item }) => <MovieCard item={item} />}
      />
    </View>
  );
};

export default MovieSection;

const styles = StyleSheet.create({
  movieSectionContainer: {
    // height: 215,
    paddingVertical: 10,
    width: '100%',
    display: 'flex',
    borderRadius: 0,
    paddingHorizontal: 10,
    gap: 5,
  },
  movieSectionTitle: { fontFamily: 'Inter-Bold', fontSize: 20 },
});
