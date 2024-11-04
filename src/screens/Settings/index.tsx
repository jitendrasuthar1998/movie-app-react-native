import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { images } from '../../../assets';
import { useTheme, Text, Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logoutUser } from '../../redux/userSlice';
import { toggleTheme } from '../../redux/themeSlice';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Settings = () => {
  const theme = useTheme();

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Image
          source={images.StelleImg}
          resizeMode="cover"
          style={{ height: 90, width: 90, borderRadius: 50 }}
        />
        <View
          style={{
            height: 49,
            width: 157,
          }}
        >
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 18 }}>
            {currentUser?.username}
          </Text>
          <Text style={{ fontFamily: 'Inter-Regular', fontSize: 14 }}>
            {currentUser?.email}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 44,
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="account-cog"
          color={theme.colors.onBackground}
          size={24}
        />
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 14,
            fontFamily: 'Inter-SemiBold',
          }}
        >
          Account
        </Text>
      </View>

      <View
        style={{
          height: 44,
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="play-circle"
          color={theme.colors.onBackground}
          size={24}
        />
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 14,
            fontFamily: 'Inter-SemiBold',
          }}
        >
          Appearance
        </Text>
        <Switch value={isDarkTheme} onChange={handleTheme} />
        <Text>{isDarkTheme ? 'Dark' : 'Light'}</Text>
      </View>

      <View
        style={{
          height: 44,
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <MaterialCommunityIcons
          name="help-circle"
          color={theme.colors.onBackground}
          size={24}
        />
        <Text
          style={{
            color: theme.colors.onBackground,
            fontSize: 14,
            fontFamily: 'Inter-SemiBold',
          }}
        >
          Help
        </Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
