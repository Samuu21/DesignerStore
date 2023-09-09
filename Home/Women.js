import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBz1NwWgjC9U4CU7nRcWtwVp6aBkOIhN_Q",
    authDomain: "malgre-business.firebaseapp.com",
    projectId: "malgre-business",
    storageBucket: "malgre-business.appspot.com",
    messagingSenderId: "9807951283",
    appId: "1:9807951283:web:b841f4d997e169da6e87c6",
    measurementId: "G-3JJFPCV0H6"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Women = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [list, setList] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
          const q = query(collection(db, "Items"), where("gender", "==", "Women"), where("status", "==", "Approved"));
          const querySnapShot = await getDocs(q);
          if(querySnapShot.empty)
          {
              //
          } 
          else 
          {
              const productList = [];
              querySnapShot.forEach((doc) => {
                productList.push(doc.data());
              });
              setList(productList);
          }
        };
    
        fetchProducts();
      }, []);
    
      useEffect(() => {
        const WomenCategories = list
          .filter(item => item.gender === 'Women')
          .map(item => item.category);
    
        const uniqueCategories = [...new Set(WomenCategories)];
        setCategories(uniqueCategories);
      }, [list]);

    return(
        <ScrollView style={styles.scroll} 
            horizontal = {true}
            showsHorizontalScrollIndicator={false}>
            <Text style = {styles.gender}>Women</Text>
            {categories.map((item, key) => (
                <TouchableOpacity
                    key = {key} 
                    style = {styles.button} 
                    onPress = { () => navigation.navigate('Category', {title: item, type: 'Women'})}>
                    <Text style = {styles.text}>{item}</Text>
                </TouchableOpacity>
            )
            )}
         </ScrollView>
);}

const styles = StyleSheet.create({
    scroll:
    {
        flex: 1,
        flexDirection: 'row'
    },

    gender:
    {
        color: 'white',
        fontSize: 15,
        borderColor: 'black',
        backgroundColor: 'black',
        marginRight: 0.5,
        padding: 12.5         
    },

    button:
    {
        textAlign: "center",
        borderColor: '#e6c2bf',
        backgroundColor: '#e6c2bf',
        margin: 0,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        paddingLeft: 35,
        paddingRight: 35
    },

    text:
    {
        color: 'black',
        fontSize: 15
    }
});

export default Women;