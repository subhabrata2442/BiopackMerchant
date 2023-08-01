import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import { colors } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

export default class Accordian extends Component{
    
    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
    }
  
  render() {
    return (
        <View>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Ionicons name={this.state.expanded ? 'arrow-up' : 'arrow-down'} size={30} color={colors.danger} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <View style={styles.accordianTopHeaderContainer}>
                        <View style={styles.accordianTopUnitPriceContainer}><Text style={styles.accordianTopUnitPriceTextContainer}>Unit Price</Text></View>
                        <View style={styles.accordianTopUnitCostContainer}><Text style={styles.accordianTopCostextContainer}>Cost</Text></View>
                        <View style={styles.accordianTopUnitTotalContainer}><Text style={styles.accordianTopTotalTextContainer}>Total</Text></View>
                    </View>

                    <View style={styles.accordianRowMainContainer}>
                        <View style={styles.accordianUnitPriceContainer}>
                        {renderLabel()}
                            <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                                />
                            )}
                            />

                            
                        </View>
                        <View style={styles.accordianUnitCosTContainer}>
                            <Text style={styles.accordianCosTextContainer}>$20.00</Text>
                            <Text style={styles.accordianCosSubTextContainer}>$ 2.05 VAT</Text>
                        </View> 
                        <View style={styles.accordianUnitTotalContainer}>
                            <Text style={styles.accordianTotalTextContainer}>$22.55</Text>
                            <Text style={styles.accordianTotalSubTextContainer}>(Incl. VAT)</Text>
                        </View>
                    </View>

                      
                </View>
            }
       </View>
    )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
        color: colors.DARKGRAY,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: colors.CGRAY,
    },
    parentHr:{
        height:1,
        color: colors.WHITE,
        width:'100%'
    },
    child:{
        backgroundColor: colors.LIGHTGRAY,
        padding:16,
    }
    
});