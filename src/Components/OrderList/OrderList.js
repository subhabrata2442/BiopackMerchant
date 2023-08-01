import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const imageUrl =
  'https://biopack.aqualeafitsol.com/upload/product/images/167634950863eb10447cbff.jpg';

const OrderList = ({item, onPress}) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerSec1}>
        <View style={styles.productImageContainer}>
          <Image source={{uri: imageUrl}} style={styles.productImage} />
        </View>
        <View style={styles.productDetailsContainer}>
          <Text style={styles.primaryText}>
            Brown Premium Italian Paper Carrier Bags with Twisted Handles
          </Text>
          <Text style={styles.secondaryTextSm}>Size : 33cmx20cmx8cm</Text>
          <Text style={styles.secondaryTextSm}>Quantity : 50</Text>
          <Text style={styles.secondaryTextSm}>Unit Price : $0.41</Text>

          <View style={styles.productReviewContainer}>
            <Text style={styles.primaryText}>$20.50</Text>
            <TouchableOpacity style={styles.reviewButton} onPress={onPress}>
              <Text style={styles.reviewButtonText}>rate & review product</Text>
              <Ionicons name="star" size={17} color="#8ab468" />
            </TouchableOpacity>

            {/* <View style={styles.productTotalPriceContainer}>
              <Text style={styles.primaryText}>$20.50</Text>
            </View>
            <View style={styles.reviewButtonSec}>
              <TouchableOpacity style={styles.reviewButton} onPress={onPress}>
                <Text>rate & review product</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
      <View style={styles.containerSec2}>
        <View style={styles.containerOrderSec}>
          <View style={styles.containerOrderSubSec1}>
            <Text style={styles.secondaryText}>Order ID : BIO-00000005</Text>
          </View>
          <View style={styles.containerOrderSubSec1}>
            <Text style={styles.primaryText}>Tax</Text>
          </View>
        </View>

        <View style={styles.containerOrderAmountSec}>
          <Text>Order Amount : $33.55</Text>
        </View>

        <View style={styles.containerOrderDeliveryAdressTitleSec}>
          <Text style={styles.primaryText}>Delivery Adress</Text>
        </View>

        <View style={styles.containerOrderDeliveryAdressSec}>
          <Text style={styles.secondaryText}>Kolkata</Text>
          <Text style={styles.secondaryText}>
            Kolkata,West Bengal,India, 721211
          </Text>
          <Text style={styles.secondaryText}>Phone Number - 9654785478</Text>
        </View>

        {/* <View style={styles.invoiceButtonSec}>
          <TouchableOpacity style={styles.invoiceButton} onPress={onPress}>
            <Text style={styles.invoiceButtonText}>Download Invoice</Text>
            <Ionicons name="download-outline" size={20} color={colors.white} />
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default OrderList;
