import {StyleSheet, Image, Text, View, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import SuccessImage from '../../../assets/images/success.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../Components/CustomButton';
import {colors, network} from '../../constants';

const OrderConfirmScreen = ({navigation}) => {
  const [user, setUser] = useState({});

  //method to get authUser from async storage
  const getUserData = async () => {
    const value = await AsyncStorage.getItem('authUser');
    setUser(JSON.parse(value));
  };

  //fetch user data on initial render
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.containerSection}>
        <View style={styles.imageConatiner}>
          <Image source={SuccessImage} style={styles.Image} />
        </View>
        <View style={styles.secondaryTextContaner}>
          <Text style={styles.secondaryText}>Order has be confirmed</Text>
        </View>
        <View>
          <CustomButton
            text={'Back to Home'}
            onPress={() => navigation.replace('tab', {user: user})}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderConfirmScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    flex: 1,
  },
  containerSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageConatiner: {
    marginBottom: 30,
  },
  Image: {
    width: 120,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  secondaryTextContaner: {
    marginBottom: 20,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
