import React, {useState, createRef, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {colors, network} from '../../../constants';
import IntlPhoneInput from 'react-native-intl-phone-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PhoneInput from 'react-native-phone-number-input';

import Loader from '../../../Components/Loader';
import {useTogglePasswordVisibility} from '../../../Components/UseTogglePasswordVisibility';

import styles from './styles';

const RegisterScreen = props => {
  const [user1stName, setUser1stName] = useState('');
  const [userlastName, setUserlastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [emailOtp, setEmailOtp] = useState('');

  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const nameInputRef = createRef();
  const nameInput2Ref = createRef();
  const emailInputRef = createRef();
  const phoneInputRef = createRef();

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const [phoneNumber, setphoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [dialCode, setDialCode] = useState('91');
  const [country, setCountry] = useState('India');
  const phoneInput = useRef(null);

  //console.warn(phoneInput.current?.getCallingCode());

  const handleSubmitButton = async () => {
    if (!user1stName) {
      Alert.alert('Error!', 'Please fill First Name');
      return;
    }
    if (!userlastName) {
      Alert.alert('Error!', 'Please fill Last Name');
      return;
    }
    if (!userEmail) {
      Alert.alert('Error!', 'Please fill Email');
      return;
    }
    if (!phoneNumber) {
      Alert.alert('Error!', 'Please fill Phone');
      return;
    }
    if (!password) {
      Alert.alert('Error!', 'Please fill Password');
      return;
    }

    const userData = {
      first_name: user1stName,
      last_name: userlastName,
      email: userEmail,
      dial_code: dialCode,
      phone: phoneNumber,
      country_code: countryCode,
      password: password,
      password_confirmation: password,
      country: country,
    };

    //props.navigation.navigate('signupBuinessDetails', {userData: userData});

    setLoading(true);
    let emaildata = {
      email: userEmail,
    };

    try {
      const response = await axios.post(
        network.serverip + '/check-unique-email',
        emaildata,
      );
      //console.warn(response);
      setLoading(false);
      if (response.status === 200) {
        props.navigation.navigate('signupBuinessDetails', {userData: userData});
      } else {
        Alert.alert('Error!', 'Email already exists');
      }
    } catch (error) {
      Alert.alert('Error!', 'Email already exists');
      setErrortext('Email already exists');
      setLoading(false);
    }
  };

  if (isRegistraionSuccess) {
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
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonTextStyle}>Login Now</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
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
                  <Ionicons name="person-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserFirstName =>
                      setUser1stName(UserFirstName)
                    }
                    underlineColorAndroid="#f000"
                    placeholder="Enter First Name"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      nameInputRef.current && nameInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Ionicons name="person-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserlastName => setUserlastName(UserlastName)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Last Name"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="email-address"
                    ref={nameInput2Ref}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      nameInput2Ref.current && nameInput2Ref.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <Ionicons name="mail-outline" style={styles.inputIcon} />
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserEmail => setUserEmail(UserEmail)}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Email d"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="email-address"
                    ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      emailInputRef.current && emailInputRef.current.focus()
                    }
                    blurOnSubmit={false}
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="IN"
                    layout="first"
                    withShadow
                    autoFocus
                    containerStyle={styles.phoneContainer}
                    textContainerStyle={styles.phoneTextInput}
                    onChangeText={text => {
                      setphoneNumber(text);
                    }}
                    onChangeFormattedText={text => {
                      setDialCode(phoneInput.current?.getCallingCode());
                    }}
                    onChangeCountry={code => {
                      setCountryCode(code.cca2);
                      setCountry(code.name);
                    }}
                  />
                  {/* <Pressable
                    style={styles.button}
                    onPress={() => buttonPress()}>
                    <Text style={styles.continueText}>Get Phone Number</Text>
                  </Pressable> */}
                </View>

                <View style={styles.passSectionStyle}>
                  <Ionicons
                    name="lock-closed-outline"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputFieldPassword}
                    name="password"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    enablesReturnKeyAutomatically
                    onChangeText={text => setPassword(text)}
                  />
                  <Pressable onPress={handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={22} color="#232323" />
                  </Pressable>
                </View>

                <TouchableOpacity
                  style={styles.regisButtonStyle}
                  activeOpacity={0.5}
                  onPress={handleSubmitButton}>
                  <Text style={styles.buttonTextStyle}>Next</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;
