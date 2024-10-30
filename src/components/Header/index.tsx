import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

type HeaderProps = {
  title: string;
  size: number;
};

const Header: React.FC<HeaderProps> = ({ title, size }) => {
  return <Text style={[styles.text, { fontSize: size }]}>{title}</Text>;
};

export default Header;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
