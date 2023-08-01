import {
    StyleSheet,
    Image,
    TouchableOpacity,
    View,
    StatusBar,
    Text,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import cartIcon from "../../../assets/images/icons/cart_beg_active.png";
  import { colors, network } from "../../constants";
  import CartProductList from "../../Components/CartProductList/index";
  import { useSelector, useDispatch } from "react-redux";
  import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
  import { bindActionCreators } from "redux";
  import styles from './styles';
  
  const CartScreen = ({ navigation }) => {
    const cartproduct = useSelector((state) => state.product);
    const [totalPrice, setTotalPrice] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
  
    const { removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } =
      bindActionCreators(actionCreaters, dispatch);
  
    //method to remove the item from (cart) redux
    const deleteItem = (id) => {
      removeCartItem(id);
    };
  
    //method to increase the quantity of the item in(cart) redux
    const increaseQuantity = (id, quantity, avaiableQuantity) => {
      if (avaiableQuantity > quantity) {
        increaseCartItemQuantity({ id: id, type: "increase" });
        setRefresh(!refresh);
      }
    };
  
    //method to decrease the quantity of the item in(cart) redux
    const decreaseQuantity = (id, quantity) => {
      if (quantity > 1) {
        decreaseCartItemQuantity({ id: id, type: "decrease" });
        setRefresh(!refresh);
      }
    };
  
    //calcute and the set the total price whenever the value of carproduct change
    useEffect(() => {
      setTotalPrice(
        cartproduct.reduce((accumulator, object) => {
          return accumulator + object.price * object.quantity;
        }, 0)
      );
    }, [cartproduct, refresh]);
  
    return (
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={colors.muted}
            />
          </TouchableOpacity>
  
          <View></View>
          <TouchableOpacity
            style={styles.cartIconContainer}
            onPress={() => navigation.navigate("cart")}
          >
            {cartproduct.length > 0 ? (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          ) : (
            <></>
          )}
            <Image source={cartIcon} />
          </TouchableOpacity>
        </View>
        {cartproduct.length === 0 ? (
        <View style={styles.cartProductListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>"Cart is empty"</Text>
        </View>
        ) : (
            <ScrollView style={styles.cartProductListContiainer}>
            {cartproduct.map((item, index) => (
              <CartProductList
                key={index}
                index={index}
                image={`${network.serverip}/uploads/${item.image}`}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                onPressIncrement={() => {
                  increaseQuantity(
                    item._id,
                    item.quantity,
                    item.avaiableQuantity
                  );
                }}
                onPressDecrement={() => {
                  decreaseQuantity(item._id, item.quantity);
                }}
                handleDelete={() => {
                  deleteItem(item._id);
                }}
              />
            ))}
            <View style={styles.emptyView}></View>
          </ScrollView>
        )}
        <View style={styles.cartBottomContainer}>
        <View style={styles.cartBottomLeftContainer}>
          <View style={styles.IconContainer}>
            {/* <MaterialIcons
              name="featured-play-list"
              size={24}
              color={colors.primary}
            /> */}
          </View>
          <View>
            <Text style={styles.cartBottomPrimaryText}>Total</Text>
            <Text style={styles.cartBottomSecondaryText}>{totalPrice}$</Text>
          </View>
        </View>
        <View style={styles.cartBottomRightContainer}>
          {cartproduct.length > 0 ? (
            <TouchableOpacity style={styles.addToCartcontainer} onPress={() => navigation.navigate("checkout")}>
                <Text style={styles.addToCartbuttonText}>Checkout</Text>
                </TouchableOpacity>

            
          ) : (
            <TouchableOpacity style={styles.containerDisabled} oonPress={() => navigation.navigate("checkout")}>
            <Text style={styles.addToCartbuttonText}>Checkout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>







      </View>
    );
  };
  
  export default CartScreen;
  
 
  