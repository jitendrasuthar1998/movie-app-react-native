// Import required modules and components from libraries and project files
import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

// bottom tab bar item screens
import Home from '../Home';
import Search from '../Search';
import Favorite from '../Favorites';
import Settings from '../Settings';

// Create a Bottom Tab Navigator instance for managing tab-based navigation
const Tab = createBottomTabNavigator();

type MyTabBarProps = BottomTabBarProps & {
  state: TabNavigationState<ParamListBase>;
  descriptors: {
    [key: string]: {
      options: BottomTabNavigationOptions;
    };
  };
  navigation: NavigationHelpers<ParamListBase>;
};

// Custom Tab Bar Component to provide a styled tab bar with icons and labels
const MyTabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  // Retrieve the current theme for consistent styling
  const theme = useTheme();

  return (
    <View
      style={[
        styles.tabBarContainer,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {state.routes.map((route, index) => {
        // Define icon name based on the route name
        let iconName: 'home' | 'search' | 'heart' | 'settings' = 'home';

        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Define onPress handler to navigate to the selected tab
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          // Only navigate if the tab is not already focused
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        // Define onLongPress handler for potential future functionality
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Assign appropriate icon name based on the route name
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Search':
            iconName = 'search';
            break;
          case 'Favorites':
            iconName = 'heart';
            break;
          case 'Settings':
            iconName = 'settings';
            break;
        }

        // Set the icon color based on the tab's focus state
        const color = isFocused ? theme.colors.primary : '#BBBBBB';

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItemContainer}
          >
            {/* Render icon and label for each tab */}
            <Ionicons name={iconName} size={20} color={color} />
            <Text
              style={{ color: color, fontFamily: 'Inter-Medium', fontSize: 10 }}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Main Component for bottom tab navigation
const Start: React.FC = () => {
  const theme = useTheme(); // Retrieve theme for header styling

  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />} // Custom tab bar component
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 4,
          borderBottomColor: '#434343',
          borderBottomWidth: 0.2,
          shadowColor: '#434343',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        headerTitleStyle: {
          color: theme.colors.onBackground,
          fontFamily: 'Inter-Bold',
          fontSize: 18,
        },
      }}
    >
      {/* Define each tab with its respective screen */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorite} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Start;

// Styling for custom tab bar and items
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#434343',
    borderTopWidth: 0.3,
    justifyContent: 'center',
    gap: 32,
    paddingVertical: 4,
    shadowColor: '#434343',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  tabBarItemContainer: {
    height: 44,
    width: 44,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
