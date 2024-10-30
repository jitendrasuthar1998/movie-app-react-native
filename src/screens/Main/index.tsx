import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Main = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} hidden />
      <Text>Main</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
