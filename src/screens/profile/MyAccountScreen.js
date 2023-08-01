import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserProfileCard from '../../Components/UserProfileCard/UserProfileCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionList from '../../Components/OptionList/OptionList';
import {network} from '../../constants';
import ProgressDialog from 'react-native-progress-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAccountScreen = ({navigation, route}) => {
  const [showBox, setShowBox] = useState(true);
  const [error, setError] = useState('');
  const {user} = route.params;
  const userID = user['id'];

  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState('Please wait...');
  const [refeshing, setRefreshing] = useState(false);

  const [userName, setUserName] = useState(user?.name);
  const [userPhone, setUserPhone] = useState(user?.phone_no);
  const [userEmail, setUserEmail] = useState(user?.email);

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  console.log(user);

  //method for alert
  const showConfirmDialog = id => {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove your account?',
      [
        {
          text: 'Yes',
          onPress: () => {
            setShowBox(false);
            console.warn('delete!');
            //DeleteAccontHandle(id);
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  //fetch order from server using API call
  const fetchBusinessDetails = async () => {
    setIsloading(true);
    let token = await AsyncStorage.getItem('authUserToken');
    //setIsloading(true);
    const requestOptions = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/user-profile';
    const res = await axios.get(apiUrl, requestOptions);
    const userDetails = await res.data.user_details;
    const businessDetails = userDetails.business_details;
    // setAddress(addressList);
    // setError('');
    // setIsloading(false);

    setUserName(userDetails.name);
    setUserPhone(userDetails.dial_code + userDetails.phone_no);
    setUserEmail(userDetails.email);

    if (businessDetails != '') {
      setCompanyName(businessDetails.company_name);
      setAddress(businessDetails.address);
      //setPhone(businessDetails.email);
      setCurrency(businessDetails.currency);
      setLocality(businessDetails.locality);
      setCity(businessDetails.city);
      setState(businessDetails.state);
      setCountry(businessDetails.country);
      setPostalCode(businessDetails.postal_code);
    }

    setIsloading(false);

    //console.warn(businessDetails.company_name);
  };

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <ProgressDialog visible={isloading} label={label} />
      <View style={styles.TopBarContainer}>
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
      </View>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>My Account</Text>
      </View>
      <View style={styles.UserProfileCardContianer}>
        <UserProfileCard
          Icon={Ionicons}
          name={userName}
          email={userEmail}
          phoneNo={userPhone}
        />
      </View>
      <View style={styles.OptionsContainer}>
        <Text style={styles.primaryText}>Business Details</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Company Name</Text>
            <Text style={styles.secondaryTextSm}>{companyName}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Currency</Text>
            <Text style={styles.secondaryTextSm}>{currency}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Address</Text>
            <Text style={styles.secondaryTextSm}>{address}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>{phone}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Locality</Text>
            <Text style={styles.secondaryTextSm}>{locality}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>State</Text>
            <Text style={styles.secondaryTextSm}>{state}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Country</Text>
            <Text style={styles.secondaryTextSm}>{country}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>City</Text>
            <Text style={styles.secondaryTextSm}>{city}</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Postal Code</Text>
            <Text style={styles.secondaryTextSm}>{postalCode}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyAccountScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  UserProfileCardContianer: {
    width: '100%',
    height: '25%',
  },
  screenNameContainer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.muted,
  },
  OptionsContainer: {
    width: '100%',
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    padding: 10,
  },
  secondaryTextSm: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
