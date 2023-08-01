import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants';
import UserProfileScreen from '../../screens/profile/UserProfileScreen';

import HomeScreenDrawer from '../../screens/homeScreen/HomeScreenDrawer';
import CategoriesScreen from '../../screens/categoryScreen/index';
import SettingsScreen from '../../screens/settingsScreen/index';
import userIcon from '../../../assets/icons/bar_profile_icon.png';
import userIconActive from '../../../assets/icons/bar_profile_icon_active.png';

const Tab = createBottomTabNavigator();

const Tabs = ({navigation, route}) => {
  const {user} = route.params;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({focused}) => {
          let routename = route.name;
          if (routename == 'categories') {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Ionicons name="apps" size={29} color={colors.primary} />
                ) : (
                  <Ionicons name="apps" size={29} color={colors.muted} />
                )}
              </TouchableOpacity>
            );
          } else if (routename == 'user') {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Image
                    source={userIconActive}
                    style={StyleSheet.tabIconStyle}
                  />
                ) : (
                  <Image source={userIcon} style={StyleSheet.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          }
        },

        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        },
      })}>
      <Tab.Screen
        name="HomeScreenDrawer"
        component={HomeScreenDrawer}
        initialParams={{user: user}}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoriesScreen}
        initialParams={{user: user}}
      />
      {/* <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="user"
        component={UserProfileScreen}
        initialParams={{user: user}}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 10,
    height: 10,
  },
});
