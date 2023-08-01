import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const SubCategoryCard = ({ id, text, image, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.buttonIconSec}>
        {/* <Image source={image} style={styles.buttonIcon} /> */}
        <Image style={styles.buttonIcon} source={{uri:image}}/>
      </View>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SubCategoryCard;

const styles = StyleSheet.create({
  container: {
    width:'25%',
    paddingLeft:5,
    paddingRight:5,
    marginTop:10,
    marginBottom:10

  },
  buttonIconSec: {
    width:'100%',
  },
  buttonIcon:{
    height:90,
    width:'100%',
    borderRadius:100
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign:'center',
    fontSize:15,
    marginTop:8,
    color:'#000'
  },
});
