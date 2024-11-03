import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { images } from '../../../assets';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { useTheme, Text } from 'react-native-paper';
import SeasonCard from '../../components/SeasonCard';
const { TheGloryPoster } = images;

const Details = () => {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();

  const { title } = route.params;
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [navigation, title]);

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.background,
        gap: 10,
      }}
    >
      <Image source={TheGloryPoster} height={200} resizeMode="cover" />

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
          2022 | 18+ | 1 Season | K-Drama
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
          A young woman, bullied to the point of deciding to drop out of school,
          plans the best way to get revenge. After becoming a primary school
          teacher, she takes in the son of the man who tormented her the most to
          enact her vengeance.
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
          Starring : Song Hye-kyo, Lee Do-hyun, Lim Ji-yeon
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
          Creators : Kim Eun-sook, An Gil-ho
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
          Genre : Revenge, Psychological Thriller
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10, gap: 10 }}>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            color: theme.colors.onBackground,
            fontSize: 16,
            lineHeight: 19.36,
            textAlign: 'justify',
          }}
        >
          Episodes
        </Text>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            color: theme.colors.onBackground,
            fontSize: 14,
            lineHeight: 19.36,
            textAlign: 'justify',
          }}
        >
          Season 1
        </Text>
      </View>
      <SeasonCard />
      <SeasonCard />
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
