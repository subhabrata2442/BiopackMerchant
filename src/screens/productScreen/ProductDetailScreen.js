import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useState, useEffect} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

import Ionicons from 'react-native-vector-icons/Ionicons';
import cartIcon from '../../../assets/images/icons/cart_beg.png';

import productDemoImage from '../../../assets/images/items/item-1.jpg';
import biopacklogo from '../../../assets/images/logo.png';

import {freeGames, paidGames, sliderData, category} from '../../../data';

import {SliderBox} from 'react-native-image-slider-box';

import styles from './styles';

import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';

import ProductCard from '../../Components/ProductCard/ProductCard';

const slides = [
  require('../../../assets/images/homescreen/home-banner.jpg'),
  require('../../../assets/images/homescreen/game-2.jpeg'),
];

const ProductDetailScreen = ({navigation, route}) => {
  const cartproduct = useSelector(state => state.product);
  const dispatch = useDispatch();

  const {product} = route.params;

  const [onWishlist, setOnWishlist] = useState(false);
  const [avaiableQuantity, setAvaiableQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productImage, SetProductImage] = useState(' ');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState('');
  const [isDisable, setIsDisbale] = useState(true);
  const [alertType, setAlertType] = useState('error');
  const [productSlider, setProductSlider] = useState([]);
  const [featureProducts, setfeatureProducts] = useState([]);
  const [productDescription, setProductDescription] = useState(
    " <p style='text-align:center;'>Hello World!</p>",
  );

  const {addCartItem} = bindActionCreators(actionCreaters, dispatch);
  const {width} = useWindowDimensions();

  const source = {
    html: product?.description_en,
  };

  //console.warn(product?.description_en);

  const handleProductInfoPress = product => {
    //navigation.navigate("productinfo");
    navigation.navigate('productinfo', {product: product});
  };

  const handleProductSizePress = product => {
    //navigation.navigate("productsize");
    navigation.navigate('productsize', {product: product});
  };

  const handleProductPress = product => {
    const slider_arr3 = [];

    // product.images.map(s => {
    //   slider_arr3.push(s.image);
    // });

    // setProductSlider(slider_arr3);

    //console.warn(slider_arr3);
    //setProductSlider(slider_arr);
    navigation.navigate('productdetail', {product: product});
    console.log(product);
  };

  const handleAddToCat = item => {
    //console.log(item);
    addCartItem(item);
  };

  const handleIncreaseButton = quantity => {
    if (avaiableQuantity > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseButton = quantity => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const fetchSlider = async productImage => {
    const slider_arr = [];
    productImage.map(s => {
      slider_arr.push(s.image);
    });

    console.log(productImage.length);

    setProductSlider(slider_arr);
  };

  const getFeatureProduct = async () => {
    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/feature-product';
    const res = await axios.get(apiUrl, config);
    const products = await res.data.products;
    setfeatureProducts(products);
    //console.warn(products);
  };

  //console.warn(featureProducts);

  useEffect(() => {
    setQuantity(0);
    //setAvaiableQuantity(product.quantity);
    //SetProductImage(productDemoImage);
    //fetchWishlist();
    //console.warn(product.sizes);
    fetchSlider(product.images);
    getFeatureProduct();
  }, [product]);
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={colors.muted}
          />
        </TouchableOpacity>

        <View style={styles.topbarlogoContainer}>
          <Image source={biopacklogo} style={styles.logo} />
        </View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate('cart')}>
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
      <View style={styles.bodyContainer}>
        <ScrollView nestedScrollEnabled={true}>
          {/* <Text>Product details</Text> */}
          <View style={styles.productImageSliderContainer}>
            {productSlider.length > 0 ? (
              // <SliderBox
              //   images={productSlider}
              //   sliderBoxHeight={300}
              //   dotColor="#FFEE58"
              //   inactiveDotColor="#90A4AE"
              //   paginationBoxVerticalPadding={5}
              //   autoplay
              //   circleLoop
              //   resizeMethod={'resize'}
              //   resizeMode={'cover'}
              // />
              <SliderBox
                images={productSlider}
                sliderBoxHeight={300}
                onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
                }
              />
            ) : (
              <Text>No Image</Text>
            )}

            {/* <SliderBox
              images={productSlider}
              sliderBoxHeight={300}
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={5}
              autoplay
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
            /> */}
          </View>
          <View style={styles.infoButtonContainer}>
            <View style={styles.wishlistButtonContainer}>
              <TouchableOpacity
                disabled={isDisable}
                style={styles.iconContainer}
                onPress={() => handleWishlistBtn()}>
                <Ionicons name="heart" size={25} color={colors.danger} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productDetailMainContainer}>
            <View style={styles.productInfoTopContainer}>
              <View style={styles.productNameContaier}>
                <Text style={styles.productNameText}>{product?.title_en}</Text>
              </View>
              <View style={styles.productDeiscContaier}>
                {/* <Text style={styles.productDescText}>{product?.description_en}</Text> */}
                <RenderHtml
                  contentWidth={width}
                  source={source}
                  style={styles.productDescText}
                />
              </View>
              <View style={styles.productSkuContaier}>
                <Text style={styles.productSkuText}>
                  {product?.product_code}
                </Text>
              </View>
            </View>

            <View style={styles.productInfo2ndContainer}>
              <View style={styles.productRatingContainer}>
                <Text style={styles.productRatingText}>Rating</Text>
                <Rating
                  style={styles.productRatingBar}
                  type="star"
                  ratingCount={5}
                  imageSize={20}
                  ratingColor="#3498db"
                  ratingBackgroundColor="red"
                  defaultRating={0}
                  readonly={true}
                />

                {/* <Text style={styles.productRatingNumberText}>4</Text> */}
              </View>
              <View></View>
            </View>

            <View style={styles.productInfo3rdContainer}>
              <View style={styles.productPriceContainer}>
                <Text style={styles.secondaryTextSm}>Form</Text>
                <View style={styles.productInfo3rdPriceContainer}>
                  <Text style={styles.primaryTextSm}>
                    ${product?.lowest_price}
                  </Text>
                  <Text style={styles.secondarySubText}>each</Text>
                </View>
              </View>
              <View style={styles.productDetailContainer}>
                <TouchableOpacity
                  style={styles.productDetailBtnContainer}
                  onPress={() => handleProductInfoPress(product)}>
                  <Text style={styles.productDetailBtnText}>
                    Product Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <View style={styles.productFeatureBottomContainer}>
            <View style={styles.primaryTextContainer}>
              <Text style={styles.primaryText}>Feature Products</Text>
            </View>

            <View style={styles.productCardContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                horizontal={true}
                data={featureProducts}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View
                    key={item.id}
                    style={{marginLeft: 5, marginBottom: 5, marginRight: 5}}>
                    <ProductCard
                      name={item.title_en}
                      image={item.main_image}
                      price={item.lowest_price}
                      quantity={5}
                      onPress={() => handleProductPress(item)}
                      onPressSecondary={() => ''}
                    />
                  </View>
                )}
              />
              <View style={styles.emptyView}></View>
            </View>
          </View> */}
        </ScrollView>
        <View style={styles.productInfoBottomContainer}>
          <TouchableOpacity
            style={styles.viewCartcontainer}
            onPress={() => handleProductSizePress(product)}>
            <Text style={styles.viewCartbuttonText}>Select Size</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
