import { StyleSheet, TextInput, View, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Search = () => {
  const theme = useTheme();

  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );

  const [searchText, setSearchText] = useState('');

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          minWidth: 320,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          borderRadius: 28,
          height: 56,
          backgroundColor: '#2B2930',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <TextInput
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={{
            fontSize: 16,
            color: theme.colors.primary,
            fontWeight: '400',
          }}
          placeholder="Search for a title"
          placeholderTextColor={theme.colors.primary}
        />
        <Ionicons name={'search'} size={24} color={theme.colors.primary} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
