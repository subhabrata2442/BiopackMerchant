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
  const getCategories = async () => {
    const selected_cat_id = await subCatItem.id;
    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl =
      network.serverip + '/category-wise-product/' + selected_cat_id;
    const res = await axios.get(apiUrl, config);
    const result = await res.data.categories;
    setCategories(result);
    //setSelectedTab(result[0]);
    //fetchProduct();
    //console.warn(result);
  };

  const handleGotoProduct = async item => {
    console.warn(item);
    navigation.navigate('subCategoryProductScreen', {subCatItem: item});
  };

  //console.warn(route.params);

  //fetch the product on initial render
  useEffect(() => {
    setSelectedTab(subCatItem.id);
    getCategories();
    //fetchProduct();
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

        <View style={styles.categoryContainer}>
          {categories
            ? categories.map(data => (
                <SubCategoryCard
                  key={data.id}
                  text={data.name_en}
                  image={data.image}
                  onPress={() => {
                    handleGotoProduct(data);
                  }}
                />
              ))
            : null}
        </View>
      </View>
    </View>
  );
}
