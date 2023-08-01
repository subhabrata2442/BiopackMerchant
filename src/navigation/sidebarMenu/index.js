import React, {useState, useEffect} from 'react';
import {View, Text, Alert, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";

const CustomSidebarMenu = (props) => {
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreaters, dispatch);



  _retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("authUser");
      if (value !== null) {
        let user = JSON.parse(value);
        console.log("name:", user.name);
        setUserName(user.name);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _retrieveUserData();
  }, []);


  // const handleLogout = async () => {
  //  await AsyncStorage.removeItem("authUser");
  //  //props.navigationProps.jumpTo("login");
  //  //logout();
  //  props.navigation.navigate("login");
  // };

  const handleLogout = () => {
    Alert.alert("Logging out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Agree",
        onPress: () => {
          AsyncStorage.removeItem("authUser");
          //logout();
          props.navigation.navigate("login");
        },
      },
    ]);
  };


  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../../../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={require('../../../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
             {userName != '' ? userName : null}
          </Text>
          <View style={{flexDirection: 'row'}}>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        {/* <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>handleLogout()} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#307ecc',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#307ecc',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: 'red',
    marginTop: 15,
  },
});
