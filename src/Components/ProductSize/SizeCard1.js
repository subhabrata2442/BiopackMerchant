import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import { colors } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dropdown } from 'react-native-element-dropdown';



const SizeCard = ({
    itemId,
    packSizeFrom,
    packSizeTo,
    currency,
    unitPrice,
    lowestPrice,
    uniid,
    productSize
  }) => {
    const [currencySymbol, setcurrencySymbol] = useState('');
    const [lowestPrices, setlowestPrices] = useState([{key: itemId, value: unitPrice}]);

    const [sizeVal, setSizeVal] = useState('');

    const dropdownData = [
      { label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' },
      { label: 'Item 3', value: '3' },
      { label: 'Item 4', value: '4' },
      { label: 'Item 5', value: '5' },
      { label: 'Item 6', value: '6' },
      { label: 'Item 7', value: '7' },
      { label: 'Item 8', value: '8' },
      ];

      const handleAddToCat = (input) => {
        // const _inputs = [...inputs];
        // const priceVal=_inputs[key].value;
        // //console.log(item);
        // //addCartItem(item);
  
        // //console.warn(item);
  
        console.warn(input);
       };

    //const [dataArray, setDataArray] = useState([]);


    

    // if(currency=='USD'){
    //     setcurrencySymbol('$');
    // }
    

    //const testp=itemId;
    console.warn(productSize);
    //console.log(lowestPrices);

    useEffect(() => {
        if(currency=='USD'){
            setcurrencySymbol('$');
        }

        // const _lowestPrices = [...lowestPrices];
        // _lowestPrices.push({key: itemId, value: unitPrice});
        // setlowestPrices(_lowestPrices);

    }, []);

    return (
    <View style={styles.accordianRowMainContainer}>
        {/* <View style={styles.accordianUnitPriceContainer}>
            <Text style={styles.accordianCosTextContainer}>Test-{uniid}-{itemId}-{lowestPrices[0].value}</Text>
        </View> */}
        <View style={styles.accordianUnitPriceContainer}>

        <Dropdown 
            style={styles.dropdown} 
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle} 
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle} 
            data={productSize} 
            search 
            maxHeight={300} 
            labelField="label"
            valueField="value"
            placeholder="Select Size" 
            searchPlaceholder="Search..."
            value=''
            onChange={item => {
              setSizeVal(item.size);
             
          }}
            />

            
        </View>
        <View style={styles.accordianUnitCosTContainer}>
            <Text style={styles.accordianCosTextContainer}>{currencySymbol}{lowestPrice}</Text>
            <Text style={styles.accordianCosSubTextContainer}>{currencySymbol}{lowestPrice} VAT</Text>
        </View> 
        <View style={styles.accordianUnitTotalContainer}>
            <Text style={styles.accordianTotalTextContainer}>{currencySymbol}{lowestPrice}</Text>
            <Text style={styles.accordianTotalSubTextContainer}>(Incl. VAT)</Text>
                        
            <View style={styles.addToCartcontainer}>
                <TouchableOpacity style={styles.addToCartBtnContainer} onPress={()=>handleAddToCat(itemId)}>
                    <Ionicons style={styles.addToCartbuttonIcon} name="arrow-back-circle-outline" size={30}/>
                    <Text style={styles.addToCartbuttonText}>  Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
  };
  
  export default SizeCard;

  const styles = StyleSheet.create({
    // dropdown: {
    //   margin: 16,
    //   height: 50,
    //   borderBottomColor: 'gray',
    //   borderBottomWidth: 0.5,
    // },
    // icon: {
    //   marginRight: 5,
    // },
    // placeholderStyle: {
    //   fontSize: 16,
    // },
    // selectedTextStyle: {
    //   fontSize: 16,
    // },
    // iconStyle: {
    //   width: 20,
    //   height: 20,
    // },
    // inputSearchStyle: {
    //   height: 40,
    //   fontSize: 16,
    // },
    bodyContainer:{
      paddingLeft:8,
      paddingRight:8
  
    },
    accordiancustomTitle:{
      fontWeight:"bold",
      color:"#000",
      fontSize:16,
  
  
    },
    accordianTopHeaderContainer:{
      display:"flex",
      flexDirection:"row",
      borderBottomWidth:1,
      borderBottomColor:"#999",
      paddingBottom:10,
      paddingTop:10,
  
    },
    accordianTopUnitPriceContainer:{
      width:'33.3337%',
    },
    accordianTopUnitCostContainer:{
      width:'33.3337%',
    },
    accordianTopUnitTotalContainer:{
      width:'33.3337%',
    },
    accordianTopUnitPriceTextContainer:{
      color:"#333",
      fontWeight:"bold",
    },
    accordianTopCostextContainer:{
      color:"#333",
      fontWeight:"bold",
    },
    accordianTopTotalTextContainer:{
      color:"#333",
      fontWeight:"bold",
    },
    accordianRowMainContainer:{
      display:"flex",
      flexDirection:"row",
      borderBottomWidth:1,
      borderBottomColor:"#999",
      paddingBottom:10,
      paddingTop:10,
    },
    accordianUnitPriceContainer:{
      paddingRight:20,
      width:'33.3337%',
    },
    accordianUnitCosTContainer:{
      width:'33.3337%',
    },
    accordianUnitTotalContainer:{
      width:'33.3337%',
    },
    accordianCosTextContainer:{
      fontWeight:"bold",
      color:"#333",
      fontSize:16
    },
    accordianCosSubTextContainer:{
      fontSize:13
    },
    accordianTotalTextContainer:{
      fontWeight:"bold",
      color:"#333",
      fontSize:16
    },
    accordianTotalSubTextContainer:{
      fontSize:13
    },
    productInfoBottomContainer:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginTop:40,
      paddingLeft:8,
      paddingRight:8
    },
    addToCartBtnContainer: {
      paddingTop:8,
      paddingBottom:8,
      paddingLeft:20,
      paddingRight:20,
      alignItems: "center",
      backgroundColor: "#6b9f34",
      display:"flex",
      flexDirection:"row"
    },
    addToCartbuttonText: {
      fontWeight: "bold",
      color: "#fff",
    },
    productPriceTextContainer:{
      fontSize:20,
      color:"#333",
      fontWeight:"900",
    },
    productFinalPriceTextContainer:{
      fontSize:18,
      color:"#666",
      fontWeight:"bold"
    },
    addToCartbuttonIcon:{
      fontSize:20,
      color:"#fff",
      marginRight:10
  
    }
  
    
    
    
  
  });