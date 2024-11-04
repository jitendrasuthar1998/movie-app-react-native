import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoadingRect from '../DetailsSkeleton/LoadingRect';
import { useTheme } from 'react-native-paper';

const SearchSkeleton = () => {
  const theme = useTheme();
  return (
    <>
      {[1, 2, 3, 4].map((index) => (
        <LoadingRect
          key={index}
          height={100}
          style={{ borderRadius: 10 }}
          width={'100%'}
          backgroundColor={theme.colors.onBackground}
        />
      ))}
    </>
  );
};

export default SearchSkeleton;

const styles = StyleSheet.create({});
