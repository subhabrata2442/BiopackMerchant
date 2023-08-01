import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Alert,
} from 'react-native';
import {colors} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';

const currencyData = [
  {label: 'AED', value: 'USD'},
  {label: 'AFN', value: 'USD'},
];

const SizeCard = ({
  itemId,
  packSizeFrom,
  packSizeTo,
  currency,
  unitPrice,
  lowestPrice,
  uniid,
  sizeList,
}) => {
  const [currencySymbol, setcurrencySymbol] = useState('');
  const [costPrice, setCostPrice] = useState(0.0);
  const [vatPrice, setVatPrice] = useState(0.0);
  const [totalPrice, setTotalPrice] = useState(0.0);

  const [sizeVal, setSizeVal] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const [sizeDataField, setSizeDataField] = useState([]);

  const handleAddToCat = input => {
    console.warn(input);
  };

  useEffect(() => {
    if (currency == 'USD') {
      setcurrencySymbol('$');
    }
    if (sizeList.length > 0) {
      sizeList.map((v, i) => {
        setSizeDataField(prev => {
          return [
            ...prev,
            {label: String(v['label']), value: String(v['value'])},
          ];
        });
      });
      if (typeof sizeDataField[0] !== 'undefined') {
        setSizeVal(sizeDataField[0]['value']);
      }
    }
  }, []);

  useEffect(() => {
    if (sizeVal !== '') {
      var recordsSorted = {};
      console.log(
        '============= Hello hello hello =================================',
      );
      recordsSorted = sizeList.filter(function (o) {
        console.log(o);
        return o['id'] === String(sizeVal);
      });

      setCostPrice(recordsSorted[0]['cost']);
      setVatPrice(recordsSorted[0]['vat']);
      setTotalPrice(recordsSorted[0]['total']);
    } else {
      setCostPrice(0.0);
      setVatPrice(0.0);
      setTotalPrice(0.0);
    }
  }, [sizeVal]);

  return (
    <View style={styles.accordianRowMainContainer}>
      <View style={styles.accordianUnitPriceContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={sizeDataField}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={sizeVal}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSizeVal(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <View style={styles.accordianUnitCosTContainer}>
        <Text style={styles.accordianCosTextContainer}>
          {currencySymbol}
          {costPrice}
        </Text>
        <Text style={styles.accordianCosSubTextContainer}>
          +{currencySymbol}
          {vatPrice} VAT
        </Text>
      </View>
      <View style={styles.accordianUnitTotalContainer}>
        <Text style={styles.accordianTotalTextContainer}>
          {currencySymbol}
          {totalPrice}
        </Text>
        <Text style={styles.accordianTotalSubTextContainer}>(Incl. VAT)</Text>

        <View style={styles.addToCartcontainer}>
          <TouchableOpacity
            style={styles.addToCartBtnContainer}
            onPress={() => handleAddToCat(itemId)}>
            <Ionicons
              style={styles.addToCartbuttonIcon}
              name="arrow-back-circle-outline"
              size={30}
            />
            <Text style={styles.addToCartbuttonText}> Add to Cart</Text>
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
  bodyContainer: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  accordiancustomTitle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
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
