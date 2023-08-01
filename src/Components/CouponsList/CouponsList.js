import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../constants';

const AddressList = ({item, onPress}) => {
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
      <View style={styles.innerRow}>
        <View style={styles.innerDiscountRow}>
          <Text style={styles.primaryText}>
            ${item?.discount_value} {discountSymbol}
          </Text>
        </View>
      </View>

      <View style={styles.innerRow}>
        <View style={styles.innerTextRow}>
          <Text style={styles.secondaryText}>
            ${item?.discount_value} {discountSymbol} Off Use This Promo Code!
          </Text>
        </View>
      </View>
      <View style={styles.innerRow}>
        <View style={styles.innerCouponCodeTextRow}>
          <Text style={styles.secondaryText}>Coupon Code :{item?.code}</Text>
        </View>
      </View>
      <View style={styles.innerRow}>
        <View style={styles.innerTextRow}>
          <View style={styles.innerSellerContainer}>
            <Text style={styles.secondaryText}>
              This Coupon Valid For Seller :
            </Text>
            <Text style={styles.secondarySellerText}>
              {item.seller_details.name}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.innerRow}>
        <View style={styles.innerTextRow}>
          <Text style={styles.secondaryText}>Vallid Through Jun 28, 2023</Text>
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
    padding: 20,
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
  innerDiscountRow: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  primaryText: {
    fontSize: 40,
    color: colors.dark,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e91116',
  },
  innerTextRow: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
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
  secondaryTextSm: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: 'bold',
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
