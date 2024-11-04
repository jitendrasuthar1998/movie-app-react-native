// Import necessary components from React Native and other libraries
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper'; // Hook to access theme settings
import { useSelector } from 'react-redux'; // Hook to access the Redux store
import { RootState } from '../../redux/store'; // Type definition for Redux store root state
import FavoriteMovieCard from '../../components/FavoriteMovieCard'; // Custom component for each favorite movie

// Favorites component to display the list of favorite movies
const Favorites = () => {
  const theme = useTheme(); // Get theme settings (dark or light) from the app theme provider
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme // Retrieve current theme mode from Redux
  );

  // Get movie URL and list of favorite movies from the Redux store
  const { url, favoriteMovies } = useSelector(
    (state: RootState) => state.movie
  );

  return (
    <View
      // Container view for the Favorites screen with dynamic background color
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Customize the StatusBar based on theme settings */}
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />

      {/* Check if there are any favorite movies */}
      {favoriteMovies.length > 0 ? (
        <FlatList
          // Component to display the list of favorite movies
          ItemSeparatorComponent={() => (
            // Spacer between items in the list
            <View style={{ width: 10, height: 10 }} />
          )}
          contentContainerStyle={{ backgroundColor: theme.colors.background }} // Background color for the list
          showsVerticalScrollIndicator={false} // Hide vertical scroll bar for cleaner look
          data={favoriteMovies} // Pass favorite movies data to the FlatList
          renderItem={({ item }) => <FavoriteMovieCard item={item} url={url} />} // Render each item with FavoriteMovieCard component
        />
      ) : (
        // Display message if there are no favorite movies
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Inter-Medium', fontSize: 18 }}>
            Favorite list is empty.
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;

// Styles for the Favorites component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Container takes full screen height
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
