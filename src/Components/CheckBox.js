import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

export default function CheckBox({onPress, isChecked}) {
  //const [isChecked, setIsChecked] = useState(selected);
  return (
    <Pressable
      onPress={() => onPress && onPress()}
      style={[
        {
          borderRadius: scale(15),
          borderColor: '#000',
          height: scale(21),
          width: scale(21),
        },
        isChecked ? styles.checked : styles.unChecked,
      ]}></Pressable>
  );
}

const styles = StyleSheet.create({
  checked: {
    backgroundColor: '#00C569',
    borderColor: '#000',
  },
  unChecked: {
    backgroundColor: '#BEBEBE',
  },
});
