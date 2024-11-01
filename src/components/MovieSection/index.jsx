import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import MovieCard from '../MovieCard';
import { Card, Text, useTheme } from 'react-native-paper';

const MovieSection = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.movieSectionContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text style={styles.movieSectionTitle}>Popular</Text>
      <FlatList
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        renderItem={() => <MovieCard />}
      />
    </View>
  );
};

export default MovieSection;

const styles = StyleSheet.create({
  movieSectionContainer: {
    height: 215,
    width: '100%',
    display: 'flex',
    borderRadius: 0,
    paddingHorizontal: 10,
    borderWidth: 0,
    gap: 5,
    marginVertical: 10,
  },
  movieSectionTitle: { fontFamily: 'Inter-Bold', fontSize: 20 },
});
