import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from 'react-native-size-matters';
import SelectAble from '../SelectAble';

const UserAddressList = ({
  id,
  fullName,
  mobileNo,
  pinCode,
  addressLine1,
  addressLine2,
  city,
  state,
  country,
  isDefault,
}) => {
  const [selectedAddress, setSelectedAddress] = useState('Standard Delivery');
  const onSelect = item => {
    setSelectedAddress(item.fullName);
  };

  console.warn(selectedAddress);
  return (
    <SelectAble
      item={{
        label: 'Home',
        subLabel:
          'A-127, Mittal Paradise, Shivalik City, Sahibzada Ajit Singh Nagar, Punjab 140301',
      }}
    />
    // <View
    //   style={{
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //   }}>
    //   <View style={{flex: 1, paddingVertical: scale(10)}}>
    //     <Label text={fullName} style={{fontSize: scale(13)}} />
    //   </View>
    //   <View style={{flex: 1, alignItems: 'flex-end'}}>
    //   <CheckBox onPress={()=>onSelect && onSelect(item)}  isChecked={selected}  />
    //   </View>
    // </View>
  );
};

export default UserAddressList;

const styles = StyleSheet.create({
  label: {
    fontSize: scale(16),
    color: '#000',
  },
});
