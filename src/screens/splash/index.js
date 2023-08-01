import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("authUser");
      if (value !== null) {
        navigation.replace("tab", { user: JSON.parse(value) });
      } else {
        setTimeout(() => {
          navigation.replace("login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/splash-logo.png')}
        style={{width: '90%', resizeMode: 'contain',margin:30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#000"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
