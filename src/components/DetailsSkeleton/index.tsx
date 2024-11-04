import { StyleSheet, View } from 'react-native';
import React from 'react';

import { useTheme } from 'react-native-paper';
import LoadingRect from './LoadingRect';

const DetailsSkeleton = () => {
  const theme = useTheme();
  // console.log('movie data', data);

  return (
    <>
      <LoadingRect
        width={'100%'}
        height={200}
        backgroundColor={theme.colors.onBackground}
      />

      <View style={{ paddingHorizontal: 10, gap: 10 }}>
        <LoadingRect
          width={'100%'}
          height={30}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          width={'100%'}
          height={20}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          width={'100%'}
          height={100}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          width={'100%'}
          height={20}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          width={'100%'}
          height={20}
          backgroundColor={theme.colors.onBackground}
        />
        <LoadingRect
          width={'100%'}
          height={20}
          backgroundColor={theme.colors.onBackground}
        />
      </View>
    </>
  );
};

export default DetailsSkeleton;

const styles = StyleSheet.create({});
