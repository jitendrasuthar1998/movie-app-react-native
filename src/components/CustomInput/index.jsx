import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { TextInput,Text, useTheme } from "react-native-paper";


const CustomInput = ({ value, setValue, label, leftIcon, rightIcon }) => {
  const [textColor, setTextColor] = React.useState("");

  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  return (
    <View style={{height:72}}>
    <TextInput
      label={label}
      value={value}
      textColor={textColor}
      style={{height:54, fontSize:14, fontFamily:"Roboto-Regular"}}
      // placeholder="User Name"
      onFocus={() => {
        setTextColor("#32A873");
        setIsFocused(true);
      }}
      onBlur={() => {
        setTextColor("white");
        setIsFocused(false);
      }}
      mode="outlined"
      // outlineColor={isFocused ? "green" : "red"}
      left={leftIcon ? <TextInput.Icon icon={() => leftIcon} /> : null}
      right={rightIcon ? <TextInput.Icon icon={() => rightIcon} /> : null}
      onChangeText={(text) => setValue(text)}
    />
    <Text style={{fontFamily:'Roboto-Regular', fontSize:12, lineHeight:16}}>{!isFocused && "Inactive"}</Text>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
