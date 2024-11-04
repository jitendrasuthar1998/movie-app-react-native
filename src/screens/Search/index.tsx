import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchDataFromApi } from '../../utils/api';
import { Movie } from '../../types';
import FavoriteMovieCard from '../../components/FavoriteMovieCard';
import SearchMovieCard from '../../components/SearchMovieCard';
import SearchSkeleton from '../../components/SearchSkeleton';

const ITEMS_PER_SCREEN = 4; // Show 5 items per screen on mobile
const API_ITEMS_PER_PAGE = 20; // API returns 20 items per page

const Search = () => {
  const theme = useTheme();
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1); // API page for fetching new results
  const [subPage, setSubPage] = useState(1); // Inner page for 5-item pagination
  const [loading, setLoading] = useState(false);

  // console.log('search text: ', searchText);
  // console.log('search result: ', results);
  const { url, favoriteMovies } = useSelector(
    (state: RootState) => state.movie
  );
  // Fetch results based on the current API page
  const searchMovies = async (resetResults = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetchDataFromApi(
        `/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${page}`
      );
      // console.log('search response', response);
      setResults((prevResults) =>
        resetResults ? response.results : [...prevResults, ...response.results]
      );
      setTotalPages(response.total_pages);
      setTotalResults(response.total_results);
      setSubPage(1); // Reset to the first sub-page on new API fetch if results are reset
    } catch (error) {
      console.error('Error fetching results:', error);
    }
    setLoading(false);
  };

  // console.log('total pages', totalPages);
  // console.log('results', results.length);

  // Triggered when user initiates a search
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    setPage(1); // Reset API page
    setResults([]); // Clear previous results
    searchMovies(true); // Fetch new search results and reset
  };

  // Fetch more results if reaching end of current results for sub-pagination
  useEffect(() => {
    if (searchText) {
      searchMovies();
    }
  }, [page]);

  // Calculate items for the current sub-page
  const displayedResults = results.slice(
    (subPage - 1) * ITEMS_PER_SCREEN,
    subPage * ITEMS_PER_SCREEN
  );

  // Handle sub-page changes and fetch new results if necessary
  const handleSubPageChange = (newSubPage: number) => {
    setSubPage(newSubPage);

    // Check if we need to fetch more items if fewer than 5 are in displayed results

    // if (subPage * 4 < totalPages) {
    //   setPage(page + 1);
    // }
  };

  // console.log('total items', subPage * 4);
  // Render pagination buttons based on the current results length
  const renderSubPaginationButtons = () => {
    const subPageCount = Math.ceil(results.length / ITEMS_PER_SCREEN);
    return Array.from({ length: subPageCount }, (_, index) => (
      <TouchableOpacity
        key={index + 1}
        style={[
          styles.pageButton,
          subPage === index + 1 && { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => handleSubPageChange(index + 1)}
      >
        <Text
          style={[
            styles.pageButtonText,
            subPage === index + 1 && styles.activePageButtonText,
          ]}
        >
          {index + 1}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <View style={styles.searchContainer}>
        <TextInput
          value={searchText}
          onChangeText={handleSearchTextChange}
          style={[styles.searchInput, { color: theme.colors.primary }]}
          placeholder="Search for a title"
          placeholderTextColor={theme.colors.primary}
          onSubmitEditing={handleSearch}
        />
        <Ionicons
          onPress={handleSearch}
          name={'search'}
          size={24}
          color={theme.colors.primary}
        />
      </View>
      {/* Display Results */}
      <View style={{ paddingVertical: 10, gap: 10 }}>
        {loading ? (
          <SearchSkeleton />
        ) : (
          <>
            {displayedResults.map((movie) => (
              <SearchMovieCard key={movie.id} item={movie} url={url} />
            ))}
          </>
        )}
      </View>
      {/* Pagination Controls */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.paginationContainer}
      >
        {renderSubPaginationButtons()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
  },
  searchContainer: {
    minWidth: 320,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderRadius: 28,
    height: 56,
    backgroundColor: '#2B2930',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    fontSize: 16,
    fontWeight: '400',
  },
  paginationContainer: {
    flexDirection: 'row',
    // width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pageButton: {
    margin: 4,
    padding: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  activePageButton: {
    backgroundColor: '#007bff',
  },
  pageButtonText: {
    fontSize: 16,
  },
  activePageButtonText: {
    color: '#fff',
  },
});

export default Search;
