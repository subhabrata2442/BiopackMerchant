import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../constants';

const AddressList = ({item, handleEditAddress, onPressDelete, onPressSet}) => {
  const [totalCost, setTotalCost] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const fullAddress =
    item?.address_line_1 +
    ',' +
    item?.address_line_2 +
    ', ' +
    item?.city +
    ',' +
    item?.state +
    ',' +
    item?.country +
    ', ' +
    item?.pin_code;

  console.log(item);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerRow}>
        <View>
          <Text style={styles.primaryText}>{item?.full_name}</Text>
        </View>
      </View>

      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>{item?.address_line_1}</Text>
      </View>
      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>{item?.address_line_2}</Text>
      </View>
      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>{item?.city}</Text>
      </View>
      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>{item?.state}</Text>
      </View>
      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>{item?.country}</Text>
      </View>
      <View style={styles.innerRow}>
        <Text style={styles.secondaryText}>{item?.pin_code}</Text>
      </View>

      <View style={styles.innerRow}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditAddress}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          {item?.is_default == 1 ? (
            <TouchableOpacity
              disabled
              style={styles.defaultButton}
              onPress={onPressSet}>
              <Text style={styles.buttonText}>Default</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.defaultButton2}
              onPress={onPressSet}>
              <Text style={styles.buttonText}>Set as Default</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  innerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  primaryText: {
    fontSize: 15,
    color: colors.dark,
    fontWeight: 'bold',
  },
  secondaryTextSm: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: 'bold',
  },
  secondaryText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: 'bold',
  },
  timeDateContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#000',
    borderColor: '#000',
    color: '#fff',
    width: 100,
  },
  deleteButton: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#e91116',
    borderColor: '#fff',
    width: 100,
  },
  defaultButton: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#6b9f33',
    borderColor: '#fff',
    width: 100,
  },
  defaultButton2: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#9d9d9d',
    borderColor: '#fff',
    width: 100,
  },
  buttonText: {
    color: '#fff',
  },
});
