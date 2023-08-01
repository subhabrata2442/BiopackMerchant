import {
    Image,
    TouchableOpacity,
    View,
    StatusBar,
    Text,
    SafeAreaView,
    Platform,
    UIManager,
    ScrollView,
    Dimensions,
    useWindowDimensions
  } from "react-native";

  import RenderHtml from 'react-native-render-html';
  import React, { useState, useEffect } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import styles from './productInfoScreenStyles';

  const ProductInfoScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const { width } = useWindowDimensions();
    const package_desc_en = {
      html: product?.package_desc_en
    };
    const technical_specification_en = {
      html: product?.technical_specification_en
    };
    const product_datasheet_en = {
      html: product?.product_datasheet_en
    };
    const description_en = {
      html: product?.description_en
    };
    const shipping_information_en = {
      html: product?.shipping_information_en
    };
    

      useEffect(() => {
    }, []);

    const screenHeight = Dimensions.get('window').height;
    //console.warn(screenHeight);

    
    return (
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <View style={styles.bodyContainer}>
          <View style={styles.topBarContainer}>
            <TouchableOpacity style={styles.topBarBtnContainer} onPress={() => {navigation.goBack();}}>
            <Ionicons style={styles.topBarIconContainer}
              name="arrow-back-circle-outline"
              size={30}
              color={colors.muted}
            />
            <Text style={styles.topBarTextContainer}>Product Details</Text>
          </TouchableOpacity>
        </View>

        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.mainContainer}>
          <View style={styles.colorMainContainer}>
                <View style={styles.colorTextMainContainer}><Text style={styles.colorTextContainer}>Available Colours</Text></View>
                <View style={styles.colorContainer}>
                  <View style={styles.colorAttrMainContainer}>
                    <View style={styles.colorAttContainer}></View>
                    <Text style={styles.colorAttTextontainer}>Matt Black</Text>
                  </View>
                  <View style={styles.colorAttrMainContainer}>
                    <View style={styles.colorAttContainer2}></View>
                    <Text style={styles.colorAttTextontainer}>Matt White</Text>
                  </View>
                  <View style={styles.colorAttrMainContainer}>
                    <View style={styles.colorAttContainer3}></View>
                    <Text style={styles.colorAttTextontainer}>Brown Kraft</Text>
                  </View>
                </View>
              </View>
            <View style={styles.tabMainContainer}>
              <View style={styles.tabContainer}>
                <View style={styles.tabMainTitleContainer}><Text style={styles.tabTitleContainer}>Package Description</Text></View>
                <View style={styles.tabMainTextContainer}>
                  <RenderHtml contentWidth={width} source={package_desc_en} style={styles.tabTextContainer}/>
                  </View>
              </View>
              <View style={styles.tabContainer}>
                <View style={styles.tabMainTitleContainer}><Text style={styles.tabTitleContainer}>Technical Specification</Text></View>
                <View style={styles.tabMainTextContainer}>
                  <RenderHtml contentWidth={width} source={technical_specification_en} style={styles.tabTextContainer}/>
                </View>
              </View>
              <View style={styles.tabContainer}>
                <View style={styles.tabMainTitleContainer}><Text style={styles.tabTitleContainer}>Product Datasheet</Text></View>
                <View style={styles.tabMainTextContainer}>
                  <RenderHtml contentWidth={width} source={product_datasheet_en} style={styles.tabTextContainer}/>
                </View>
              </View>
              <View style={styles.tabContainer}>
                <View style={styles.tabMainTitleContainer}><Text style={styles.tabTitleContainer}>Description</Text></View>
                <View style={styles.tabMainTextContainer}>
                  <RenderHtml contentWidth={width} source={description_en} style={styles.tabTextContainer}/>
                </View>
              </View>
              <View style={styles.tabContainer}>
                <View style={styles.tabMainTitleContainer}><Text style={styles.tabTitleContainer}>Shipping Information</Text></View>
                <View style={styles.tabMainTextContainer}>
                  <RenderHtml contentWidth={width} source={shipping_information_en} style={styles.tabTextContainer}/>
                </View>
              </View>
              <View style={styles.tabContainer}>
                <View style={styles.tabMainTitleContainer}><Text style={styles.tabTitleContainer}>Seller Information</Text></View>
                <View style={styles.tabMainTextContainer}>
                  <Text style={styles.tabTextContainer}>Soft Cartoonbox Package Pvt Ltd</Text>
                </View>
              </View>
            </View>

            <View style={styles.buttomIconContainer}>
              <View style={styles.buttomLeftIconContainer}>
                <Image source={require('../../../assets/images/icons/drink.png')} style={styles.leftImgContainer}/>
                <Image source={require('../../../assets/images/icons/product-details-icon1.png')} style={styles.leftImgContainer}/>
                <Image source={require('../../../assets/images/icons/recycle.png')} style={styles.leftImgContainer}/>
                <Image source={require('../../../assets/images/icons/product-details-icon2.png')} style={styles.leftImgContainer}/>
              </View>
              <View style={styles.buttomRightIconContainer}>
                <Image source={require('../../../assets/images/icons/track.png')} style={styles.rightImgContainer}/>
                <Text style={styles.buttomTitleContainer}>Free Delivery on order $500</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        </View>
      </View>
    );
  };
  
export default ProductInfoScreen;
  
  