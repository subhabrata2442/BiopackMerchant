import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Components/Loader';
import biopacklogo from '../../../assets/images/logo.png';

import React, {useState, useEffect} from 'react';
import {colors, network} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cartIcon from '../../../assets/images/icons/cart_beg.png';
import emptyBox from '../../../assets/images/emptybox.png';

import {useSelector, useDispatch} from 'react-redux';

import {freeGames, paidGames, sliderData, category} from '../../../data';
import CustomIconButton from '../../Components/CustomIconButton/CustomIconButton';

import NavigationDrawerHeader from '../../navigation/drawerHeader/Header2';
import SearchInput from '../../Components/CustomInput/SearchInput';
import ProductCard from '../../Components/ProductCard/ProductCard';
import SubCategoryCard from '../../Components/CustomIconButton/SubCategoryCard';
import styles from './styles';

export default function SubCategoriesScreen({navigation, route}) {
  const {subCatItem} = route.params;

  const cartproduct = useSelector(state => state.product);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [label, setLabel] = useState('Loading...');
  const [error, setError] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState('');
  const [selectedTab, setSelectedTab] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [categories, setCategories] = useState([]);

  //get the dimenssions of active window
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const windowHeight = Dimensions.get('window').height;

  const fetchProduct = async () => {
    const selected_cat_id = await subCatItem.id;
    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl =
      network.serverip + '/category-wise-product/' + selected_cat_id;
    const res = await axios.get(apiUrl, config);
    const cwpProductResult = await res.data.products;

    setProducts(cwpProductResult);
    setFoundItems(cwpProductResult);
    setError('');
    setLoading(false);
    //console.warn(cwpProductResult);
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    //fetchProduct();
    setRefreshing(false);
  };

  const handleProductPress = product => {
    //console.warn(product);
    navigation.navigate('productdetail', {product: product});
  };

  //console.warn(route.params);

  //fetch the product on initial render
  useEffect(() => {
    setSelectedTab(subCatItem.id);
    //getCategories();
    fetchProduct();

    //console.warn(subCatItem.id);
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
      <View style={styles.bodyContainer}>
        <View style={{padding: 0, paddingLeft: 20, paddingRight: 20}}>
          <SearchInput
            radius={5}
            placeholder={'Search...'}
            value={filterItem}
            setValue={setFilterItem}
          />
        </View>
        <Loader loading={loading} />

        <FlatList
          data={foundItems}
          refreshControl={
            <RefreshControl
              refreshing={refeshing}
              onRefresh={handleOnRefresh}
            />
          }
          keyExtractor={(index, item) => `${index}-${item}`}
          contentContainerStyle={{margin: 10}}
          numColumns={2}
          renderItem={({item: product}) => (
            <View
              style={[
                styles.productCartContainer,
                {width: (windowWidth - windowWidth * 0.1) / 2},
              ]}>
              <ProductCard
                cardSize={'large'}
                name={product.title_en}
                image={product.main_image}
                price={product.lowest_price}
                onPress={() => handleProductPress(product)}
                onPressSecondary={() => ''}
              />
              <View style={styles.emptyView}></View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
