import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Image, ScrollView, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import Photo from "./Photo";

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

const Under = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Items"), where("price", "<=", 150.00), where("status", "==", "Approved"));
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
        const names = list
            .map(item => item.name);
    
        const uniqueNames= [...new Set(names)];
        setProducts(uniqueNames);

    }, [list]);

    return(
    <ScrollView style={styles.scroll} 
        horizontal = {true}
        showsHorizontalScrollIndicator={true}>
        {products.map((item, key) => (
            <TouchableOpacity 
                style = {styles.button}
                key = {key}
                onPress = { () => {navigation.navigate('Product', {name: item})}}>
                <Photo name = {item}/>
            </TouchableOpacity>
        )
        )}
     </ScrollView>
);}

const styles = StyleSheet.create({
    scroll:
    {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 2.5,
        marginRight: 2.5,
        marginTop: 7.5,
        marginBottom: 7.5,
        padding: 2.5,
    },

    button:
    {
        margin: 1.5,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
});

export default Under;