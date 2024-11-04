// Import required functions and types from Redux Toolkit and local files
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie, Url } from '../types';
import { getItem, setItem } from '../utils/AsyncStorage';

// Define types for the initial state, specifying the structure of genres and the movie state

interface Genre {
  id: number;
  name: string;
}

interface MovieState {
  url: Url;
  genres: Genre[];
  favoriteMovies: Movie[];
  popularMovies: Movie[];
  nowPlayingMovies: Movie[];
  topRatedMovies: Movie[];
  upComingMovies: Movie[];
}

// Set up the initial state with default values for movie data and configuration URLs
const initialState: MovieState = {
  url: {
    backdrop: '',
    poster: '',
    profile: '',
  },
  genres: [],
  favoriteMovies: [],
  popularMovies: [],
  nowPlayingMovies: [],
  topRatedMovies: [],
  upComingMovies: [],
};

// Async action to load favorite movies from local storage (async storage) when the app initializes
export const loadFavoriteMovies = createAsyncThunk(
  'theme/loadPreference', // Action type
  async () => {
    const favoriteMovies = await getItem('favoriteMovies'); // Retrieve stored favorite movies
    return favoriteMovies; // Return retrieved movies or an empty array if not found
  }
);

// Create a slice of the Redux store for handling movie-related data
export const movieSlice = createSlice({
  name: 'movie', // Name of the slice
  initialState, // Initial state for the slice
  reducers: {
    // Save API configuration URLs (e.g., for posters and backdrops)
    saveApiConfiguration: (state, action: PayloadAction<Url>) => {
      state.url = action.payload;
    },
    // Save a list of movie genres
    saveMovieGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    // Add a movie to the favorites list and save the updated list in storage
    saveMovieIntoFavorites: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies.push(action.payload);
      setItem('favoriteMovies', state.favoriteMovies); // Persist updated favorites
    },
    // Remove a movie from favorites by filtering it out based on movie ID
    removeMovieFromFavorites: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (item) => isEqual(item, action) // Check for equality based on movie ID
      );
      setItem('favoriteMovies', state.favoriteMovies); // Persist updated favorites
    },
    // Save a list of popular movies
    savePopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.popularMovies = action.payload;
    },
    // Save a list of currently playing movies
    saveNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
    // Save a list of top-rated movies
    saveTopRatedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.topRatedMovies = action.payload;
    },
    // Save a list of upcoming movies
    saveUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upComingMovies = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle successful loading of favorite movies from local storage
    builder.addCase(loadFavoriteMovies.fulfilled, (state, action) => {
      if (action.payload.length) {
        state.favoriteMovies = action.payload; // Update state with loaded favorites
      }
    });
  },
});

// Helper function to check for non-equal movies based on movie ID, used in the filter function
function isEqual(item: Movie, action: PayloadAction<Movie>): boolean {
  return item.id !== action.payload.id;
}

// Export action creators for dispatching actions from components
export const {
  saveApiConfiguration,
  saveMovieGenres,
  saveMovieIntoFavorites,
  removeMovieFromFavorites,
  savePopularMovies,
  saveNowPlayingMovies,
  saveTopRatedMovies,
  saveUpcomingMovies,
} = movieSlice.actions;

// Export the reducer to be included in the store
export default movieSlice.reducer;
