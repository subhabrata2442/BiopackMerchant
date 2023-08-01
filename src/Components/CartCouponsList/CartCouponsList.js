import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartCouponsList = ({item, couponId, onPress}) => {
  const [discountSymbol, setdiscountSymbol] = useState('%');
  const [quantity, setQuantity] = useState(0);

  //console.warn(item.seller_details.name);

  useEffect(() => {
    if (item.discount_type == 'flat') {
      setdiscountSymbol('');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.innerRow}>
          <View style={styles.innerDiscountRow}>
            <Text style={styles.primaryText}>
              ${item?.discount_value} {discountSymbol}
            </Text>
          </View>
        </View>

        <View style={styles.innerRow}>
          <View style={styles.innerTextRow}>
            {item?.description == null ? (
              <Text style={styles.secondaryText}>
                ${item?.discount_value} {discountSymbol} Off Use This Promo
                Code!
              </Text>
            ) : (
              <Text style={styles.secondaryText}>{item?.description}</Text>
            )}
          </View>
        </View>
        <View style={styles.innerRow}>
          <View style={styles.innerCouponCodeTextRow}>
            <Text style={styles.secondaryCouponText}>
              Coupon Code :{item?.code}
            </Text>
          </View>
        </View>

        <View style={styles.innerRow}>
          <View style={styles.innerTextRow}>
            <Text style={styles.secondaryText}>
              Vallid Through {item?.vallid_through}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container2}>
        {item?.id == couponId ? (
          <View style={styles.applyButtonContainer}>
            <TouchableOpacity
              style={styles.applyedButton}
              onPress={onPress}
              disabled={true}>
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color="#2e8c40"
              />
              <Text style={styles.applyedButtonText}>APPLIED</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.applyButtonContainer}>
            <TouchableOpacity style={styles.applyButton} onPress={onPress}>
              <Text style={styles.buttonText}>TAB TO APPLY</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CartCouponsList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#f1d9d6',
    borderWidth: 1,
    overflow: 'hidden',
  },
  container1: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  container2: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#f1d9d6',
    paddingTop: 3,
    paddingBottom: 3,
    marginTop: 15,
    backgroundColor: '#ffeef0',
  },
  innerRow: {
    //display: 'flex',
    //flexDirection: 'row',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    //width: '100%',
  },
  innerDiscountRow: {},
  applyButtonContainer: {},
  primaryText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e91116',
  },
  innerTextRow: {
    //display: 'flex',
    //justifyContent: 'center',
    //width: '100%',
  },
  innerSellerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 7,
  },
  secondarySellerText: {
    color: '#6b9f33',
  },
  innerCouponCodeTextRow: {
    borderColor: '#f3cd73',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  secondaryCouponText: {
    fontSize: 13,
    color: colors.muted,
    //fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: 'bold',
    textAlign: 'center',
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
  applyButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '100%',
    flexDirection: 'row',
  },
  applyedButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '100%',
    flexDirection: 'row',
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  applyedButtonText: {
    fontWeight: 'bold',
    color: '#2e8c40',
  },
});
