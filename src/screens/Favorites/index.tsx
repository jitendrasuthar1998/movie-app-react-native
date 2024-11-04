import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Favorites = () => {
  const theme = useTheme();
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );
  const { url, favoriteMovies } = useSelector(
    (state: RootState) => state.movie
  );

  // console.log('favoriteMovies at Favorites', favoriteMovies);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ width: 10, height: 10 }} />
        )}
        contentContainerStyle={{ backgroundColor: theme.colors.background }}
        showsVerticalScrollIndicator={false}
        data={favoriteMovies}
        renderItem={({ item }) => <FavoriteMovieCard item={item} url={url} />}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
