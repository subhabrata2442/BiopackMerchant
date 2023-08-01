import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {colors, network} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomAlert from '../../Components/CustomAlert/CustomAlert';
import ProgressDialog from 'react-native-progress-dialog';
import AddressList from '../../Components/AddressList/AddressList';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAddressScreen = ({navigation, route}) => {
  const {user} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState('Please wait...');
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [error, setError] = useState('');
  const [address, setAddress] = useState([]);
  const [UserInfo, setUserInfo] = useState({});

  const [addressHeadTitle, setAddressHeadTitle] = useState('Add New Address');

  const [addressId, setAddressId] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [landmark, setLandmark] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetAddress2, setStreetAddress2] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isDefault, setIsDefault] = useState(0);

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

  const handleEditAddress = items => {
    setAddressHeadTitle('Update Address');
    setAddressId(items?.id);
    setFullName(items?.full_name);
    setMobileNumber(items?.mobile_no);
    setCity(items?.city);
    setState(items?.state);
    setCountry(items?.country);
    setLandmark(items?.address_line_2);
    setStreetAddress(items?.address_line_1);
    setStreetAddress2(items?.address_line_2);
    setZipcode(items?.pin_code);
    setIsDefault(items?.is_default);
    setModalVisible(true);
  };

  const updateAddress = async () => {
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
      is_default: isDefault,
    };
    //console.warn(addressData);
    setIsloading(true);
    let token = await AsyncStorage.getItem('authUserToken');
    //setIsloading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };

    if (addressId != '') {
      const apiUrl = network.serverip + '/customer-address-update/' + addressId;
      try {
        const response = await axios.post(apiUrl, addressData, requestOptions);
        if (response.status === 200) {
          //setIsloading(false);
          setModalVisible(false);
          handleOnRefresh();
        } else {
          setIsloading(false);
          Alert.alert('Error!', 'Something error occurs');
        }
      } catch (error) {
        setIsloading(false);
        Alert.alert('Error!', 'Something error occurs');
      }
    } else {
      const apiAddUrl = network.serverip + '/customer-add-new-address';
      try {
        const response = await axios.post(
          apiAddUrl,
          addressData,
          requestOptions,
        );
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
    }
  };

  //method for alert
  const showDeleteConfirmDialog = id => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this address?',
      [
        {
          text: 'Yes',
          onPress: () => {
            handleDeleteAddress(id);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const handleDeleteAddress = async id => {
    setIsloading(true);
    let token = await AsyncStorage.getItem('authUserToken');
    //setIsloading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/delete-customer-address/' + id;
    try {
      const response = await axios.get(apiUrl, requestOptions);
      //console.warn(response);
      if (response.status === 200) {
        //setIsloading(false);
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

  const showSetDefaultConfirmDialog = id => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to set this default address?',
      [
        {
          text: 'Yes',
          onPress: () => {
            handleSetDefaultAddress(id);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const handleSetDefaultAddress = async id => {
    setIsloading(true);
    let token = await AsyncStorage.getItem('authUserToken');
    //setIsloading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/set-default-customer-address/' + id;
    try {
      const response = await axios.get(apiUrl, requestOptions);
      //console.warn(response);
      if (response.status === 200) {
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

  //method to remove the authUser from aysnc storage and navigate to login
  const logout = async () => {
    await AsyncStorage.removeItem('authUser');
    navigation.replace('login');
  };

  //method to convert the authUser to json object
  const convertToJSON = obj => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };

  //method to convert the authUser to json object and return token
  const getToken = obj => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
      return AsyncStorage.getItem('authUserToken');
    }
    return AsyncStorage.getItem('authUserToken');
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchAddress();
    setRefreshing(false);
  };

  //method to navigate to order detail screen of a specific order
  const handleOrderDetail = item => {
    //console.warn(item);
    // navigation.navigate('myorderdetail', {
    //   orderDetail: item,
    //   Token: UserInfo.token,
    // });
  };

  //fetch order from server using API call
  const fetchAddress = async () => {
    let token = await AsyncStorage.getItem('authUserToken');
    setIsloading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/customer-address-list';
    const res = await axios.get(apiUrl, requestOptions);
    const addressList = await res.data.address;

    setAddress(addressList);
    setError('');
    setIsloading(false);

    //console.warn(UserInfo);

    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow',
    // };

    // fetch(`${network.serverip}/orders`, requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     if (result?.err === 'jwt expired') {
    //       logout();
    //     }
    //     if (result.success) {
    //       setOrders(result.data);
    //       setError('');
    //     }
    //     setIsloading(false);
    //   })
    //   .catch(error => {
    //     setIsloading(false);
    //     setError(error.message);
    //     console.log('error', error);
    //   });
  };

  //convert authUser to Json object and fetch orders on initial render
  useEffect(() => {
    convertToJSON(user);
    fetchAddress();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={label} />
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
        {/* <TouchableOpacity onPress={() => handleOnRefresh()}>
          <Ionicons name="cart-outline" size={30} color={colors.primary} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Shipping Address</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Manage Address</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryMainBtn}
        onPress={() => handleAddAddress()}>
        <View>
          <Text style={styles.primaryTextSm}>Add New Address</Text>
        </View>
      </TouchableOpacity>
      <CustomAlert message={error} type={alertType} />
      {address.length == 0 ? (
        <View style={styles.ListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>
            "There are no orders placed yet."
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{flex: 1, width: '100%', padding: 20}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refeshing}
              onRefresh={handleOnRefresh}
            />
          }>
          {address.map((item, index) => {
            return (
              <AddressList
                item={item}
                key={index}
                handleEditAddress={() => handleEditAddress(item)}
                onPressDelete={() => showDeleteConfirmDialog(item?.id)}
                onPressSet={() => showSetDefaultConfirmDialog(item?.id)}
              />
            );
          })}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}

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
                    updateAddress();
                  }}
                  text={'save'}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyAddressScreen;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
    color: colors.muted,
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
