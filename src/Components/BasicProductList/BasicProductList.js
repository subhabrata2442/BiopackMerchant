import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BasicProductList = ({
  title,
  image,
  price,
  subTitle,
  packSize,
  quantity,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.IconContainer}>
          <Image source={{uri: image}} style={styles.leftImgContainer} />
        </View>
        <View style={styles.productInfoContainer}>
          {/* <Text
            style={styles.secondaryText}
            numberOfLines={50}
            ellipsizeMode="tail">
            {title}
          </Text> */}
          <Text numberOfLines={1}>
            {title.length < 25 ? `${title}` : `${title.substring(0, 25)}...`}
          </Text>
          <Text>{subTitle}</Text>
          <Text>{packSize}</Text>
        </View>
        <View style={styles.productQuantityContainer}>
          <Text style={styles.primaryText}>${quantity * price}</Text>
        </View>
      </View>
    </View>
  );
};

export default BasicProductList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    marginBottom: 3,
    paddingBottom: 3,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    width: '60%',
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    width: '20%',
  },
  productQuantityContainer: {
    width: '20%',
  },
  primaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'right',
    paddingLeft: 5,
    paddingRight: 5,
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: '600',
  },
  leftImgContainer: {
    width: '100%',
    height: 60,
  },
});
