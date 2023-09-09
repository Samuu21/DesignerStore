import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from "react-native";
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

const Category = ({ navigation, route }) => {
    const [list, setList] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Items"), where("category", "==", route.params.title), where("gender", "==", route.params.type), where("status", "==", "Approved"), where("quantity", ">=", 1));
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
    }, [route.params.type, route.params.title]);

    useEffect(() => {
        const name = list
            .map(item => item.name);
    
        const uniqueName = [...new Set(name)];
        setNames(uniqueName);

    }, [list]);
    
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
};
                    
const styles = StyleSheet.create({
    button:
    {
        backgroundColor: 'white',
        minWidth: '50%',
        maxWidth: '50%',
        minHeight: '50%',
        maxHeight: '50%',
        paddingHorizontal: 5,
        paddingBottom: 17.5,
        marginBottom: 5,
    }
});
                    
export default Category;