import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';

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

const Desc = ({ name }) => {
    const [list, setList] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [saleprice, setSalePrice] = useState(0);
    const [n, setN] = useState('');
    const [surname, setSurname] = useState('');
    const [supplier, setSupplier] = useState('');

    useEffect(() => {
        const fetchDetails = async() => {
            const q = query(collection(db, 'Items'), where("name", "==", name), where("status", "==", "Approved"), where("quantity", ">=", 1));
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
                    setSupplier(doc.data().supplier);
                });
                setList(productList);
            }
        }

        fetchDetails();
    }, []);

    useEffect(() => {
        const title = list
            .map(item => item.name);
        const uniqueTitle = [...new Set(title)];
        setTitle(uniqueTitle);

        const price = list
            .map(item => item.price);
        const uniquePrice = [...new Set(price)];
        setPrice(uniquePrice);

        const saleprice = list
            .map(item => item.saleprice);
        const uniqueSalePrice = [...new Set(saleprice)];
        setSalePrice(uniqueSalePrice);

    }, [list]);
    
    useEffect(() => {
        const fetchName = async() => {
            const q = query(collection(db, "Designer"), where("supplier", "==", supplier));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setN(doc.data().name);
                    setSurname(doc.data().surname);
                });
            }
        };

        fetchName();
    }, [supplier]);

    if(saleprice == 0)
    {
        return(
            <View style = {{ flex: 1 }}>
                <Text style = {styles.text}>{title}</Text>
                <Text style = {styles.text}>By {n} {surname}</Text>
                <Text style = {styles.text}>R{price}</Text>
            </View>
        );
    } 
    else 
    {
        return(
            <View style = {{ flex: 1 }}>
                <Text style = {styles.text}>{title}</Text>
                <Text style = {styles.text}>By {n} {surname}</Text>
                <Text style = {styles.text}>R{price} (Original Price)</Text>
                <Text style = {styles.text}>R{saleprice} (Sale Price)</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    text:
    {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 13,
        color: 'black'
    }
});

export default Desc;