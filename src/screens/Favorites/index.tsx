import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FavoriteMovieCard from '../../components/FavoriteMovieCard';
import { useTheme } from 'react-native-paper';

const Favorites = () => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        ItemSeparatorComponent={() => <View style={{ width: 5, height: 5 }} />}
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
    paddingHorizontal: 10,
  },
});
