import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

type CustomButtonProps = {
  mode: string;
  title: string;
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  mode,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        borderRadius: 4,
        height: 52,
        maxWidth: 328,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: mode != 'outlined' ? '#32A873' : '',
        borderColor: mode === 'outlined' ? '#32A873' : '',
        borderWidth: mode === 'outlined' ? 1 : 0,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          lineHeight: 20,
          fontFamily: 'Inter-Bold',
          color: mode === 'outlined' ? '#32A873' : 'black',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
