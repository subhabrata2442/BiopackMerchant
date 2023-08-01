import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {colors, network} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';
import {bindActionCreators} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import CustomInput from "../../components/CustomInput";
import ProgressDialog from 'react-native-progress-dialog';
import Loader from '../../Components/Loader';
import styles from './styles';
import BasicProductList from '../../Components/BasicProductList/BasicProductList';
import CustomButton from '../../Components/CustomButton';
import OptionList from '../../Components/OptionList/OptionList';
import ShoppingCartService from '../../Components/ShoppingCartService/ShoppingCartService';

const CheckoutScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const cartproduct = useSelector(state => state.product);
  const dispatch = useDispatch();
  const {emptyCart} = bindActionCreators(actionCreaters, dispatch);

  const [flatShippingRate, setFlatShippingRate] = useState(0);
  const [vatCost, setVatCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalGrossCost, setTotalGrossCost] = useState(0);

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const [promoCode, setPromoCode] = useState('');
  const [promoTitle, setPromoTitle] = useState('');
  const [promeAmount, setPromeAmount] = useState(0);
  const [promeType, setPromeType] = useState('percentage');
  const [discountAmount, setDiscountAmount] = useState(0);

  //console.warn(isFocused);

  //method to remove the authUser from aysnc storage and navigate to login
  const logout = async () => {
    await AsyncStorage.removeItem('authUser');
    navigation.replace('login');
  };

  //method to handle checkout
  const handleContinueCheckout = () => {
    const paymentObj = {
      totalCost: totalCost,
      shippingRate: flatShippingRate,
      vatCost: vatCost,
      discountAmount: discountAmount,
      totalGrossCost: totalGrossCost,
      promoCode: promoCode,
      promeType: promeType,
      promeAmount: promeAmount,
    };

    navigation.navigate('confirmCheckout', {cartPayment: paymentObj});
  };
  const handleCoupon = () => {
    navigation.navigate('coupon');
  };

  const clearPromoCode = () => {
    console.warn('test test');
    setPromoCode('');
  };

  const fetchShippingDetails2 = async () => {
    let token = await AsyncStorage.getItem('authUserToken');

    var payload = [];
    cartproduct.forEach(product => {
      let obj = {
        sellerId: product.sellerId,
        productId: product.productId,
        packSize: product.size,
        sizeId: product.sizeId,
        PackSizeId: product._id,
        unitePrice: product.unitPrice,
        totalPrice: product.price,
      };

      payload.push(obj);
    });
    var raw = JSON.stringify({
      sellerId: cartproduct[0].sellerId,
      items: payload,
    });

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const apiUrl = network.serverip + '/get-shipping-charge';
    const response = await axios.post(apiUrl, raw, requestOptions);
    console.warn(response.data.shipping_price);
  };

  const fetchShippingDetails = async () => {
    setLoading(true);
    const totalSubCost = cartproduct.reduce((accumulator, object) => {
      return accumulator + object.price * object.quantity;
    }, 0);

    var discountAmount = 0;

    let userCoupan = await AsyncStorage.getItem('userCoupan');
    let token = await AsyncStorage.getItem('authUserToken');

    var couponPayload = [];

    if (userCoupan !== null) {
      const userCoupanDetsi = JSON.parse(userCoupan);
      setPromoTitle(userCoupanDetsi.title);
      setPromoCode(userCoupanDetsi.code);
      setPromeAmount(userCoupanDetsi.discount_value);
      setPromeType(userCoupanDetsi.discount_type);

      discountAmount = ShoppingCartService.calculateDiscountAmount(
        userCoupanDetsi.discount_type,
        userCoupanDetsi.discount_value,
        totalSubCost,
      );

      let couponObj = {
        id: userCoupanDetsi.id,
        code: userCoupanDetsi.code,
        discountValue: userCoupanDetsi.discount_value,
        discountType: userCoupanDetsi.discount_type,
      };

      couponPayload.push(couponObj);

      // totalCost + flatShippingRate + vatCost - discountAmount;
    } else {
      setPromoTitle('');
    }
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    var payload = [];

    cartproduct.forEach(product => {
      let obj = {
        sellerId: product.sellerId,
        productId: product.productId,
        packSize: product.size,
        sizeId: product.sizeId,
        PackSizeId: product._id,
        unitePrice: product.unitPrice,
        totalPrice: product.price,
      };

      payload.push(obj);
    });

    var raw = JSON.stringify({
      sellerId: cartproduct[0].sellerId,
      coupon: couponPayload,
      items: payload,
    });

    console.log(raw);

    const apiUrl = network.serverip + '/get-shipping-charge';

    var shippingRate = 0;
    var vatRate = 0;
    try {
      const response = await axios.post(apiUrl, raw, requestOptions);
      setTotalCost(response.data.subtotal);
      setFlatShippingRate(response.data.shipping_price);
      setVatCost(response.data.vat);
      setDiscountAmount(response.data.coupon_amount);
      setTotalGrossCost(response.data.total_pay);

      //console.warn(response.data.shipping_price);
      setLoading(false);
    } catch (error) {
      setFlatShippingRate(0);
      setVatCost(0);
      setLoading(false);
      Alert.alert('Error!', 'Something error occurs');
    }

    //setTotalGrossCost(totalGrossAmount);
  };

  const fetchUser = async () => {
    let authUserObj = await AsyncStorage.getItem('authUser');
    const userdetails = JSON.parse(authUserObj);
    setUserEmail(userdetails.email);
    setUserPhone('+' + userdetails.dial_code + userdetails.phone_no);
  };

  // set the address and total cost on initital render
  useEffect(() => {
    // if (streetAddress && city && country != '') {
    //   setAddress(`${streetAddress}, ${city},${country}`);
    // } else {
    //   setAddress('');
    // }

    // setTotalCost(
    //   cartproduct.reduce((accumulator, object) => {
    //     return accumulator + object.price * object.quantity;
    //   }, 0),
    // );
    //console.warn(totalCost);
    fetchUser();
    fetchShippingDetails();
    //console.warn('ss');
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchShippingDetails();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={'Placing Order...'} />
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
        <View></View>
        <View></View>
      </View>

      <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
        <Text style={styles.primaryText}>Order Summary</Text>
        <View style={styles.orderSummaryMainContainer}>
          <ScrollView
            style={styles.orderSummaryContainer}
            nestedScrollEnabled={true}>
            {cartproduct.map((product, index) => (
              <BasicProductList
                key={index}
                title={product.title}
                image={product.image}
                price={product.price}
                subTitle={product.subTitle}
                packSize={product.size}
                quantity={product.quantity}
              />
            ))}
          </ScrollView>
        </View>

        <Text style={styles.primaryText}>Your cart details</Text>
        <View style={styles.totalOrderInfoContainer}>
          <View style={styles.list}>
            <Text>Sub-Total</Text>
            <Text>${totalCost}</Text>
          </View>

          <View style={styles.list}>
            <Text>Flat Shipping Rate</Text>
            <Text>${flatShippingRate}</Text>
          </View>
          <View style={styles.list}>
            <Text>Vat</Text>
            <Text>${vatCost}</Text>
          </View>
          <View style={styles.list}>
            <Text>Coupon amount </Text>
            <Text>(-)${discountAmount}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.primaryTextSm}>Total pay</Text>
            <Text style={styles.secondaryTextSm}>${totalGrossCost}</Text>
          </View>
        </View>
        <View style={styles.listCouponMainContainer}>
          {promoCode == '' ? (
            <TouchableOpacity
              style={styles.CouponContainer}
              onPress={() => {
                handleCoupon();
              }}>
              <View style={styles.IconContainer}>
                <Ionicons name="gift" size={24} color={colors.primary} />
                <Text style={styles.listText}>Apply coupon</Text>
              </View>
              <View>
                <Ionicons
                  name="arrow-forward"
                  size={24}
                  color={colors.primary}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.ApplyCoupanMainContainer}>
              <View style={styles.ApplyCoupanContainer}>
                <View style={styles.ApplyCoupanTextContainer}>
                  <Text style={styles.ApplyCoupanText}>
                    You save ${discountAmount} with this coupon
                  </Text>
                </View>
                <View style={styles.ApplyCoupanRemoveBtnContainer}>
                  <TouchableOpacity
                    style={styles.CouponRemoveBtn}
                    onPress={() => {
                      clearPromoCode();
                    }}>
                    <View style={styles.CouponBtnRemoveTextContainer}>
                      <Text style={styles.CouponBtnRemoveText}>Remove</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.ApplyCoupanText3}>Coupan Applied</Text>
              <View style={styles.CouponBtnMainContainer}>
                <TouchableOpacity
                  style={styles.CouponBtnContainer}
                  onPress={() => {
                    handleCoupon();
                  }}>
                  <View style={styles.CouponBtnTextContainer}>
                    <Text style={styles.CouponBtnTex}>View all coupons</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      color={colors.dark}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {/* <Text style={styles.primaryText}>Contact</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>{userEmail}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>{userPhone}</Text>
          </View>
        </View> */}
      </ScrollView>
      <View style={styles.buttomContainer}>
        <CustomButton
          text={'Continue'}
          onPress={() => {
            handleContinueCheckout();
          }}
        />
      </View>
    </View>
  );
};

export default CheckoutScreen;
