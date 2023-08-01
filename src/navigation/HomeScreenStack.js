import React from 'react';


import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from '../screens/homeScreen/index';
import SettingsScreen from '../screens/settingsScreen/index';
import CategoriesScreen from '../screens/categoryScreen/index';
import ProductDetailScreen from "../screens/productScreen/ProductDetailScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabStack = ({ navigation, route }) => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.primary,
      tabBarStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.white,
      },
    })}
  > 
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoriesScreen}
        initialParams={{ user: 1 }}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <Ionicons name="apps" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="productdetail" component={ProductDetailScreen} />
      
    </Stack.Navigator>
  );
};

export default HomeScreenStack;
