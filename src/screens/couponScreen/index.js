import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
  SectionList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons';
import cartIcon from '../../../assets/images/icons/cart_beg_active.png';
import productImg from '../../../assets/images/items/catagory-6.jpg';
import {colors, network} from '../../constants';
import CartProductList from '../../Components/CartProductList/index';
import {useSelector, useDispatch} from 'react-redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';
import {bindActionCreators} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader';
import CustomAlert from '../../Components/CustomAlert/CustomAlert';
import CouponsList from '../../Components/CartCouponsList/CartCouponsList';

const CouponScreen = ({navigation}) => {
  const cartproduct = useSelector(state => state.product);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [coupons, setcoupons] = useState([]);
  const [couponId, setCouponId] = useState('');

  //const userDetails = AsyncStorage.getItem('authUser');

  //console.warn(userDetails);

  const handleApplyCoupon = async item => {
    AsyncStorage.setItem('userCoupan', JSON.stringify(item));
    navigation.navigate('checkout');
    //const userDetails = await AsyncStorage.getItem('userCoupan');
    //console.warn(userDetails);
  };

  //fetch order from server using API call
  const fetchCoupons = async () => {
    let token = await AsyncStorage.getItem('authUserToken');

    const userCoupan = await AsyncStorage.getItem('userCoupan');
    if (userCoupan !== null) {
      const userCoupanDetsi = JSON.parse(userCoupan);
      //console.warn(userCoupanDetsi.id);
      setCouponId(userCoupanDetsi.id);
    }

    let sellerId = cartproduct[0].sellerId;

    //console.warn(userCoupan);

    setLoading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/seller-coupon-list/' + sellerId;
    const res = await axios.get(apiUrl, requestOptions);
    const couponsList = await res.data.coupons;
    //console.log(couponsList);
    setcoupons(couponsList);
    setLoading(false);
  };

  //console.warn(cartproduct.length);

  //method to increase the quantity of the item in(cart) redux
  const increaseQuantity = (id, quantity, avaiableQuantity) => {
    if (avaiableQuantity > quantity) {
      increaseCartItemQuantity({id: id, type: 'increase'});
      setRefresh(!refresh);
    }
  };

  //method to decrease the quantity of the item in(cart) redux
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      decreaseCartItemQuantity({id: id, type: 'decrease'});
      setRefresh(!refresh);
    }
  };

  //calcute and the set the total price whenever the value of carproduct change
  useEffect(() => {
    //console.warn('coupon');
    fetchCoupons();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <Loader loading={loading} />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>
        <View style={styles.topbarTextContainer}>
          <Text style={styles.screenNameText}>Coupons for You </Text>
        </View>
        {/* <TouchableOpacity onPress={() => handleOnRefresh()}>
          <Ionicons name="cart-outline" size={30} color={colors.primary} />
        </TouchableOpacity> */}
      </View>

      {/* <CustomAlert message={error} type={alertType} /> */}
      {coupons.length == 0 ? (
        <View style={styles.ListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>
            "There are no coupons yet."
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{flex: 1, width: '100%', padding: 20}}
          showsVerticalScrollIndicator={false}>
          {coupons.map((item, index) => {
            return (
              <CouponsList
                item={item}
                key={index}
                couponId={couponId}
                onPress={() => handleApplyCoupon(item)}
              />
            );
          })}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
    </View>
  );
};

export default CouponScreen;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topbarTextContainer: {
    //display: 'flex',
    //justifyContent: 'center',
    alignItems: 'center',
    //height: 20,
    marginLeft: 50,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: '600',
  },
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  screenNameText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.dark,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  bodyContainer: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  emptyView: {
    height: 20,
  },
  ListContiainerEmpty: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: 'italic',
    fontSize: 15,
    color: colors.muted,
  },
  primaryMainBtn: {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,

    // padding: 20,
    // paddingTop: 0,
    // paddingBottom: 0,
    // width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
  },
  modelBody: {
    flex: 1,
    display: 'flex',
    flexL: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelAddressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    elevation: 3,
  },
  modelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  inputMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer1: {
    width: '50%',
    //left: -1,
  },
  inputContainer2: {
    width: '50%',
    //right: -5,
  },
  btnMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    //alignItems: 'center',
  },
  btnContainer1: {
    position: 'relative',
    left: -5,
    width: '50%',
  },
  btnContainer: {
    position: 'relative',
    right: -5,
    width: '50%',
  },
});
