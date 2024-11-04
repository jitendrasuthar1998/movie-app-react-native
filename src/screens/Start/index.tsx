import {
  createBottomTabNavigator,
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Settings from '../Settings';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../Home';
import Search from '../Search';
import Favorite from '../Favorites';
import { useTheme } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';

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

const MyTabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
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
      }}
    >
      {state.routes.map((route, index) => {
        let iconName: 'home' | 'search' | 'heart' | 'settings' = 'home';

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

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
            style={{
              height: 44,
              width: 44,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
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

const Start: React.FC = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
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
