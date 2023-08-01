import React, {useState, createRef} from 'react';
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
} from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, network} from '../../../constants';
import Loader from '../../../Components/Loader';
import CustomAlert from '../../../Components//CustomAlert/CustomAlert';

import styles from './styles';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  _storeData = async user => {
    try {
      AsyncStorage.setItem('authUser', JSON.stringify(user));
    } catch (error) {
      console.log(error);
      setErrortext(error);
    }
  };

  const handleSubmitPress = async () => {
    setErrortext('');

    if (!userEmail) {
      return setErrortext('Please enter your email');
    }
    if (!userPassword) {
      return setErrortext('Please enter your password');
    }
    if (!userEmail.includes('@')) {
      return setErrortext('Email is not valid');
    }
    if (userEmail.length < 6) {
      return setErrortext('Email is too short');
    }
    if (userPassword.length < 6) {
      return setErrortext('Password must be 6 characters long');
    }

    setLoading(true);

    let logindata = {
      email: userEmail,
      password: userPassword,
    };

    // setLoading(false);
    // var authUserToken = await AsyncStorage.getItem("authUserToken");
    // console.warn(authUserToken);
    // return false;

    try {
      const response = await axios.post(network.serverip + '/login', logindata);
      setLoading(false);
      //console.warn(response.data.user);
      if (response.status === 200) {
        //console.warn(response.data.access_token);

        AsyncStorage.setItem('authUserToken', response.data.access_token);
        _storeData(response.data.user);
        navigation.replace('tab', {user: response.data.user});
      } else {
        setErrortext('Please check your email id or password');
      }
    } catch (error) {
      setErrortext('Please check your email id or password');
      setLoading(false);
    }
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
              <View style={styles.loginSec}>
                <Image
                  style={styles.loginImg}
                  source={require('../../../../assets/images/logo.png')}
                />
                <View>
                  <Ionicons name="person" style={styles.userIcon} />
                </View>

                <View style={styles.SectionStyle}>
                  <Ionicons name="mail-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserEmail => setUserEmail(UserEmail)}
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      passwordInputRef.current &&
                      passwordInputRef.current.focus()
                    }
                    underlineColorAndroid="#f000"
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Ionicons
                    name="lock-closed-outline"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserPassword => setUserPassword(UserPassword)}
                    placeholder="Enter Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    ref={passwordInputRef}
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                  />
                </View>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmitPress}>
                  <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>

                <Text style={styles.forgotPassword}> Forget password? </Text>
                <Text
                  style={styles.registerTextStyle}
                  onPress={() => navigation.navigate('signup')}>
                  New Here ?{' '}
                  <Text style={{fontWeight: 'bold', color: '#fe0000'}}>
                    Register
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
export default LoginScreen;
