import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  StatusBar,
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

const UserOTP = ({props, route}) => {
  const navigation = useNavigation();
  const {userData} = route.params;

  const [regisData, setRegisData] = useState('');
  const [userToken, setUserToken] = useState('');
  const [tokenRequested, setTokenRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');
  const [isEmailValidationSuccess, setIsEmailValidationSuccess] =
    useState(false);

  //console.log(userData);

  const requestOTP = async function () {
    setLoading(true);
    let emaildata = {
      email: 'aqualeafitsoltest@gmail.com',
    };
    try {
      const response = await axios.post(
        network.serverip + '/check-unique-email',
        emaildata,
      );
      console.warn(response);
      setLoading(false);
      if (response.status === 201) {
        Alert.alert('Success!', `Otp requested via Email`);
        return true;
      } else {
        Alert.alert('Error!', 'Email already exists');
      }
    } catch (error) {
      Alert.alert('Error!', error.message);
      setLoading(false);
      return false;
    }
  };

  const verifyOTP = async () => {
    setErrortext('');
    if (!userToken) {
      Alert.alert('Error!', 'Please fill otp');
      return;
    }
    setLoading(true);

    //setIsEmailValidationSuccess(true);

    //console.log('ddd', regisData);

    try {
      const response = await axios.post(
        network.serverip + '/register',
        regisData,
      );
      console.warn(response);
      console.log(response);
      setLoading(false);
      if (response.status === 200) {
        setIsEmailValidationSuccess(true);
        return true;
      } else {
        Alert.alert('Error!', 'Email already exists');
        return false;
      }
    } catch (error) {
      Alert.alert('Error!', 'Email already exists');
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    //setQuantity(0);
    //setAvaiableQuantity(product.quantity);
    setUserEmail(userData.email);
    setRegisData(userData);

    //console.warn(userData);
  }, []);

  if (isEmailValidationSuccess) {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={styles.bgImage}
          resizeMode="cover"
          source={require('../../../../assets/images/login-bg.jpg')}>
          <Image
            source={require('../../../../assets/images/success.png')}
            style={{height: 150, resizeMode: 'contain', alignSelf: 'center'}}
          />
          <Text style={styles.successTextStyle}>Registration Successful.</Text>
          <TouchableOpacity
            style={styles.otpButtonStyle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('login')}>
            <Text style={styles.buttonTextStyle}>Login Now</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.mainBody}>
      <StatusBar></StatusBar>
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
              <View style={styles.loginSec}>
                <Text>{'Inform the received token to proceed'}</Text>
                <View style={styles.SectionStyle}>
                  <Ionicons name="eye-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={OtpToken => setUserToken(OtpToken)}
                    placeholder={'Token (6 digits)'}
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize={'none'}
                    keyboardType={'default'}
                  />
                </View>
                <View style={styles.BtnMainSection}>
                  <View style={styles.BtnSection}>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={() => {
                        navigation.goBack();
                      }}>
                      <Text style={styles.buttonTextStyle}>BACK</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.BtnSection2}>
                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={() => verifyOTP()}>
                      <Text style={styles.buttonTextStyle}>Verify</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text
                  style={styles.registerTextStyle}
                  onPress={() => requestOTP()}>
                  Not Received ?{' '}
                  <Text style={{fontWeight: 'bold', color: '#fe0000'}}>
                    Resend
                  </Text>
                </Text>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};
export default UserOTP;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    //justifyContent: 'center',
    //backgroundColor: '#307ecc',
    //alignContent: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  loginSec: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.5)',
    width: '86%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 70,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginImg: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    margin: 50,
  },
  userIcon: {
    fontSize: 60,
    color: '#000',
    marginBottom: 5,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
  },
  inputIcon: {
    padding: 10,
    fontSize: 20,
    color: '#fff',
    backgroundColor: '#6f6b6a',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#dadae8',
  },
  otpButtonStyle: {
    backgroundColor: '#fe0000',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#fe0000',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 1,
    width: '100%',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 15,
    padding: 5,
  },
  successTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
  },
  BtnMainSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  BtnSection: {
    width: '48%',
    position: 'relative',
    left: -6,
  },
  BtnSection2: {
    width: '48%',
    right: -6,
  },
});
