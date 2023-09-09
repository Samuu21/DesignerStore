import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Image, Text, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import Advert from './Advert';
import Photo from './Photo';
import Pop from './Pop';
import Modal from 'react-native-modal';
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

const Cart = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [top, setTop] = useState(null);
    const [bottom, setBottom] = useState(null);
    const [bra, setBra] = useState(null);
    const [cup, setCup] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async() => {
            const userid = await SecureStore.getItemAsync('user');
            setId(userid);
            const q = query(collection(db, "Cart"), where("user", "==", userid));
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

        fetchCart();
    }, []);

    function toggleModall() {
        setIsModalVisible(!isModalVisible);
    };  

    function toggleModal(name, price, top, bottom, bra, cup) {
        setName(name); 
        setPrice(price);
        setTop(top); 
        setBottom(bottom);
        setBra(bra)
        setCup(cup);
        setIsModalVisible(!isModalVisible);
    };

    if(products.length <= 0) //This one is if there is no result.
    {
        return (
            <View style = {styles.container}>
                <Advert/>
                <View style = {styles.scroll}>
                    <Image style = {{ width: 175, height: 175, resizeMode: 'center', marginTop: 35, paddingBottom: 7.5}} 
                        source = {require('../images/Cart.png')}/>
                    <Text style = {styles.text}> There are no items in your cart yet. Happy Shopping!</Text>
                </View>
            </View>
        );
    }
    else //This one is if there is a result.
    {
        const Item = ({ name, price, top, bottom, bra, cup, quantity }) => {
            if(top != "" && bottom == "" && cup == "")
            {
                return(
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = { () => {toggleModal(name, price, top, bottom, bra, cup)}}>
                        <Photo name = {name} />
                        <View style = {{ flex: 1 }}>
                            <Text style = {styles.text}>{name}</Text>
                            <Text style = {styles.text}>R{price}</Text>
                            <Text style = {styles.text}>Size: {top}</Text>
                            <Text style = {styles.text}>Quantity: {quantity}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            else if(top == "" && bottom != "" && cup == "")
            {
                return(
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = { () => {toggleModal(name, price, top, bottom, bra, cup)}}>
                        <Photo name = {name} />
                        <View style = {{ flex: 1 }}>
                            <Text style = {styles.text}>{name}</Text>
                            <Text style = {styles.text}>R{price}</Text>
                            <Text style = {styles.text}>Size: {bottom}</Text>
                            <Text style = {styles.text}>Quantity: {quantity}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            else if(top != "" && bottom != "" && cup == "")
            {
                return(
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = { () => {toggleModal(name, price, top, bottom, bra, cup)}}>
                        <Photo name = {name} />
                        <View style = {{ flex: 1 }}>
                            <Text style = {styles.text}>{name}</Text>
                            <Text style = {styles.text}>R{price}</Text>
                            <Text style = {styles.text}>Size: {top} - {bottom}</Text>
                            <Text style = {styles.text}>Quantity: {quantity}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            else if(top != "" && bottom == "" && cup != "")
            {
                return(
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = { () => {toggleModal(name, price, top, bottom, bra, cup)}}>
                        <Photo name = {name} />
                        <View style = {{ flex: 1 }}>
                            <Text style = {styles.text}>{name}</Text>
                            <Text style = {styles.text}>R{price}</Text>
                            <Text style = {styles.text}>Size: {top}(top) - {bra}{cup}(bra)</Text>
                            <Text style = {styles.text}>Quantity: {quantity}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            else if(top == "" && bottom != "" && cup != "")
            {
                return(
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = { () => {toggleModal(name, price, top, bottom, bra, cup)}}>
                        <Photo name = {name} />
                        <View style = {{ flex: 1 }}>
                            <Text style = {styles.text}>{name}</Text>
                            <Text style = {styles.text}>R{price}</Text>
                            <Text style = {styles.text}>Size: {bottom}(bottom) - {bra}{cup}(bra)</Text>
                            <Text style = {styles.text}>Quantity: {quantity}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
            else if(top != "" && bottom != "" && cup != "")
            {
                return(
                    <TouchableOpacity 
                        style = {styles.button}
                        onPress = { () => {toggleModal(name, price, top, bottom, bra, cup)}}>
                        <Photo name = {name} />
                        <View style = {{ flex: 1 }}>
                            <Text style = {styles.text}>{name}</Text>
                            <Text style = {styles.text}>R{price}</Text>
                            <Text style = {styles.text}>Size: {top}(top) - {bottom}(bottom) - {bra}{cup}(bra)</Text>
                            <Text style = {styles.text}>Quantity: {quantity}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }
        };
                        
        const renderItem = ({ item }) => (
            <Item 
                name = {item.name}
                price = {item.price}
                top = {item.top}
                bottom = {item.bottom}
                bra = {item.bra}
                cup = {item.cup}
                quantity = {quantity} />
        );
    
        return (
            <SafeAreaView style = {{flex: 1, maxWidth: '100%', minwidth: '100%', maxHeight: '100%', minHeight: '100%', backgroundColor: 'white', paddingBottom: 100, justifyContent: 'center'}}>
                <Advert/>
                <FlatList
                    style = {{backgroundColor: 'white', minHeight: '100%', minWidth: '90%', maxWidth: '90%', paddingTop: 10, borderTopColor: 'black', borderTopWidth: 1, borderBottomColor: 'black', borderBottomWidth: 1,}}
                    horizontal = {false}
                    numColumns = {2}
                    data = {products}
                    renderItem = {renderItem}
                    keyExtractor = {(_, index) => String(index)}/>
                <View style = {{ paddingVertical: 2.5, borderBottomColor: 'black', borderBottomWidth: 1 }}>
                    <Text style = {{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 15}}>Cart Total: R{total}</Text>
                </View>
                <Modal
                    animationInTiming = {1000}
                    animationIn = {'slideInLeft'}
                    animationOutTiming = {1000}
                    animationOut = {'slideOutRight'}
                    isVisible = {isModalVisible}>
                    <View style = {styles.container}>
                        <Pop id = {id} name = {name} price = {price} top = {top} bottom = {bottom} bra = {bra} cup = {cup}/>
                        <TouchableOpacity style = {styles.button2}
                            onPress = {toggleModall()}>
                            <Text style = {styles.buttonLabel2}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 13,
        color: 'black'
    },

    button:
    {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 0,
        margin: 0
    },

    price:
    {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 0,
        margin: 0,
    },

    label:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: 2
    },

    amount:
    {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 2.5,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        backgroundColor: '#e6c2bf',
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 17.5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 2,
    },

    total:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 17.5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingVertical: 2,
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
    }
});

export default Cart;