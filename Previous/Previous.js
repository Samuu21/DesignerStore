import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import Advert from './Advert';
import Modal from 'react-native-modal';
import Item from './Item';
import Total from './Total';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, } from 'firebase/firestore';
import { decode } from 'base-64';

if(typeof atob === 'undefined') {
  global.atob = decode;
}

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

const Previous = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState('');
    const [invoice, setInvoice] = useState('');

    useEffect(() => {
        const fetchProducts = async() => {
            const userid = await SecureStore.getItemAsync('user');
            const q = query(collection(db, "Orders"), where("user", "==", userid), where("status", "==", "Sent_Dealt"));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                querySnapShot.forEach((doc) => {
                    setProducts(arr => [...arr, doc.data()]);
                });
            }
        };
        
        fetchProducts();
    }, [products]); 

    function toggleModal(user, invoice) {
        setUser(user);
        setInvoice(invoice);
        setIsModalVisible(!isModalVisible);
    };

    function toggleModall() {
        setIsModalVisible(!isModalVisible);
    };
    
    if(products.length <= 0) //This one is if there is no result.
    {
        return (
            <View style = {styles.container}>
                <Advert/>
                <ScrollView style = {styles.scrollV}>
                    <View style = {styles.scroll}>
                        <Image style = {{ width: 175, height: 175, resizeMode: 'contain', marginTop: 35, paddingBottom: 7.5}}
                            source = {require('../images/Cart.png')}/>
                        <Text style = {styles.desc}> There are no sent orders yet.</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
    else //This one is if there is a result.
    {
        return(
            <View style = {styles.container}>
                <Advert/>
                <ImageBackground source = {require('../images/cover8.png')} resizeMethod = 'scale'
                    style = {{flex: 1, justifyContent: 'center'}}>
                    <ScrollView style = {styles.scrollV}>
                    {products.map((item, key) => (
                        <TouchableOpacity style = {styles.hold}
                            key = {key}
                            onPress = {() => {toggleModal(item.user, item.invoice)}}>
                            <Text style = {styles.invoice}>Invoice Number: {item.invoice}</Text>
                            <Total user = {item.user} invoice = {item.invoice}/>
                        </TouchableOpacity>
                    ))}
                    <Text style = {styles.space}></Text>
                    </ScrollView>
                    <Modal
                        animationInTiming = {1000}
                        animationIn = {'slideInLeft'}
                        animationOutTiming = {1000}
                        animationOut = {'slideOutRight'}
                        isVisible = {isModalVisible}>
                        <View style = {styles.container}>
                            <Item invoice = {invoice} user = {user} />
                            <TouchableOpacity style = {styles.button2}
                                onPress = {() => {toggleModall()}}>
                                <Text style = {styles.buttonLabel2}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </ImageBackground>
            </View>
        )
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
        paddingBottom: 75
    },

    scrollV:
    {
        paddingVertical: 10,
    },

    space:
    {
        paddingBottom: 15,
    },

    desc:
    {
        paddingTop: 17.5,
        color: 'black',
        fontFamily: 'sans-serif-light',
        fontSize: 15
    },

    invoice:
    {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        paddingVertical: 7.5,
        paddingHorizontal: 2.5
    },

    hold:
    {
        marginLeft: 7.5,
        marginBottom: 10,
        paddingVertical: 12.5,
        paddingHorizontal: 2.75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: 
        {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.84,
        elevation: 10,
        minWidth: '95%',
        maxWidth: '95%',
        opacity: 0.85
    },

    button2:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'black',
        minWidth: '50%',
        maxWidth: '50%',
        padding: 5,
        marginVertical: 45,
    },

    buttonLabel2:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#e6c2bf',
        padding: 5,
    },
});

export default Previous;