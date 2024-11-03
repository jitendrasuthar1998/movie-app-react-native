import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { images } from '../../../assets';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { useTheme, Text } from 'react-native-paper';
import SeasonCard from '../../components/SeasonCard';
import useFetch from '../../hooks/useFetch';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchDataFromApi } from '../../utils/api';
const { NoPosterImg } = images;

// Define the structure of the movie data
interface MovieData {
  title: string;
  id: number;
  release_date: string;
  adult: boolean;
  vote_average: number;
  overview: string;
  poster_path: string;
  genres: Array<{ name: string }>;
}

// Define the structure of the credits data
interface Credit {
  name: string;
  job: string;
}
interface CreditsData {
  cast: Credit[];
  crew: Credit[];
}

const Details = () => {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();

  const { title, id } = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MovieData | null>(null);
  const [credits, setCredits] = useState<CreditsData | null>(null);

  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({ title });
    getMovieAndCreditDetails();
  }, [navigation, title]);

  const getMovieAndCreditDetails = async () => {
    try {
      const movieData = await fetchDataFromApi(`/movie/${id}`);
      console.log('movie response: ', movieData);

      const creditsData = await fetchDataFromApi(`/movie/${id}/credits`);

      setData(movieData);
      setCredits(creditsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const { url } = useSelector((state: RootState) => state.movie);

  const posterSource =
    data && data?.poster_path
      ? { uri: url.poster + data?.poster_path }
      : NoPosterImg;

  const getCast = () => {
    if (credits?.cast) {
      return credits?.cast
        .slice(0, 2)
        .map((item) => item.name)
        .join(',');
    }
  };

  const getCreators = () => {
    if (credits?.crew) {
      return credits.crew
        .filter((item) => item.job == 'Producer' || item.job == 'Co-Producer')
        .map((item) => item.name)
        .join(', ');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.background,
        gap: 10,
      }}
    >
      <Image source={posterSource} height={200} resizeMode="cover" />

      <View style={{ paddingHorizontal: 10, gap: 10 }}>
        <Text
          style={{
            fontFamily: 'Inter-Bold',
            color: theme.colors.onBackground,
            fontSize: 20,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            color: '#969696',
            fontSize: 12,
            textAlign: 'justify',
          }}
        >
          {dayjs(data?.release_date).format('MMM D, YYYY')}
          {data?.adult ? <Text>| 18+</Text> : ''}
          {data?.vote_average ? ` | ${data?.vote_average}` : ''}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            color: theme.colors.onBackground,
            fontSize: 13,
            lineHeight: 15.73,
            textAlign: 'justify',
          }}
        >
          {data?.overview}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            color: theme.colors.onBackground,
            fontSize: 13,
            lineHeight: 15.73,
            textAlign: 'justify',
          }}
        >
          Starring: {getCast()}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            color: theme.colors.onBackground,
            fontSize: 13,
            lineHeight: 15.73,
            textAlign: 'justify',
          }}
        >
          Creators : {getCreators()}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-Regular',
            color: theme.colors.onBackground,
            fontSize: 13,
            lineHeight: 15.73,
            textAlign: 'justify',
          }}
        >
          Genre : {data?.genres.map((item) => item.name).join(', ')}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
