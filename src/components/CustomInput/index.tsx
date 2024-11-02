import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Text, useTheme } from 'react-native-paper';

type CustomInputProps = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  label,
  leftIcon,
  rightIcon,
}) => {
  const [textColor, setTextColor] = React.useState('');

  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label={label}
        value={value}
        textColor={textColor}
        style={styles.input}
        onFocus={() => {
          setTextColor('#32A873');
          setIsFocused(true);
        }}
        onBlur={() => {
          setTextColor(theme.colors.onBackground);
          setIsFocused(false);
        }}
        mode="outlined"
        outlineColor={theme.colors.onBackground}
        left={leftIcon ? <TextInput.Icon icon={() => leftIcon} /> : null}
        right={rightIcon ? <TextInput.Icon icon={() => rightIcon} /> : null}
        onChangeText={(text) => setValue(text)}
      />
      <Text style={styles.caption}>{!isFocused && 'Inactive'}</Text>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    height: 72,
  },
  input: {
    height: 54,
    width: '100%',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  caption: { fontFamily: 'Roboto-Regular', fontSize: 12, lineHeight: 16 },
});
