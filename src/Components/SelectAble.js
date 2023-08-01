import React from 'react';
import {View, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import CheckBox from './CheckBox';
import Label from './Label';
import TitleComp from './TitleComp';

export default function SelectAble({selected, onSelect, item}) {
  //const {mobile_no, mobile_no} = item;
  //console.warn(selected);
  const fullAddress =
    item.address_line_1 +
    ',' +
    item.address_line_2 +
    ', ' +
    item.city +
    ',' +
    item.state +
    ',' +
    item.country +
    ', ' +
    item.pin_code;
  //console.warn(fullAddress);
  return (
    <View style={{flex: 1, paddingVertical: scale(15)}}>
      <TitleComp heading={item.full_name} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, paddingVertical: scale(10)}}>
          <Label text={item.mobile_no} style={{fontSize: scale(15)}} />
          <Label text={fullAddress} style={{fontSize: scale(13)}} />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <CheckBox
            onPress={() => onSelect && onSelect(item)}
            isChecked={selected}
          />
        </View>
      </View>
    </View>
  );
}
