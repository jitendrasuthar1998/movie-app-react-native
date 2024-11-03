import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { StyleSheet, Text, View } from 'react-native';

type GenresProps = {
  data: Number[];
};

const Genres: React.FC<GenresProps> = ({ data }) => {
  const { genres } = useSelector((state: RootState) => state.movie);

  return (
    <View style={styles.genreContainer}>
      {data.map((genreId) => {
        // Find the genre name by ID
        const genre = genres.find((g) => g.id === genreId);
        if (!genre) return null; // Skip if no matching genre is found

        return (
          <View key={genreId.toString()} style={styles.genreItem}>
            <Text style={styles.genreText}>{genre.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Genres;

const styles = StyleSheet.create({
  genreContainer: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  genreItem: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  genreText: {
    fontSize: 6,
    color: '#333',
  },
});
