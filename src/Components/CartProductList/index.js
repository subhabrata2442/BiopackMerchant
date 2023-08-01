import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, network} from '../../constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const CartProductList = ({
  image,
  title,
  subTitle,
  packSize,
  unitPrice,
  price,
  quantity = 1,
  handleDelete,
  onPressDecrement,
  onPressIncrement,
}) => {
  const rightSwipe = () => {
    return (
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity onPress={handleDelete}>
          <Ionicons name="remove" size={25} color={colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <GestureHandlerRootView>
      <View style={styles.containerOuter}>
        <Swipeable renderRightActions={rightSwipe}>
          <View style={styles.cartBodyContiainer}>
            <View style={styles.cartProductListContiainer}>
              <View style={styles.cartProductLeftMainContiainer}>
                <Image source={{uri: image}} style={styles.leftImgContainer} />
              </View>
              <View style={styles.cartProductRightMainContiainer}>
                {/* <TouchableOpacity
                  onPress={{}}
                  style={styles.cartRemoveContainer}>
                  <Ionicons
                    name="md-remove-circle-sharp"
                    size={20}
                    color={colors.muted}
                  />
                </TouchableOpacity> */}
                <View style={styles.cartProductRightContiainer}>
                  {/* <View style={styles.productTitleContainer}>
                  <Text style={styles.productTitleTextContainer}>Title</Text>
                </View> */}
                  <View style={styles.productDescContainer}>
                    <Text style={styles.productDescTextContainer}>{title}</Text>
                  </View>
                  <View style={styles.productSizeContainer}>
                    <Text style={styles.productSizeTextContainer}>
                      {subTitle}
                    </Text>
                  </View>

                  <View style={styles.productQtyContainer}>
                    <Text style={styles.productQtyTextContainer}>
                      Pack Size: {packSize}
                    </Text>
                    {/* <View style={styles.productQtyDropdownContainer}>
                      <SelectDropdown
                        style={styles.producDropdownContainer}
                        data={countries}
                        // defaultValueByIndex={1} // use default value by index or default value
                        // defaultValue={'Canada'} // use default value by index or default value
                        onSelect={(selectedItem, index) => {
                          console.log(selectedItem, index);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                          return item;
                        }}
                        buttonStyle={styles.dropdown2BtnStyle}
                      />
                    </View> */}
                  </View>
                  <View style={styles.productPriceContainer}>
                    <Text style={styles.productPriceTextContainer}>
                      Unit Price :{unitPrice}
                    </Text>
                  </View>
                  <View style={styles.productPriceContainer}>
                    <Text style={styles.productPriceTextContainer}>
                      Total: {price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{uri: image}} style={styles.productImage} />
            </View>
            <View style={styles.productInfoContainer}>
              <Text style={styles.productTitle}>{title}</Text>
              <Text style={styles.productQuantitySm}>x{quantity}</Text>
              <View style={styles.productListBottomContainer}>
                <Text style={styles.productPrice}>{price * quantity} $</Text>

                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButtonContainer}
                    onPress={onPressDecrement}>
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterCountText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.counterButtonContainer}
                    onPress={onPressIncrement}>
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View> */}
        </Swipeable>
      </View>
    </GestureHandlerRootView>
  );
};

export default CartProductList;
