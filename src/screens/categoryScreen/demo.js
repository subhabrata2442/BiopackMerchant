<script>
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

import React, {
    useState,
    useEffect
} from 'react';
import {
    colors,
    network
} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import cartIcon from '../../../assets/images/icons/cart_beg.png';
import emptyBox from '../../../assets/images/emptybox.png';

import {
    freeGames,
    paidGames,
    sliderData,
    category
} from '../../../data';
import CustomIconButton from '../../Components/CustomIconButton/CustomIconButton';

import NavigationDrawerHeader from '../../navigation/drawerHeader/Header2';
import SearchInput from '../../Components/CustomInput/SearchInput';
import ProductCard from '../../Components/ProductCard/ProductCard';
import SubCategoryCard from '../../Components/CustomIconButton/SubCategoryCard';
import styles from './styles';

export default function CategoriesScreen({
    navigation,
    route
}) {
    const {
        categoryInfo
    } = route.params;

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [refeshing, setRefreshing] = useState(false);
    const [label, setLabel] = useState('Loading...');
    const [error, setError] = useState('');
    const [foundItems, setFoundItems] = useState([]);
    const [filterItem, setFilterItem] = useState('');
    const [selectedTab, setSelectedTab] = useState([]);

    const [subCategory, setSubCategory] = useState([]);

    //console.warn(categoryInfo);

    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('authUserToken');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        const apiUrl = network.serverip + '/category';
        //const apiUrl = network.serverip + '/feature-product';
        //console.warn(token);
        //const res = await axios.get(network.serverip + '/category');
        const res = await axios.get(apiUrl, config);
        const result = await res.data.categories;

        //console.warn(result);

        setCategories(result);
        setSelectedTab(result[0]);

        setLoading(false);
        //getCategoryWiseItems(result[0]);
        //fetchProduct();
        //console.warn(result);
    };

    //get the dimenssions of active window
    const [windowWidth, setWindowWidth] = useState(
        Dimensions.get('window').width,
    );
    const windowHeight = Dimensions.get('window').height;

    const handleProductPress = product => {
        //console.warn(product);
        navigation.navigate('productdetail', {
            product: product
        });
    };

    const fetchProduct = async () => {
        const selected_cat_id = await selectedTab?.id;
        //console.warn(selected_cat_id);

        //alert('d');

        const token = await AsyncStorage.getItem('authUserToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
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

   
    

    //console.warn(subCategory);

    navigation.addListener('focus', async () => {
        if (categoryInfo) {
            const selected_cat_id = await categoryInfo.id;
            console.warn(selected_cat_id);
            //handleCategoryWiseItems(categoryInfo);
            setSelectedTab(categoryInfo);
        }
    });
    const handleGotoSubCategory = async item => {
        navigation.navigate('subCategory', {
            subCatItem: item
        });
    };

    const getCategoryWiseItems = async item => {
        const selected_cat_id = await item.id;

        //console.warn(selected_cat_id);
        setLoading(true);
        const token = await AsyncStorage.getItem('authUserToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        const apiUrl =
            network.serverip + '/category-wise-product/' + selected_cat_id;
        setError('');
        setLoading(false);
    };

    const handleCategoryWiseItems = async item => {
        setLoading(true);
        setSelectedTab(item);
        const selected_cat_id = await item.id;

        console.warn(selected_cat_id);

        const token = await AsyncStorage.getItem('authUserToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
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

    //method call on pull refresh
    const handleOnRefresh = () => {
        setRefreshing(true);
        //fetchProduct();
        setRefreshing(false);
    };

    //fetch the product on initial render
    useEffect(() => {
        //console.warn('ddd');
        getCategories();
        //fetchProduct();
    }, []);

    return ( <
        View style = {
            styles.container
        } >
        <
        StatusBar > < /StatusBar> <
        NavigationDrawerHeader navigationProps = {
            navigation
        }
        /> <
        View style = {
            styles.bodyContainer
        } >
        <
        View style = {
            {
                padding: 0,
                paddingLeft: 20,
                paddingRight: 20
            }
        } >
        <
        SearchInput radius = {
            5
        }
        placeholder = {
            'Search...'
        }
        value = {
            filterItem
        }
        setValue = {
            setFilterItem
        }
        /> <
        /View>

        <
        Loader loading = {
            loading
        }
        />

        <
        FlatList data = {
            categories
        }
        keyExtractor = {
            (index, item) => `${index}-${item}`
        }
        horizontal style = {
            {
                flexGrow: 0
            }
        }
        contentContainerStyle = {
            {
                padding: 10
            }
        }
        showsHorizontalScrollIndicator = {
            false
        }
        renderItem = {
            ({
                item: tab
            }) => ( <
                CustomIconButton key = {
                    tab
                }
                text = {
                    tab.name_en
                }
                image = {
                    tab.image
                }
                active = {
                    selectedTab?.name_en === tab.name_en ?
                    true : false
                }
                onPress = {
                    () => {
                        handleCategoryWiseItems(tab);
                    }
                }
                />
            )
        }
        />

        {
            subCategory.length > 0 ? (
                subCategory.map(data => ( <
                    View style = {
                        styles.categoryContainer
                    } >
                    <
                    SubCategoryCard key = {
                        data.id
                    }
                    text = {
                        data.name_en
                    }
                    image = {
                        data.image
                    }
                    onPress = {
                        () => {
                            handleGotoSubCategory(data);
                        }
                    }
                    /> <
                    /View>
                ))
            ) : ( <
                View style = {
                    styles.noItemContainer
                } >
                <
                View style = {
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.white,
                        height: 150,
                        width: 150,
                        borderRadius: 10,
                    }
                } >
                <
                Image source = {
                    emptyBox
                }
                style = {
                    {
                        height: 80,
                        width: 80,
                        resizeMode: 'contain'
                    }
                }
                /> <
                Text style = {
                    styles.emptyBoxText
                } >
                There no product in this category <
                /Text> <
                /View> <
                /View>
            )
        }

        {
            /* <View style={styles.categoryContainer}>
                                {subCategory
                                ? subCategory.map(data => (
                                <SubCategoryCard key={data.id} text={data.name_en} image={data.image} onPress={()=> {
                                    handleGotoSubCategory(data);
                                    }}
                                    />
                                    ))
                                    : null}
                            </View> */
        }

        {
            /* <FlatList data={foundItems.filter( (product)=> product?.main_category === selectedTab?.id
                                )}
                                refreshControl={
                                <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
                                }
                                keyExtractor={(index, item) => `${index}-${item}`}
                                contentContainerStyle={{ margin: 10 }}
                                numColumns={2}
                                renderItem={({ item: product }) => (
                                <View style={[ styles.productCartContainer, { width: (windowWidth - windowWidth * 0.1) / 2 }, ]}>
                                    <ProductCard cardSize={"large"} name={product.title_en} image={product.main_image}
                                        price={product.lowest_price} onPress={()=> handleProductPress(product)}
                                        onPressSecondary={() => handleAddToCat(product)}
                                        />
                                        <View style={styles.emptyView}></View>
                                </View>
                                )}
                                /> */
        } <
        /View> <
        /View>
    );
}