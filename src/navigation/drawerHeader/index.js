import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';

import {Appbar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import biopacklogo from '../../../assets/images/logo.png';
import cartIcon from '../../../assets/images/icons/cart_beg.png';

import {useSelector, useDispatch} from 'react-redux';

import styles from './styles';

const NavigationDrawerHeader = props => {
  const cartproduct = useSelector(state => state.product);

  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={styles.topBarContainer}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Ionicons name="menu" size={30} style={styles.leftIcon} />
      </TouchableOpacity>
      <View style={styles.topbarlogoContainer}>
        <Image source={biopacklogo} style={styles.logo} />
      </View>

      <TouchableOpacity
        style={styles.cartIconContainer}
        onPress={() => props.navigationProps.navigate('cart')}>
        {cartproduct.length > 0 ? (
          <View style={styles.cartItemCountContainer}>
            <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
          </View>
        ) : (
          <></>
        )}
        <Image source={cartIcon} />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;
