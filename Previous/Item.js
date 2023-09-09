import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection } from 'firebase/firestore';
import { decode } from 'base-64';
import Photo from './Photo';

if(typeof atob === 'undefined') {
  global.atob = decode;
}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const Item = ({ invoice, user }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchProducts = async() => {
            const q = query(collection(db, "Orders"), where("user", "==", user), where("status", "==", 'Sent_Received'), where("invoice", "==", invoice));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setProducts(arr => [...arr, doc.data()]);
                    setTotal(total += doc.data().price);
                });
            }
        };
        
        fetchProducts();
    }, [products]);

    const Item = ({ name, top, bottom, bra, cup, quantity, supplier }) => {
        if(top != "" && bottom == "" && cup == "")
        {
            return(
                <View style = {styles.button}>
                    <Photo id = {supplier} name = {name} />
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.text}>{name}</Text>
                        <Text style = {styles.text}>Size: {top}</Text>
                        <Text style = {styles.text}>Quantity: {quantity}</Text>
                    </View>
                </View>
            );
        }
        else if(top == "" && bottom != "" && cup == "")
        {
            return(
                <View style = {styles.button}>
                    <Photo id = {supplier} name = {name} />
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.text}>{name}</Text>
                        <Text style = {styles.text}>Size: {bottom}</Text>
                        <Text style = {styles.text}>Quantity: {quantity}</Text>
                    </View>
                </View>
            );
        }
        else if(top != "" && bottom != "" && cup == "")
        {
            return(
                <View style = {styles.button}>
                    <Photo id = {supplier} name = {name} />
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.text}>{name}</Text>
                        <Text style = {styles.text}>Size: {top} - {bottom}</Text>
                        <Text style = {styles.text}>Quantity: {quantity}</Text>
                    </View>
                </View>
            );
        }
        else if(top != "" && bottom == "" && cup != "")
        {
            return(
                <View style = {styles.button}>
                    <Photo id = {supplier} name = {name} />
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.text}>{name}</Text>
                        <Text style = {styles.text}>Size: {top}(top) - {bra}{cup}(bra)</Text>
                        <Text style = {styles.text}>Quantity: {quantity}</Text>
                    </View>
                </View>
            );
        }
        else if(top == "" && bottom != "" && cup != "")
        {
            return(
                <View style = {styles.button}>
                    <Photo id = {supplier} name = {name} />
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.text}>{name}</Text>
                        <Text style = {styles.text}>Size: {bottom}(bottom) - {bra}{cup}(bra)</Text>
                        <Text style = {styles.text}>Quantity: {quantity}</Text>
                    </View>
                </View>
            );
        }
        else if(top != "" && bottom != "" && cup != "")
        {
            return(
                <View style = {styles.button}>
                    <Photo id = {supplier} name = {name} />
                    <View style = {{ flex: 1 }}>
                        <Text style = {styles.text}>{name}</Text>
                        <Text style = {styles.text}>Size: {top}(top) - {bottom}(bottom) - {bra}{cup}(bra)</Text>
                        <Text style = {styles.text}>Quantity: {quantity}</Text>
                    </View>
                </View>
            );
        }
    };
                    
    const renderItem = ({ item }) => (
        <Item 
            name = {item.name}
            top = {item.top}
            bottom = {item.bottom}
            bra = {item.bra}
            cup = {item.cup}
            quantity = {item.quantity}
            supplier = {item.supplier} />
    );

    return (
        <SafeAreaView style = {{flex: 1, maxWidth: '100%', minwidth: '100%', maxHeight: '100%', minHeight: '100%', backgroundColor: 'white', paddingBottom: 100, justifyContent: 'center'}}>
            <Text style = {styles.header}>Previous Order Form:</Text>
            <FlatList
                style = {{backgroundColor: 'white', minHeight: '100%', minWidth: '90%', maxWidth: '90%', paddingTop: 10, borderTopColor: 'black', borderTopWidth: 1, borderBottomColor: 'black', borderBottomWidth: 1,}}
                horizontal = {false}
                numColumns = {2}
                data = {products}
                renderItem = {renderItem}
                keyExtractor = {(_, index) => String(index)}/>
            <View style = {{ paddingVertical: 2.5, borderBottomColor: 'black', borderBottomWidth: 2.5, borderTopColor: 'black', borderTopWidth: 2.5 }}>
                <Text style = {{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 15}}>Invoice Number: {invoice}</Text>
                <Text style = {{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 15}}>Invoice Total: R{total}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },

    header:
    {
        color: 'black',
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'sans-serif',
        fontSize: 18,
        paddingBottom: 15,
    },

    form:
    {
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 1,
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    label:
    {
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,
        marginBottom: 1,
    },

    destination:
    {
        flex: 1,
        alignSelf: 'center',
        paddingVertical: 3.25
    },

    text:
    {
        fontFamily: 'sans-serif',
        fontSize: 15,
        fontWeight:'bold'
    },

    hold:
    {
        alignSelf: 'center',
    },
});

export default Item;