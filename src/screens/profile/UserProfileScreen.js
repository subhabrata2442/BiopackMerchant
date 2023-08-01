import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserProfileCard from '../../Components/UserProfileCard/UserProfileCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionList from '../../Components/OptionList/OptionList';
import {colors} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = ({navigation, route}) => {
  const [showBox, setShowBox] = useState(true);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const {user} = route.params;

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

  const convertToJSON = obj => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };

  //console.log(userInfo);

  // covert  the user to Json object on initial render
  useEffect(() => {
    convertToJSON(user);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.TopBarContainer}>
        {/* <TouchableOpacity>
          <Ionicons name="menu-sharp" size={30} color={colors.primary} />
        </TouchableOpacity> */}
      </View>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>My Account</Text>
      </View>
      <View style={styles.UserProfileCardContianer}>
        <UserProfileCard
          Icon={Ionicons}
          name={userInfo?.name}
          email={userInfo?.email}
        />
      </View>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.OptionsContainer}>
          <OptionList
            text={'My Account'}
            Icon={Ionicons}
            iconName={'person'}
            onPress={() => navigation.navigate('myaccount', {user: userInfo})}
          />
          <OptionList
            text={'Change Password'}
            Icon={Ionicons}
            iconName={'key-sharp'}
            onPress={
              () =>
                navigation.navigate('updatepassword', {
                  userID: userInfo?.id,
                }) // navigate to updatepassword
            }
          />
          <OptionList
            text={'Order History'}
            Icon={Ionicons}
            iconName={'cart'}
            onPress={() => navigation.navigate('myorder', {user: userInfo})}
          />
          {/* <OptionList
            text={'Transction History'}
            Icon={Ionicons}
            iconName={'clipboard'}
            onPress={() => navigation.navigate('myaccount', {user: userInfo})}
          /> */}
          <OptionList
            text={'Manage Address'}
            Icon={Ionicons}
            iconName={'bookmark'}
            onPress={() => navigation.navigate('myaddress', {user: userInfo})}
          />

          <OptionList
            text={'Coupons'}
            Icon={Ionicons}
            iconName={'cut'}
            onPress={() => navigation.navigate('mycoupons', {user: userInfo})}
          />
          {/* <OptionList
          text={'Wishlist'}
          Icon={Ionicons}
          iconName={'heart'}
          onPress={() => navigation.navigate('mywishlist', {user: userInfo})}
        /> */}
          {/* !For future use --- */}
          {/* <OptionList
          text={"Settings"}
          Icon={Ionicons}
          iconName={"settings-sharp"}
          onPress={() => console.log("working....")}
        />
        <OptionList
          text={"Help Center"}
          Icon={Ionicons}
          iconName={"help-circle"}
          onPress={() => console.log("working....")}
        /> */}
          {/* !For future use ---- End */}
          <OptionList
            text={'Logout'}
            Icon={Ionicons}
            iconName={'log-out'}
            onPress={async () => {
              await AsyncStorage.removeItem('authUser');
              navigation.replace('login');
            }}
          />
          {/* <OptionList
            text={'Delete My Account'}
            Icon={Ionicons}
            iconName={'trash-sharp'}
            type={'danger'}
            onPress={() => showConfirmDialog(userInfo?.id)}
          /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfileScreen;

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
    height: '20%',
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
    fontSize: 20,
    fontWeight: '800',
    color: colors.muted,
  },
  OptionsContainer: {
    width: '100%',
  },
});
