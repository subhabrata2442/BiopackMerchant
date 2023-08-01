import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {colors, network} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cartIcon from '../../../assets/images/icons/cart_beg.png';

import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';
//import Accordian from '../../Components/ProductSize'
import Loader from '../../Components/Loader';

import SizeCard from '../../Components/ProductSize/SizeCard';

import biopacklogo from '../../../assets/images/logo.png';

const ProductSizeScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const cartproduct = useSelector(state => state.product);
  const dispatch = useDispatch();

  const {product} = route.params;
  const [productSizes, setProductSizes] = useState([]);
  const [sellerId, setSellerId] = useState('');

  const fetchSize = async product_id => {
    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/product/' + product_id;
    const res = await axios.get(apiUrl, config);
    const result = await res.data.product_details;

    //console.log(res.data.product_details.seller_id);
    setLoading(false);
    setProductSizes(result.sizes);
    setSellerId(result.seller_id);
  };

  //console.log(data);
  useEffect(() => {
    //console.log(product?.child_category);
    fetchSize(product?.id);
  }, []);

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
      <Loader loading={loading} />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.accordionMainContaoner}>
          {productSizes.map((input, key) => (
            <View style={styles.inputContainer} key={input.id}>
              <Text style={styles.accordiancustomTitle}>
                {input.length}cm x {input.width}cm x {input.height}cm
              </Text>
              <View style={styles.child}>
                <View style={styles.accordianTopHeaderContainer}>
                  <View style={styles.accordianTopUnitPriceContainer}>
                    <Text style={styles.accordianTopUnitPriceTextContainer}>
                      Unit Price
                    </Text>
                  </View>
                  <View style={styles.accordianTopUnitCostContainer}>
                    <Text style={styles.accordianTopCostextContainer}>
                      Cost
                    </Text>
                  </View>
                  <View style={styles.accordianTopUnitTotalContainer}>
                    <Text style={styles.accordianTopTotalTextContainer}>
                      Total
                    </Text>
                  </View>
                </View>
              </View>

              {input.pack_sizes
                ? input.pack_sizes.map((item, index) => (
                    <View
                      key={item.id}
                      style={{marginLeft: 5, marginBottom: 10, marginRight: 5}}>
                      <SizeCard
                        sellerId={sellerId}
                        productId={product?.id}
                        itemId={item.id}
                        sizeId={input.id}
                        packSizeFrom={item.pack_size_from}
                        packSizeTo={item.pack_size_to}
                        currency={item.currency}
                        unitPrice={item.unit_price}
                        lowestPrice={item.lowest_price}
                        uniid={index}
                        sizeList={item.size_list}
                        productTitle={product?.title_en}
                        productImage={product?.main_image}
                        categoryId={product?.main_category}
                        subCategoryId={product?.sub_category_id}
                        childCategory={product?.child_category}
                        dimensionsTitle={input.dimensions_title}
                      />
                    </View>
                  ))
                : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductSizeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topbarlogoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  toBarText: {
    fontSize: 15,
    fontWeight: '600',
  },
  cartIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
  cartItemCountContainer: {
    position: 'absolute',
    zIndex: 10,
    top: -10,
    left: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  bodyContainer: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: colors.light,
    flex: 1,
    position: 'relative',
    paddingLeft: 8,
    paddingRight: 8,
  },
  accordiancustomTitle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
    backgroundColor: '#e8f9da',
    padding: 10,
  },
  accordianTopHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 10,
    paddingTop: 10,
  },
  accordianTopUnitPriceContainer: {
    width: '33.3337%',
  },
  accordianTopUnitCostContainer: {
    width: '33.3337%',
  },
  accordianTopUnitTotalContainer: {
    width: '33.3337%',
  },
  accordianTopUnitPriceTextContainer: {
    color: '#333',
    fontWeight: 'bold',
  },
  accordianTopCostextContainer: {
    color: '#333',
    fontWeight: 'bold',
  },
  accordianTopTotalTextContainer: {
    color: '#333',
    fontWeight: 'bold',
  },
  accordianRowMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 10,
    paddingTop: 10,
  },
  accordianUnitPriceContainer: {
    paddingRight: 20,
    width: '33.3337%',
  },
  accordianUnitCosTContainer: {
    width: '33.3337%',
  },
  accordianUnitTotalContainer: {
    width: '33.3337%',
  },
  accordianCosTextContainer: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  accordianCosSubTextContainer: {
    fontSize: 13,
  },
  accordianTotalTextContainer: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  accordianTotalSubTextContainer: {
    fontSize: 13,
  },
  productInfoBottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingLeft: 8,
    paddingRight: 8,
  },
  addToCartBtnContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#6b9f34',
    display: 'flex',
    flexDirection: 'row',
  },
  addToCartbuttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  productPriceTextContainer: {
    fontSize: 20,
    color: '#333',
    fontWeight: '900',
  },
  productFinalPriceTextContainer: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  addToCartbuttonIcon: {
    fontSize: 20,
    color: '#fff',
    marginRight: 10,
  },
});
