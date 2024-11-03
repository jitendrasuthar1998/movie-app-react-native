import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';

// Define types for the initial state
interface Url {
  backdrop: string;
  poster: string;
  profile: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  vote_average: number;
  release_date: string;
  [key: string]: any;
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

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    saveApiConfiguration: (state, action: PayloadAction<Url>) => {
      state.url = action.payload;
    },
    saveMovieGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    saveMovieIntoFavorites: (state, action: PayloadAction<Movie>) => {
      state.favoriteMovies.push(action.payload);
    },
    removeMovieFromFavorites: (state, action: PayloadAction<Movie>) => {
      console.log('favoriteMovies == ', current(state.favoriteMovies));
      state.favoriteMovies = state.favoriteMovies.filter((item) =>
        isEqual(item, action)
      );
    },
    savePopularMovies: (state, action: PayloadAction<Movie[]>) => {
      state.popularMovies = action.payload;
    },
    saveNowPlayingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.nowPlayingMovies = action.payload;
    },
    saveTopRatedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.topRatedMovies = action.payload;
    },
    saveUpcomingMovies: (state, action: PayloadAction<Movie[]>) => {
      state.upComingMovies = action.payload;
    },
  },
});

// Helper function with proper types
function isEqual(item: Movie, action: PayloadAction<Movie>): boolean {
  return item.id !== action.payload.id;
}

// Export action creators
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

export default movieSlice.reducer;
