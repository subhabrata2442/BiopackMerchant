import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import scanIcon from '../../../assets/images/icons/scan_icons.png';
import BannerSlider from '../../Components/CarouselCardItem';
import {freeGames, paidGames, sliderData} from '../../../data';
import ProductCard from '../../Components/ProductCard/ProductCard';
import NavigationDrawerHeader from '../../navigation/drawerHeader/index';
import {colors, network} from '../../constants';
import styles from './styles';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {SliderBox} from 'react-native-image-slider-box';
import CategoryCard from '../../Components/CustomIconButton/CategoryCard';

import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';

import orderSup1Icon1 from '../../../assets/images/icons/order-sup1.png';
import orderSup1Icon2 from '../../../assets/images/icons/order-sup2.png';
import orderSup1Icon3 from '../../../assets/images/icons/order-sup3.png';
import orderSup1Icon4 from '../../../assets/images/icons/order-sup4.png';

import {category} from '../../../data';

//import Categories from '../../Components/Categories';

const slides = [
  require('../../../assets/images/homescreen/home-banner.jpg'),
  require('../../../assets/images/homescreen/game-2.jpeg'),
];

export default function HomeScreen({navigation, route}) {
  const cartproduct = useSelector(state => state.product);
  const dispatch = useDispatch();
  const {addCartItem} = bindActionCreators(actionCreaters, dispatch);

  const [products, setProducts] = useState([]);
  const [searchItems, setSearchItems] = useState([]);

  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/category';
    const res = await axios.get(apiUrl, config);
    const result = await res.data.categories;
    setCategories(result);
    //console.warn(result);
  };

  const getFeatureProduct = async () => {
    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/feature-product';
    const res = await axios.get(apiUrl, config);
    const products = await res.data.products;
    setProducts(products);

    let payload = [];
    products.forEach((item, index) => {
      let searchableItem = {...item, id: ++index, name: item.title_en};
      payload.push(searchableItem);
    });
    setSearchItems(payload);
    //console.log(payload);
  };

  useEffect(() => {
    //console.warn('fff');
    getCategories();
    getFeatureProduct();
  }, []);

  const handleProductPress = product => {
    navigation.navigate('productdetail', {product: product});
  };

  const handleAddToCat = product => {
    addCartItem(product);
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <NavigationDrawerHeader navigationProps={navigation} />
      <View style={styles.bodyContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <SearchableDropdown
              onTextChange={text => console.log(text)}
              onItemSelect={item => handleProductPress(item)}
              defaultIndex={0}
              containerStyle={{
                borderRadius: 5,
                width: '100%',
                elevation: 5,
                position: 'relative',
                zIndex: 20,
                top: -20,
                maxHeight: 300,
                backgroundColor: colors.light,
              }}
              textInputStyle={{
                borderRadius: 10,
                padding: 6,
                paddingLeft: 10,
                borderWidth: 0,
                backgroundColor: colors.white,
              }}
              itemStyle={{
                // Single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                // Text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                // Items container style you can pass maxHeight
                // To restrict the items dropdown hieght
                maxHeight: '70%',
              }}
              items={searchItems}
              placeholder="Search..."
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.buttonContainer}>
            {/* <View style={styles.scanButton}></View> */}
            {/* <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan</Text>
              <Image source={scanIcon} style={{width: 20, height: 20}} />
            </TouchableOpacity> */}
          </View>
        </View>

        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.promotiomSliderContainer}>
            <SliderBox
              images={slides}
              sliderBoxHeight={140}
              dotStyle={{display: 'none'}}
              paginationBoxVerticalPadding={10}
              autoplayInterval={1000}
            />
          </View>
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>Shop By Category</Text>
          </View>
          <View style={styles.categoryContainer}>
            {/* <Categories /> */}

            {categories
              ? categories.map(data => (
                  <CategoryCard
                    key={data.id}
                    text={data.name_en}
                    image={data.image}
                    onPress={() =>
                      navigation.jumpTo('categories', {categoryInfo: data})
                    }
                  />
                ))
              : null}
          </View>
          <View style={styles.emptyView}></View>

          <View style={styles.orderSupportMainContainer}>
            <View style={styles.orderSupportContainer}>
              <View style={styles.orderSupportButtonIconSec}>
                <Image
                  source={orderSup1Icon1}
                  style={styles.orderSupportButtonIcon}
                />
              </View>
              <Text style={styles.orderSupportButtonText}>Free Shipping</Text>
            </View>
            <View style={styles.orderSupportContainer}>
              <View style={styles.orderSupportButtonIconSec}>
                <Image
                  source={orderSup1Icon4}
                  style={styles.orderSupportButtonIcon}
                />
              </View>
              <Text style={styles.orderSupportButtonText}>Secure Payment</Text>
            </View>
            <View style={styles.orderSupportContainer}>
              <View style={styles.orderSupportButtonIconSec}>
                <Image
                  source={orderSup1Icon3}
                  style={styles.orderSupportButtonIcon}
                />
              </View>
              <Text style={styles.orderSupportButtonText}>
                Easy Money Return
              </Text>
            </View>
            <View style={styles.orderSupportContainer}>
              <View style={styles.orderSupportButtonIconSec}>
                <Image
                  source={orderSup1Icon2}
                  style={styles.orderSupportButtonIcon}
                />
              </View>
              <Text style={styles.orderSupportButtonText}>
                Customer Support
              </Text>
            </View>
          </View>

          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>Feature Products</Text>
          </View>

          <View style={styles.productCardContainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              initialNumToRender={5}
              horizontal={true}
              data={products}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <View
                  key={item.id}
                  style={{marginLeft: 5, marginBottom: 10, marginRight: 5}}>
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
        </ScrollView>
      </View>
    </View>
  );
}
