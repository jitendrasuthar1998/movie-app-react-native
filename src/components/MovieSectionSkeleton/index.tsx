import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoadingRect from '../DetailsSkeleton/LoadingRect';
import { useTheme } from 'react-native-paper';

const MovieSectionSkeleton = () => {
  const theme = useTheme();

  return (
    <View style={{ gap: 10 }}>
      <LoadingRect
        height={20}
        width={'100%'}
        backgroundColor={theme.colors.onBackground}
      />
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <LoadingRect
          height={120}
          width={120}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          height={120}
          width={120}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          height={120}
          width={120}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          height={20}
          width={120}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          height={20}
          width={120}
          backgroundColor={theme.colors.onBackground}
        />
      </View>
    </View>
  );
};

export default MovieSectionSkeleton;

const styles = StyleSheet.create({});
