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
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={() => <FavoriteMovieCard />}
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
