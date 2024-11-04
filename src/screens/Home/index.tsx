import { Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MovieSection from '../../components/MovieSection';
import { useTheme } from 'react-native-paper';
import { images } from '../../../assets';
import useFetch from '../../hooks/useFetch';
import { fetchDataFromApi } from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveApiConfiguration,
  saveMovieGenres,
  saveNowPlayingMovies,
  savePopularMovies,
  saveTopRatedMovies,
  saveUpcomingMovies,
} from '../../redux/movieSlice';
import { AppDispatch, RootState } from '../../redux/store';
import MovieSectionSkeleton from '../../components/MovieSectionSkeleton';
import LoadingRect from '../../components/DetailsSkeleton/LoadingRect';

const { MadameWebImg } = images;

// Type for configuration API response
interface ConfigurationResponse {
  images: {
    secure_base_url: string;
  };
}

// Type for genre item in the genres API response
interface Genre {
  id: number;
  name: string;
}

// Type for genres API response
interface GenresResponse {
  genres: Genre[];
}

const MainHome: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );
  const {
    url,
    genres,
    popularMovies,
    nowPlayingMovies,
    topRatedMovies,
    upComingMovies,
  } = useSelector((state: RootState) => state.movie);

  const shouldFetchData = () => {
    return (
      !url.backdrop || // Check if configuration is missing
      Object.keys(genres).length === 0 || // Check if genres are missing
      popularMovies.length === 0 ||
      nowPlayingMovies.length === 0 ||
      topRatedMovies.length === 0 ||
      upComingMovies.length === 0
    );
  };

  useEffect(() => {
    if (shouldFetchData()) {
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchApiConfig(), getMovieGenres(), fetchMovies()]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to call API to get configuration details
  const fetchApiConfig = async () => {
    try {
      const res: ConfigurationResponse = await fetchDataFromApi(
        '/configuration'
      );
      const urlConfig = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'w342',
        profile: res.images.secure_base_url + 'w185',
      };
      dispatch(saveApiConfiguration(urlConfig));
    } catch (err) {
      console.log('err', err);
    }
  };

  const fetchMovies = async () => {
    try {
      if (popularMovies.length === 0) {
        const popularMoviesRes = await fetchDataFromApi('/movie/popular');
        dispatch(savePopularMovies(popularMoviesRes.results));
      }
      if (nowPlayingMovies.length === 0) {
        const nowPlayingMoviesRes = await fetchDataFromApi(
          '/movie/now_playing'
        );
        dispatch(saveNowPlayingMovies(nowPlayingMoviesRes.results));
      }
      if (topRatedMovies.length === 0) {
        const topRatedMoviesRes = await fetchDataFromApi('/movie/top_rated');
        dispatch(saveTopRatedMovies(topRatedMoviesRes.results));
      }
      if (upComingMovies.length === 0) {
        const upcomingMoviesRes = await fetchDataFromApi('/movie/upcoming');
        dispatch(saveUpcomingMovies(upcomingMoviesRes.results));
      }
    } catch (error) {
      console.error('Failed to fetch movie categories:', error);
    }
  };

  // Function to call API to get all genres data
  const getMovieGenres = async () => {
    const { genres } = await fetchDataFromApi(`/genre/movie/list`);
    // console.log('movieGenres', genres);
    dispatch(saveMovieGenres(genres));
  };

  return (
    <ScrollView
      style={[
        styles.scrollViewContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      {loading ? (
        <View style={{ display: 'flex', gap: 10 }}>
          <LoadingRect
            height={400}
            width={'100%'}
            backgroundColor={theme.colors.onBackground}
          />
          <MovieSectionSkeleton />
          <MovieSectionSkeleton />
        </View>
      ) : (
        <>
          <Image source={MadameWebImg} style={styles.heroImg} />
          <MovieSection category="Popular" />
          <MovieSection category="Now Playing" />
          <MovieSection category="Upcoming" />
          <MovieSection category="Top Rated" />
        </>
      )}
    </ScrollView>
  );
};

export default MainHome;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  heroImg: {
    width: '100%',
    height: 450,
  },
});
