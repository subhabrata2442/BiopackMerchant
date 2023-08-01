import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, Image } from "react-native";
import axios from 'axios';
import { colors, network } from "../constants";
import CategoryCard from "../Components/CustomIconButton/CategoryCard";
import NavigationDrawerHeader from '../navigation/drawerHeader/index';


export default function Categories() {

//     const handleProductPress = (product) => {
//         navigation.navigate("productdetail", { product: product });
//       };

//   const [categories, setCategories] = useState([])
//   useEffect(() => {
//       const getCategory = async () => {
//           const res = await axios.get('https://biopack.aqualeafitsol.com/api/category')
//           setCategories(res.data.categories)
//           console.log("res.data", res.data.categories);
//       }
//       getCategory()
//   }, []);
//   return (
//     <>
//         {categories.map(data =>
//                     <CategoryCard key={data.id} text={data.name_en} image={data.image} onPress={()=>
//                         handleProductPress(data)
//                     }
//                     />
//                 )}
//     </>
// );
let payload = [];

let searchableItem = {name: 'test' };
payload.push(searchableItem);

console.warn(payload);






}

// const Categories = [
//     {
//         id: 1,
//         title: "Agro",
//     },
//     {
//         id: 2,
//         title: "Airlines",
//     }
//   ];

//   export default Categories;
