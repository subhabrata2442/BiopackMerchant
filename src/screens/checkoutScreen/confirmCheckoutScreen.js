import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
  Button,
  Image,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, network} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';
import {bindActionCreators} from 'redux';
import ProgressDialog from 'react-native-progress-dialog';
import styles from './styles2';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import UserAddressList from '../../Components/UserAddressList';
import {scale} from 'react-native-size-matters';
import SelectAble from '../../Components/SelectAble';
//import Modal, {ModalProps} from 'react-native-modal';
import Modal from 'react-native-modal';

import paymentWaitingIcon from '../../../assets/images/paymentWaiting.png';

const CheckoutScreen = ({navigation, route}) => {
  const {cartPayment} = route.params;

  const [appState, setAppState] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState('Placing Order...');
  const cartproduct = useSelector(state => state.product);

  const dispatch = useDispatch();
  const {emptyCart} = bindActionCreators(actionCreaters, dispatch);

  const [flatShippingRate, setFlatShippingRate] = useState(0);
  const [vatCost, setVatCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalGrossCost, setTotalGrossCost] = useState(0);

  const [promoCode, setPromoCode] = useState('');
  const [promeAmount, setPromeAmount] = useState('');
  const [promeType, setPromeType] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const [address, setAddress] = useState('');
  const [addressHeadTitle, setAddressHeadTitle] = useState('Add New Address');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [landmark, setLandmark] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [addressId, setAddressId] = useState('');
  const [isDefault, setIsDefault] = useState(0);

  const [userAddress, setUserAddress] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const [currentCount, setCount] = useState(1);
  const [intervalId, setIntervalId] = useState(1);

  const [orderId, setOrderId] = useState(21);

  //console.log(cartproduct[0].sellerId);
  const onSelect = item => {
    setSelectedAddress(item.id);
  };

  const handleAddAddress = async () => {
    setAddressHeadTitle('Add New Address');
    setAddressId('');
    setFullName('');
    setMobileNumber('');
    setCity('');
    setState('');
    setCountry('');
    setLandmark('');
    setStreetAddress('');
    setStreetAddress2('');
    setZipcode('');
    setIsDefault(0);
    setModalVisible(true);
  };

  const handleBackClick = () => {
    console.log('stop', intervalId);
    clearInterval(intervalId);
    navigation.goBack();
  };

  const handlePaymentClose = () => {
    setIsPaymentModalVisible(false);
  };

  //method to handle checkout
  const handleCheckPaymentStatus = async order_id => {
    let token = await AsyncStorage.getItem('authUserToken');
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/check-payment-status/' + order_id;

    var timeleft = 200;
    const interval = setInterval(async () => {
      if (timeleft <= 0) {
        clearInterval(interval);
      }

      try {
        const response = await axios.get(apiUrl, requestOptions);
        //console.warn(response.data.payment_status);
        if (response.status === 200) {
          if (response.data.payment_status == 'Payment_Received') {
            clearInterval(interval);
            emptyCart('empty');
            navigation.replace('orderconfirm');
          }
        }
      } catch (error) {
        //console.log('error');
      }
      setIntervalId(interval);
      console.log('start', 30 - timeleft);
      timeleft -= 1;
    }, 2000);
  };

  const handleCheckout3 = async () => {
    Linking.openURL('https://faveping.com/test-payment');
  };

  const handleCheckout = async () => {
    if (userAddress.length == 0) {
      Alert.alert('Error!', 'Please add shipping address');
      return;
    }
    if (!selectedAddress) {
      Alert.alert('Error!', 'Please Select address');
      return;
    }

    setLoaderTitle('Please wait for payment response...');
    setIsloading(true);

    var payload = [];
    var totalamount = 0;

    // setTimeout(() => {
    //   setIsloading(false);
    //   emptyCart('empty');
    //   navigation.replace('orderconfirm');
    // }, 2000);

    // fetch the cart items from redux and set the total cost
    cartproduct.forEach(product => {
      let obj = {
        sellerId: product.sellerId,
        productId: product.productId,
        packSize: product.size,
        sizeId: product.sizeId,
        PackSizeId: product._id,
        name: product.title,
        image: product.image,
        unitePrice: product.unitPrice,
        totalPrice: product.price,
        //quantity: product.quantity,
        dimensions: product.subTitle,
      };
      totalamount += parseInt(product.price);
      payload.push(obj);
    });

    var couponObj = {
      coupon_code: promoCode,
      discount_type: promeType,
      coupon_value: promeAmount,
      coupon_discount: discountAmount,
    };

    //console.warn(shippingAddress);

    const userDetails = await AsyncStorage.getItem('authUser');
    let userInfo = JSON.parse(userDetails);

    var raw = JSON.stringify({
      amount: totalamount,
      discount: couponObj,
      sellerId: cartproduct[0].sellerId,
      payment_type: 'online',
      status: 'pending',
      userId: userInfo.id,
      currency: 'USD',
      shippingAddressId: selectedAddress,
      backUrl: 'biopackapp://back-to-app',
      items: payload,
    });

    let token = await AsyncStorage.getItem('authUserToken');

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const apiUrl = network.serverip + '/payment';

    //handleCheckPaymentStatus();

    //console.log(raw);

    try {
      const response = await axios.post(apiUrl, raw, requestOptions);
      console.log(response.data);
      setIsloading(false);
      setOrderId(response.data.payment.order_id);
      const order_id = response.data.payment.order_id;
      handleCheckPaymentStatus(order_id);
      setIsPaymentModalVisible(true);
      setTimeout(() => {
        Linking.openURL(response.data.payment.payment_link);
      }, 1000);

      //console.warn(response.data.payment.order_id);
    } catch (error) {
      setIsloading(false);
      Alert.alert('Error!', 'Something error occurs');
    }

    //var myHeaders = new Headers();

    //console.log('Checkout:');

    // myHeaders.append('x-auth-token', user.token);
    // myHeaders.append('Content-Type', 'application/json');

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // };

    // fetch(network.serverip + '/checkout', requestOptions) //API call
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log('Checkout=>', result);
    //     if (result.err === 'jwt expired') {
    //       setIsloading(false);
    //       logout();
    //     }
    //     if (result.success == true) {
    //       setIsloading(false);
    //       emptyCart('empty');
    //       navigation.replace('orderconfirm');
    //     }
    //   })
    //   .catch(error => {
    //     setIsloading(false);
    //     console.log('error', error);
    //   });
  };

  const getUserAddress = async () => {
    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/customer-address-list';
    const res = await axios.get(apiUrl, config);
    const addressList = await res.data.address;

    if (addressList.length > 0) {
      addressList.map(item => {
        if (item.is_default == 1) {
          setSelectedAddress(item.id);
        }
      });
    }

    //console.warn(selectedAddress);

    // const newArray = originalArray.map((item) => {
    //   // Modify or transform each item as needed
    //   return item * 2;
    // });

    setUserAddress(addressList);
    //console.log(addressList);
  };

  const addAddress = async () => {
    if (!fullName) {
      Alert.alert('Error!', 'Please fill Name');
      return;
    }
    if (!mobileNumber) {
      Alert.alert('Error!', 'Please fill Phone');
      return;
    }
    if (!city) {
      Alert.alert('Error!', 'Please fill City');
      return;
    }
    if (!state) {
      Alert.alert('Error!', 'Please fill State');
      return;
    }
    if (!country) {
      Alert.alert('Error!', 'Please fill Country');
      return;
    }
    if (!streetAddress) {
      Alert.alert('Error!', 'Please fill Street Address');
      return;
    }
    if (!zipcode) {
      Alert.alert('Error!', 'Please fill zip code');
      return;
    }

    const addressData = {
      full_name: fullName,
      mobile_no: mobileNumber,
      address_line_1: streetAddress,
      address_line_2: streetAddress2,
      landmark: landmark,
      city: city,
      state: state,
      country: country,
      pin_code: zipcode,
      is_default: 0,
    };

    setLoaderTitle('Loading...');
    //console.warn(addressData);
    setIsloading(true);
    let token = await AsyncStorage.getItem('authUserToken');
    //setIsloading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };

    const apiAddUrl = network.serverip + '/customer-add-new-address';
    try {
      const response = await axios.post(apiAddUrl, addressData, requestOptions);
      //console.warn(response);
      if (response.status === 200) {
        //setIsloading(false);
        setModalVisible(false);
        handleOnRefresh();
      } else {
        setIsloading(false);
        Alert.alert('Error!', 'Something error occurs ss');
      }
    } catch (error) {
      setIsloading(false);
      Alert.alert('Error!', 'Something error occurs');
    }
  };

  const fetchUser = async () => {
    let authUserObj = await AsyncStorage.getItem('authUser');
    const userdetails = JSON.parse(authUserObj);
    setUserEmail(userdetails.email);
    setUserPhone('+' + userdetails.dial_code + userdetails.phone_no);
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    //setRefreshing(true);
    getUserAddress();
    setIsloading(false);
  };

  //console.warn(userAddress);

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
    //onBackPress(handleBackButtonClick);

    setTotalCost(cartPayment?.totalCost);
    setFlatShippingRate(cartPayment?.shippingRate);
    setVatCost(cartPayment?.vatCost);
    setTotalGrossCost(cartPayment?.totalGrossCost);
    setPromoCode(cartPayment?.promoCode);
    setPromeAmount(cartPayment?.promeAmount);

    if (cartPayment?.promeType == 'percentage') {
      setPromeType(1);
    } else {
      setPromeType(2);
    }
    setDiscountAmount(cartPayment?.discountAmount);

    getUserAddress();
    fetchUser();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={loaderTitle} />

      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            handleBackClick();
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

      <ScrollView style={styles.bodyContainer}>
        <Text style={styles.primaryText}>Order details</Text>
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

        <Text style={styles.primaryText}>Contact</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>{userEmail}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>{userPhone}</Text>
          </View>
        </View>
        <Text style={styles.primaryText}>Payment Method</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Method</Text>
            <Text style={styles.primaryTextSm}>Online</Text>
          </View>
        </View>

        <Text style={styles.primaryText}>Address</Text>
        <View style={styles.listContainer}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => handleAddAddress()}>
            <Text style={styles.secondaryTextSm}>Address</Text>
            <View>
              <Text style={styles.primaryTextSm}>Add</Text>
            </View>
          </TouchableOpacity>

          {userAddress.map((address, index) => (
            <SelectAble
              selected={selectedAddress === address.id}
              onSelect={onSelect}
              item={address}
              key={index}
            />
          ))}
        </View>

        <View style={styles.emptyView}></View>
      </ScrollView>

      {/* <Button title="Show modal" onPress={toggleModal} /> */}

      {/* <View style={styles.container}>
        <Button
          title="Click me"
          onPress={() => {
            Linking.openURL('https://google.com');
          }}
        />
      </View> */}

      <View style={styles.buttomContainer}>
        <CustomButton
          text={'Continue'}
          onPress={() => {
            handleCheckout();
          }}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modelBody}>
          <View style={styles.modelAddressContainer}>
            <View style={styles.modelTextContainer}>
              <Text style={styles.modelText}>{addressHeadTitle}</Text>
            </View>

            <CustomInput
              value={fullName}
              setValue={setFullName}
              placeholder={'Enter Full Nmae'}
            />
            <CustomInput
              value={mobileNumber}
              setValue={setMobileNumber}
              placeholder={'Enter Mobile Number'}
              keyboardType={'phone-pad'}
            />
            <CustomInput
              value={streetAddress}
              setValue={setStreetAddress}
              placeholder={'Enter Street Address'}
            />
            <CustomInput
              value={streetAddress2}
              setValue={setStreetAddress2}
              placeholder={'Enter Address 2'}
            />
            <CustomInput
              value={landmark}
              setValue={setLandmark}
              placeholder={'Enter Landmark'}
            />
            <View style={styles.inputMainContainer}>
              <View style={styles.inputContainer1}>
                <CustomInput
                  value={city}
                  setValue={setCity}
                  placeholder={'Enter City'}
                />
              </View>
              <View style={styles.inputContainer2}>
                <CustomInput
                  value={state}
                  setValue={setState}
                  placeholder={'Enter State'}
                />
              </View>
            </View>
            <View style={styles.inputMainContainer}>
              <View style={styles.inputContainer1}>
                <CustomInput
                  value={country}
                  setValue={setCountry}
                  placeholder={'Enter Country'}
                />
              </View>

              <View style={styles.inputContainer1}>
                <CustomInput
                  value={zipcode}
                  setValue={setZipcode}
                  placeholder={'Enter ZipCode'}
                  keyboardType={'number-pad'}
                />
              </View>
            </View>

            <View style={styles.btnMainContainer}>
              <View style={styles.btnContainer1}>
                <CustomButton
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                  text={'close'}
                />
              </View>
              <View style={styles.btnContainer}>
                <CustomButton
                  onPress={() => {
                    //setModalVisible(!modalVisible);
                    addAddress();
                  }}
                  text={'save'}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={isPaymentModalVisible}
        onBackdropPress={() => setIsPaymentModalVisible(false)}
        onBackButtonPress={() => setIsPaymentModalVisible(false)}
        //swipeDirection="down"
        onSwipeComplete={() => setIsPaymentModalVisible(false)}
        // hideModal={() => setIsModalVisible(false)}
        animationIn="bounceInUp"
        animationInTiming={500}
        animationOut="bounceOutDown"
        animationOutTiming={500}>
        <View style={styles.paymentModalContainer}>
          <View style={styles.paymentModalImageContainer}>
            <Image
              source={paymentWaitingIcon}
              style={styles.paymentModalImage}
            />
          </View>
          <View style={styles.paymentModalHeaderContainer}>
            <Text style={styles.paymentModalHeadertext}>
              COMPLETE YOUR PAYMENT
            </Text>
          </View>
          <View style={styles.paymentModalBody}>
            <View style={styles.paymentModalBodyTextContainer}>
              <Ionicons name="card-outline" size={15} color={colors.primary} />
              <Text style={styles.paymentModalBodyText}>
                Go to Bhim App or your Bank app linked with UPI 1D.
              </Text>
            </View>
            <View style={styles.paymentModalBodyTextContainer}>
              <Ionicons name="timer-outline" size={15} color={colors.primary} />
              <Text style={styles.paymentModalBodyText}>
                Check pending transactions
              </Text>
            </View>
            <View style={styles.paymentModalBodyTextContainer}>
              <Ionicons name="card-outline" size={15} color={colors.primary} />
              <Text style={styles.paymentModalBodyText}>
                Complete the payment by selecting the bank and entering the UPI
                PIN
              </Text>
            </View>

            <View style={styles.paymentModalFooter}>
              <View style={styles.paymentModalBodyTextContainer}>
                <Ionicons
                  name="information-circle-outline"
                  size={15}
                  color={colors.primary}
                />

                <Text style={styles.paymentModalBodyText}>
                  If you have entered the UPI ID of friends or family, they wil
                  need to authorize the payment from their BHIM or Bank UPI app.
                </Text>
              </View>
              <View style={styles.paymentModalFooterTextContainer}>
                <Text style={styles.paymentModalFooterText}>
                  This request will automatically expire in 10 minutes.
                </Text>

                <View style={styles.buttomContainer}>
                  <CustomButton
                    text={'ok'}
                    onPress={() => {
                      handlePaymentClose();
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
