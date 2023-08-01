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
import CouponsList from '../../Components/CouponsList/CouponsList';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCouponsScreen = ({navigation, route}) => {
  const {user} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState('Please wait...');
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [error, setError] = useState('');
  const [UserInfo, setUserInfo] = useState({});

  const [coupons, setcoupons] = useState([]);

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    //fetchAddress();
    setRefreshing(false);
  };

  //fetch order from server using API call
  const fetchCoupons = async () => {
    let token = await AsyncStorage.getItem('authUserToken');
    setIsloading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/all-coupon-list';
    const res = await axios.get(apiUrl, requestOptions);
    const couponsList = await res.data.coupons;
    console.log(couponsList);
    setcoupons(couponsList);
    setError('');
    setIsloading(false);
  };

  useEffect(() => {
    fetchCoupons();
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
          <Text style={styles.screenNameText}>Your Coupon</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>Coupons</Text>
        </View>
      </View>

      <CustomAlert message={error} type={alertType} />
      {coupons.length == 0 ? (
        <View style={styles.ListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>
            "There are no coupons yet."
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
          {coupons.map((item, index) => {
            return (
              <CouponsList
                item={item}
                key={index}
                onPress={() => handleEditAddress(item)}
              />
            );
          })}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyCouponsScreen;

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
    fontSize: 30,
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
