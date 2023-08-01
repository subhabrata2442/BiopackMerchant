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

import React, {useState, useEffect} from 'react';
import {colors, network} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cartIcon from '../../../assets/images/icons/cart_beg.png';
import emptyBox from '../../../assets/images/emptybox.png';

import {freeGames, paidGames, sliderData, category} from '../../../data';
import CustomIconButton from '../../Components/CustomIconButton/CustomIconButton';

import NavigationDrawerHeader from '../../navigation/drawerHeader/Header2';
import SearchInput from '../../Components/CustomInput/SearchInput';
import ProductCard from '../../Components/ProductCard/ProductCard';
import SubCategoryCard from '../../Components/CustomIconButton/SubCategoryCard';
import styles from './styles';

export default function CategoriesScreen({navigation, route}) {
  const {categoryInfo} = route.params;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [label, setLabel] = useState('Loading...');
  const [error, setError] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState('');
  const [selectedTab, setSelectedTab] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  //get the dimenssions of active window
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const windowHeight = Dimensions.get('window').height;
  const handleGotoSubCategory = async item => {
    navigation.navigate('subCategory', {
      subCatItem: item,
    });
  };
  const handleProductPress = product => {
    //console.warn(product);
    navigation.navigate('productdetail', {
      product: product,
    });
  };

  const handleCategoryWiseItems = async item => {
    setLoading(true);
    setSelectedTab(item);
    const selected_cat_id = await item.id;

    //console.warn(selected_cat_id);

    const token = await AsyncStorage.getItem('authUserToken');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl =
      network.serverip + '/category-wise-product/' + selected_cat_id;
    const cwpres = await axios.get(apiUrl, config);
    const cwpProductResult = await cwpres.data.products;
    const isSubCategory = await cwpres.data.is_sub_category;
    const cwpCategories = await cwpres.data.categories;

    setSubCategory(cwpCategories);
    setProducts(cwpProductResult);
    setFoundItems(cwpProductResult);
    setError('');
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('authUserToken');

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const apiUrl = network.serverip + '/category';
    const res = await axios.get(apiUrl, config);
    const result = await res.data.categories;
    setCategories(result);

    if (categoryInfo) {
      setSelectedTab(categoryInfo);
      setLoading(false);
      //handleCategoryWiseItems(categoryInfo);
    } else {
      setSelectedTab(result[0]);
      handleCategoryWiseItems(result[0]);
    }
  };

  //fetch the product on initial render
  useEffect(() => {
    //console.warn('d1');
    getCategories();
  }, []);
  useEffect(() => {
    //console.warn('d2');
    if (categoryInfo) {
      setSelectedTab(categoryInfo);
      handleCategoryWiseItems(categoryInfo);
    }
  }, [categoryInfo]);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <NavigationDrawerHeader navigationProps={navigation} />
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
          data={categories}
          keyExtractor={(index, item) => `${index}-${item}`}
          horizontal
          style={{flexGrow: 0}}
          contentContainerStyle={{padding: 10}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item: tab}) => (
            <CustomIconButton
              key={tab}
              text={tab.name_en}
              image={tab.image}
              active={selectedTab?.name_en === tab.name_en ? true : false}
              onPress={() => {
                handleCategoryWiseItems(tab);
              }}
            />
          )}
        />

        {subCategory.length > 0 ? (
          subCategory.map(data => (
            <View style={styles.categoryContainer} key={data.id}>
              <SubCategoryCard
                key={data.id}
                text={data.name_en}
                image={data.image}
                onPress={() => {
                  handleGotoSubCategory(data);
                }}
              />
            </View>
          ))
        ) : (
          <View style={styles.noItemContainer}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.white,
                height: 150,
                width: 150,
                borderRadius: 10,
              }}>
              <Image
                source={emptyBox}
                style={{height: 80, width: 80, resizeMode: 'contain'}}
              />

              <Text style={styles.emptyBoxText}>
                There no product in this category
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
