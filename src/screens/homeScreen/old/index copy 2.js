import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import scanIcon from "../../../assets/images/icons/scan_icons.png";
import BannerSlider from '../../Components/CarouselCardItem';
import {freeGames, paidGames, sliderData, category} from '../../../data';
import CustomIconButton from "../../Components/CustomIconButton/CustomIconButton";
import ProductCard from "../../Components/ProductCard/ProductCard";
import NavigationDrawerHeader from '../../navigation/drawerHeader/index';
import Feather from 'react-native-vector-icons/Feather';
import {windowWidth} from '../../utils/Dimensions';
import { colors } from "../../constants";

import styles from './styles';

import SearchableDropdown from "react-native-searchable-dropdown";
import { SliderBox } from "react-native-image-slider-box";


import CategoryCard from "../../Components/CustomIconButton/CategoryCard";
import Ionicons from 'react-native-vector-icons/Ionicons';

const slides = [
  require("../../../assets/images/homescreen/home-banner.jpg"),
  require("../../../assets/images/homescreen/game-2.jpeg"),
];

export default function HomeScreen({navigation}) {

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const [products, setProducts] = useState([]);
  const [searchItems, setSearchItems] = useState([]);

  //setProducts(freeGames);

  const handleSubmitPress = () => {
    console.warn('ddd');

  };



  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <NavigationDrawerHeader navigationProps={navigation} />
      <View style={styles.bodyContainer}>
        <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <SearchableDropdown
                onTextChange={(text) => console.log(text)}
                onItemSelect={(item) => console.log(item)}
                defaultIndex={0}
                containerStyle={{
                  borderRadius: 5,
                  width: "100%",
                  elevation: 5,
                  position: "absolute",
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
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: colors.white,
                  borderColor: colors.muted,
                }}
                itemTextStyle={{
                  color: colors.muted,
                }}
                itemsContainerStyle={{
                  maxHeight: "100%",
                }}
                items={searchItems}
                placeholder="Search..."
                resetValue={false}
                underlineColorAndroid="transparent"
              />

            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.scanButton}>
                <Text style={styles.scanButtonText}>Scan</Text>
                <Image source={scanIcon} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
        </View>

        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.promotiomSliderContainer}>
              <SliderBox
                images={slides}
                sliderBoxHeight={140}
                dotStyle={{ display: 'none' }}
                paginationBoxVerticalPadding={10}
                autoplayInterval={1000}
              />
          </View>
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>Shop By Category</Text>
          </View>
          <View style={styles.categoryContainer}>
          {category.map((data) => (
            <CategoryCard 
              key={data.id} 
              text={data.title} 
              image={data.image} 
              onPress={() =>
                navigation.jumpTo("categories", { categoryID: data })
              }
              />
            ))}
          </View>
          <View style={styles.emptyView}></View>

        <View style={styles.primaryTextContainer}>
          <Text style={styles.primaryText}>New Arrivals</Text>
        </View>
        
        <View style={styles.productCardContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                horizontal={true}
                data={paidGames.slice(0, 4)}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <View
                    key={item._id}
                    style={{ marginLeft: 5, marginBottom: 10, marginRight: 5 }}
                  >
                    <ProductCard
                      name={item.title}
                      image={item.poster}
                      price={item.price}
                      quantity={5}
                    />
                  </View>
                )}
              />
              <View style={styles.emptyView}></View>
         </View>

         <View style={styles.primaryTextContainer}>
          <Text style={styles.primaryText}>Feature Products</Text>
        </View>

        <View style={styles.productCardContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                horizontal={true}
                data={paidGames.slice(0, 4)}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <View
                    key={item._id}
                    style={{ marginLeft: 5, marginBottom: 10, marginRight: 5 }}
                  >
                    <ProductCard
                      name={item.title}
                      image={item.poster}
                      price={item.price}
                      quantity={5}
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
