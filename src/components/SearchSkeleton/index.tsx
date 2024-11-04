import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoadingRect from '../DetailsSkeleton/LoadingRect';
import { useTheme } from 'react-native-paper';

const SearchSkeleton = () => {
  const theme = useTheme();
  return (
    <>
      <LoadingRect
        height={100}
        width={'100%'}
        backgroundColor={theme.colors.onBackground}
      />
      <LoadingRect
        height={100}
        width={'100%'}
        backgroundColor={theme.colors.onBackground}
      />
      <LoadingRect
        height={100}
        width={'100%'}
        backgroundColor={theme.colors.onBackground}
      />
      <LoadingRect
        height={100}
        width={'100%'}
        backgroundColor={theme.colors.onBackground}
      />
      <LoadingRect
        height={100}
        width={'100%'}
        backgroundColor={theme.colors.onBackground}
      />
    </>
  );
};

export default SearchSkeleton;

const styles = StyleSheet.create({});
