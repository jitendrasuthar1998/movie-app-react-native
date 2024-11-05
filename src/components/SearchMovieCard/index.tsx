import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { images } from '../../../assets';
import { Text, useTheme } from 'react-native-paper';
import dayjs from 'dayjs';
import { Movie, RootStackParamList, Url } from '../../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LoadingRect from '../DetailsSkeleton/LoadingRect';

const { NoPosterImg } = images;

type SearchMovieCardProps = {
  item: Movie;
  url: Url;
};

const SearchMovieCard: React.FC<SearchMovieCardProps> = ({ item, url }) => {
  const theme = useTheme();
  const posterSource = item.poster_path
    ? { uri: url.poster + item.poster_path }
    : NoPosterImg;

  const truncatedTitle =
    item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigation = () => {
    navigation.navigate('Details', { title: item.title, id: item.id });
  };

  const [imageLoading, setImageLoading] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleNavigation}
      style={[
        styles.movieCardContainerStyle,
        { borderColor: theme.colors.onBackground, borderWidth: 0.2 },
      ]}
    >
      <View style={styles.moviePosterImgStyle}>
        {imageLoading ? (
          <LoadingRect
            style={[
              styles.moviePosterImgStyle,
              { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 },
            ]}
            height={'100%'}
            width={'100%'}
            backgroundColor={'#F3F3F3'}
          />
        ) : null}
        <Image
          source={posterSource}
          resizeMode="cover"
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          style={styles.moviePosterImgStyle}
        />
      </View>
      <View style={styles.movieDetailsContainerStyle}>
        <View style={{ gap: 10 }}>
          <Text style={styles.movieTitleStyle}>{truncatedTitle}</Text>
          <Text style={styles.movieYearStyle}>
            {dayjs(item.release_date).format('MMM D, YYYY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchMovieCard;

const styles = StyleSheet.create({
  movieCardContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 100,
    width: '100%',
    display: 'flex',
    gap: 10,
    // elevation: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 10,
  },
  moviePosterImgStyle: {
    height: 80,
    width: 60,
    borderRadius: 10,
  },
  movieDetailsContainerStyle: {
    width: 250,
    height: 80,
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieTitleStyle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#F3F3F3',
  },
  movieYearStyle: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    lineHeight: 11,
    color: '#969696',
  },
  movieLikeContainerStyle: {
    height: 30,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
