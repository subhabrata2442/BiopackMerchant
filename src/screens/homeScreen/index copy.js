import React, {useState,useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  ActivityIndicator
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontSize } from '../../constants';

const slides = [
  require("../../../assets/images/homescreen/home-banner.jpg"),
  require("../../../assets/images/homescreen/game-2.jpeg"),
];

export default function HomeScreen({ navigation, route }) {
  const [count,setCount]=useState(0);
  const [data,setData]=useState(10);

  useEffect(()=>{

  });

  

  useEffect(()=>{
    console.warn('update data');
  },[data]);

  return (
  <View>
    <Text style={{fontSize:20,color:'#000',textAlign:'center'}}>{data} hello World {count}</Text>

    <Button title='updata count' onPress={()=>setCount(count+1)} />
    <Button title='update data' onPress={()=>setData(data+1)} />
    <ActivityIndicator size={50} color="black" />

    <UserInfo info={{count}} />
  </View>
  );
}

const UserInfo = (props) =>{

  useEffect(()=>{
    console.warn('update count');
  },[props.info.count]);


  return (
    <View>
      <Text style={{fontSize:20,color:'#000',textAlign:'center'}}>{props.info.count} component World </Text>
  
     
    </View>
    );

}
