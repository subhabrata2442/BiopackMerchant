import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Import Screens
import SplashScreen from '../screens/splash/index';
import LoginScreen from '../screens/auth/login/index';
import RegisterScreen from '../screens/auth/signup/index';
import UserOTP from '../screens/auth/signup/UserOTP';
import BuisnessDetails from '../screens/auth/signup/BuisnessDetails';
import MainNaviagtor from '../navigation/MainNaviagtor';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="BuisnessDetails"
        component={BuisnessDetails}
        options={{
          title: 'Buisness Details',
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="UserOTP"
        component={UserOTP}
        options={{
          title: 'Otp Verification',
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AuthNavigatior = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MainNaviagtor"
        component={MainNaviagtor}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigatior;
