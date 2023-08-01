import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import {colors, network} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../../../Components/Loader';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';

const currencyData = [
  {label: 'USD', value: 'USD'},
  {label: 'AFN', value: 'AFN'},
  {label: 'AED', value: 'AFN'},
];

const BuisnessDetails = ({props, route}) => {
  const navigation = useNavigation();
  const {userData} = route.params;

  const [loading, setLoading] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [currency, setCurrency] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState(userData.country);
  const [errortext, setErrortext] = useState('');

  const companyNameRef = createRef();
  const addressRef = createRef();
  const emailInputRef = createRef();
  const phoneInputRef = createRef();
  const [isFocus, setIsFocus] = useState(false);

  const [regisData, setRegisData] = useState([]);

  const handleBackButton = () => {
    console.warn('back');
  };

  //console.warn(userData.country);

  useEffect(() => {
    setRegisData(userData);
    //console.warn(userData);
  }, []);

  const handleSubmitButton = async () => {
    if (!companyName) {
      Alert.alert('Error!', 'Please fill Company Name');
      return;
    }
    if (!address) {
      Alert.alert('Error!', 'Please fill Address');
      return;
    }
    if (!currency) {
      Alert.alert('Error!', 'Please Select Currency');
      return;
    }
    if (!locality) {
      Alert.alert('Error!', 'Please fill Locality');
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
    if (!postalCode) {
      Alert.alert('Error!', 'Please fill Postal Code');
      return;
    }

    const postData = {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      email: userData?.email,
      dial_code: userData?.dial_code,
      phone: userData?.phone,
      country_code: userData?.country_code,
      password: userData?.password,
      password_confirmation: userData?.password,
      company_name: companyName,
      address: address,
      address1: address1,
      currency: currency,
      locality: locality,
      city: city,
      state: state,
      postal_code: postalCode,
      country: country,
    };

    navigation.navigate('signupOtp', {userData: postData});

    // setLoading(true);

    // let emaildata = {
    //   email: userData?.email,
    // };

    // try {
    //   const response = await axios.post(
    //     network.serverip + '/check-unique-email',
    //     emaildata,
    //   );
    //   //console.warn(response);
    //   setLoading(false);
    //   if (response.status === 200) {
    //     props.navigation.navigate('signupOtp', {userData: postData});
    //   } else {
    //     Alert.alert('Error!', 'Email already exists');
    //   }
    // } catch (error) {
    //   Alert.alert('Error!', 'Email already exists');
    //   setErrortext('Email already exists');
    //   setLoading(false);
    // }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <ImageBackground
            style={styles.bgImage}
            resizeMode="cover"
            source={require('../../../../assets/images/login-bg.jpg')}>
            <KeyboardAvoidingView enabled>
              <View style={styles.regisSec}>
                <Image
                  style={styles.loginImg}
                  source={require('../../../../assets/images/logo.png')}
                />

                <View style={styles.SectionStyle}>
                  <Ionicons name="business-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={companyName => setCompanyName(companyName)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Company Name"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Ionicons name="pin" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={address => setAddress(address)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Address"
                    placeholderTextColor="#8b9cb5"
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Ionicons name="pin" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={address1 => setAddress1(address1)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter address1"
                    placeholderTextColor="#8b9cb5"
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Ionicons name="map-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={locality => setLocality(locality)}
                    underlineColorAndroid="#f000"
                    placeholder={'Enter locality'}
                    placeholderTextColor="#8b9cb5"
                  />
                </View>
                <View style={styles.InnerSectionStyle}>
                  <View style={styles.dropdownContainer}>
                    <Ionicons name="wallet-outline" style={styles.inputIcon} />
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && {borderColor: 'blue'},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={currencyData}
                      search
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Currency' : '...'}
                      searchPlaceholder="Search..."
                      value={currency}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setCurrency(item.value);
                        setIsFocus(false);
                      }}
                    />
                  </View>
                  <View style={styles.SectionStyle2}>
                    <Ionicons name="map-outline" style={styles.inputIcon} />
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={city => setCity(city)}
                      underlineColorAndroid="#f000"
                      placeholder={'Enter City'}
                      placeholderTextColor="#8b9cb5"
                    />
                  </View>
                </View>

                <View style={styles.SectionStyle}>
                  <Ionicons name="map-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={state => setState(state)}
                    underlineColorAndroid="#f000"
                    placeholder={'Enter State'}
                    placeholderTextColor="#8b9cb5"
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Ionicons name="map-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={country => setCountry(country)}
                    value={country}
                    underlineColorAndroid="#f000"
                    placeholder={'Enter Country'}
                    placeholderTextColor="#8b9cb5"
                  />
                </View>
                <View style={styles.SectionStyle}>
                  <Ionicons name="navigate-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={postalCode => setPostalCode(postalCode)}
                    underlineColorAndroid="#f000"
                    placeholder={'Enter Postal Code'}
                    placeholderTextColor="#8b9cb5"
                    keyboardType={'phone-pad'}
                  />
                </View>

                <View style={styles.BtnMainSection}>
                  <View style={styles.BtnSection}>
                    <TouchableOpacity
                      style={styles.regisButtonStyle}
                      activeOpacity={0.5}
                      onPress={() => {
                        navigation.goBack();
                      }}>
                      <Text style={styles.buttonTextStyle}>BACK</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.BtnSection2}>
                    <TouchableOpacity
                      style={styles.regisButtonStyle}
                      activeOpacity={0.5}
                      onPress={handleSubmitButton}>
                      <Text style={styles.buttonTextStyle}>SIGN UP</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};
export default BuisnessDetails;
