import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, } from 'firebase/firestore';

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

const Total = ({ user, invoice }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchTotal = async() => {
            const q = query(collection(db, "Orders"), where("user", "==", user), where("status", "==", "Approved"), where("invoice", "==", invoice));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setTotal(total += doc.data().price);
                });
            }
        };
        
        fetchTotal();
    }, [total]);

    return(
        <View style = {styles.container}>
            <ScrollView style = {styles.scrollV}>
            <Text style = {styles.text}>Invoice Total: R{total}</Text>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        borderColor: 'black',
        borderWidth: 2,
        maxWidth: '100%',
        minWidth: '100%',
    },

    scrollV:
    {
        paddingVertical: 10,
    },

    text: 
    {
        fontFamily: 'sans-serif', 
        fontWeight: 'bold', 
        fontSize: 13.5, 
        paddingTop: 3,
        paddingLeft: 5
    },


});

export default Total;