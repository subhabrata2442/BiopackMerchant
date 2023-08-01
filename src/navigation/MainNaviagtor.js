import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';


import Ionicons from 'react-native-vector-icons/Ionicons'

// Import Screens
import SettingsScreen from '../screens/settingsScreen/index';
import CustomSidebarMenu from '../navigation/sidebarMenu/index';

import HomeScreenStack from '../navigation/HomeScreenStack';



const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}
      >
      <Drawer.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}

      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
