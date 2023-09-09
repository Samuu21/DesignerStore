import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Advert from "./Advert";
import Women from "./Women";
import Men from "./Men";
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

const Gender = ({navigation, route}) => {
    const [categories, setCat] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, "Items"), where("gender", "==", route.params.title), where("status", "==", "Approved"));
            const querySnapShot = await getDocs(q);

            if (querySnapShot.empty) 
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
        const cats = list
            .filter(item => item.gender === route.params.title)
            .map(item => item.category);
    
        const uniqueCats = [...new Set(cats)];
        setCat(uniqueCats);

    }, [list]);
    
    if(route.params.title === 'Men')
    { 
        const Item = ({ title }) => (
            <TouchableOpacity 
                style = {styles.button}
                onPress = { () => navigation.navigate('Category', {title: title, type: 'Men'})}>
                    <Image style = {{ width: 90, height: 90, resizeMode: 'contain', borderRadius: 85,}}
                        source = {Men[title]}/>
                    <Text style = {styles.text}>{title}</Text>
            </TouchableOpacity>
        );
                    
        const renderItem = ({ item }) => (
            <Item 
                title = {item}/>
        );

        return (
            <SafeAreaView style = {{flex: 1, maxWidth: '100%', minwidth: '100%', maxHeight: '100%', minHeight: '100%', backgroundColor: 'white', paddingBottom: 90}}>
                <Advert/>
                <FlatList
                    style = {{backgroundColor: 'white', minHeight: '100%', minWidth: '100%', paddingTop: 10}}
                    horizontal = {false}
                    numColumns = {3}
                    data = {categories}
                    renderItem = {renderItem}
                    keyExtractor = {(_, index) => String(index)}/>
            </SafeAreaView>
        );
    }
    else
    {
        const Item = ({ title }) => (
            <TouchableOpacity 
                style = {styles.button}
                onPress = { () => navigation.navigate('Category', {title: title, type: 'Women'})}>
                    <Image style = {{ width: 90, height: 90, resizeMode: 'contain', borderRadius: 85,}}
                        source = {Women[title]}/>
                    <Text style = {styles.text}>{title}</Text>
            </TouchableOpacity>
        );
                    
        const renderItem = ({ item }) => (
            <Item 
                title = {item}/>
        );

        return (
            <SafeAreaView style = {{flex: 1, maxWidth: '100%', minwidth: '100%', maxHeight: '100%', minHeight: '100%', backgroundColor: 'white', paddingBottom: 90}}>
                <Advert/>
                <FlatList
                    style = {{backgroundColor: 'white', minHeight: '100%', minWidth: '100%', paddingTop: 10}}
                    horizontal = {false}
                    numColumns = {3}
                    data = {categories}
                    renderItem = {renderItem}
                    keyExtractor = {(_, index) => String(index)}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    button:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        minWidth: '33.3%',
        maxWidth: '33.3%',
    },
                    
    text:
    {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25,
        paddingRight: 5,
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: 'black'
    },
});

export default Gender;