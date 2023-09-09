import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';
import Advert from "./Advert";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import Desc from "./Desc";
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

const History = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const userid = await SecureStore.getItemAsync('user');
            const q = query(collection(db, "History"), where("user", "==", userid));
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
        const name = list
            .map(item => item.name);
    
        const uniqueName = [...new Set(name)];
        setNames(uniqueName);

    }, [list]);

    if(names.length <= 0)
    {
        return (
            <View style = {styles.container}>
                <Advert/>
                <View style = {styles.scroll}>
                    <Image style = {{ width: 175, height: 175, resizeMode: 'center', marginTop: 35, paddingBottom: 7.5}} 
                        source = {require('../images/Cart.png')}/>
                    <Text style = {styles.text}> There are no items you have browsed yet. Happy Shopping!</Text>
                </View>
            </View>
        );
    }
    else
    {
        const Item = ({ name }) => {
        
            return(
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = { () => {navigation.navigate('Product', {name: name})}}>
                    <Photo name = {name} />
                    <Desc name = {name} />
                </TouchableOpacity>
            );
        };
                    
        const renderItem = ({ item }) => (
            <Item 
                name = {item}/>
        );

        return (
            <SafeAreaView style = {{flex: 1, maxWidth: '100%', minwidth: '100%', maxHeight: '100%', minHeight: '100%', backgroundColor: 'white', paddingBottom: 100}}>
                <Advert/>
                <FlatList
                    style = {{backgroundColor: 'white', minHeight: '100%', minWidth: '100%', paddingTop: 10}}
                    horizontal = {false}
                    numColumns = {2}
                    data = {names}
                    renderItem = {renderItem}
                    keyExtractor = {(_, index) => String(index)}/>
            </SafeAreaView>
        );
    }
};
                    
const styles = StyleSheet.create({
    container:
    {
        backgroundColor: 'white',
        minWidth: '100%',
        maxWidth: '100%',
        flex: 1,
    },

    scroll:
    {
        justifyContent: 'center',
        alignItems: 'center',
    },

    text:
    {
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,
    },

    button:
    {
        backgroundColor: 'white',
        margin: 0.5,
        paddingVertical: 17.5,
        paddingHorizontal: 5,
        minWidth: '50%',
        maxWidth: '50%'
    },
                    
    text:
    {
        paddingBottom: 2,
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: 'black'
    },
});
                    
export default History;