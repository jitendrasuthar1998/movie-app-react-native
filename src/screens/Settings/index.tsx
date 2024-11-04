// Import essential components and libraries
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { images } from '../../../assets'; // Import images for user profile
import { useTheme, Text, Switch } from 'react-native-paper'; // Theme and UI components
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { RootState } from '../../redux/store'; // Redux store's RootState type
import { logoutUser } from '../../redux/userSlice'; // Action to log out user
import { toggleTheme } from '../../redux/themeSlice'; // Action to toggle theme
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Icons for UI elements

// Main settings screen component displaying user account and theme settings
const Settings = () => {
  const theme = useTheme(); // Access theme colors and settings

  // Retrieve user data and current theme mode from Redux store
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.isDarkTheme
  );

  const dispatch = useDispatch();

  // Dispatch logout action to log out user
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Toggle theme between light and dark mode
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <View style={styles.settingsContainer}>
      {/* Configure StatusBar to align with current theme */}
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
      />

      {/* Profile section with user image, name, email, and logout option */}
      <View style={styles.accountInfoContainer}>
        <Image
          source={images.StelleImg} // Display user profile image
          resizeMode="cover"
          style={styles.profileImg}
        />
        {/* Container for user's name and email */}
        <View style={styles.nameEmailContainer}>
          <Text style={styles.username}>{currentUser?.username}</Text>
          <Text style={styles.email}>{currentUser?.email}</Text>
        </View>
        {/* Logout button */}
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.commonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Account option section with icon and label */}
      <View style={styles.optionContainer}>
        <MaterialCommunityIcons
          name="account-cog" // Account settings icon
          color={theme.colors.onBackground}
          size={24}
        />
        <Text style={[styles.commonText, { color: theme.colors.onBackground }]}>
          Account
        </Text>
      </View>

      {/* Appearance option with icon, label, and theme toggle switch */}
      <View style={styles.optionContainer}>
        <MaterialCommunityIcons
          name="play-circle" // Appearance settings icon
          color={theme.colors.onBackground}
          size={24}
        />
        <Text style={[styles.commonText, { color: theme.colors.onBackground }]}>
          Appearance
        </Text>
        <Switch value={isDarkTheme} onChange={handleTheme} />{' '}
        {/* Theme toggle */}
      </View>

      {/* Help option with icon and label */}
      <View style={styles.optionContainer}>
        <MaterialCommunityIcons
          name="help-circle" // Help icon
          color={theme.colors.onBackground}
          size={24}
        />
        <Text style={[styles.commonText, { color: theme.colors.onBackground }]}>
          Help
        </Text>
      </View>
    </View>
  );
};

export default Settings;

// Styles for consistent layout and spacing
const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    paddingVertical: 10,
    gap: 10, // Gap between sections
  },
  accountInfoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row', // Align items in a row
    alignItems: 'center',
    gap: 10,
  },
  profileImg: { height: 90, width: 90, borderRadius: 50 }, // Circular profile image
  nameEmailContainer: {
    height: 49,
    width: 157,
  },
  username: { fontFamily: 'Inter-SemiBold', fontSize: 18 }, // Username text styling
  email: { fontFamily: 'Inter-Regular', fontSize: 14 }, // Email text styling
  commonText: { fontFamily: 'Inter-SemiBold', fontSize: 14 }, // General text styling
  optionContainer: {
    height: 44,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row', // Row layout for icon and text
    gap: 10,
    alignItems: 'center',
  },
});
