import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

import NavigationDrawerHeader from '../../navigation/drawerHeader/index';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
       <ScrollView style={{padding: 20}}>
        {/* <NavigationDrawerHeader/> */}

       <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Hello John Doe dd
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../../../assets/images/user-profile.jpg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>

       </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;