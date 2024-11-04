import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type CustomInputProps = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  label,
  leftIcon,
  isPassword = false,
}) => {
  const [textColor, setTextColor] = React.useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword); // Hide password initially if it's a password field

  const theme = useTheme();

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label={label}
        value={value}
        textColor={textColor}
        style={styles.input}
        secureTextEntry={!isPasswordVisible}
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
        right={
          isPassword ? (
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                  {isPasswordVisible ? (
                    <MaterialCommunityIcons
                      name="eye"
                      size={20}
                      color={theme.colors.primary}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off"
                      size={20}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          ) : null
        }
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
