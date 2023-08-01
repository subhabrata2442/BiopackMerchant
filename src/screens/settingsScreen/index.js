import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import NavigationDrawerHeader from '../../navigation/drawerHeader/Header2';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
      <NavigationDrawerHeader navigationProps={navigation} />

      <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is the Settings Screen
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
