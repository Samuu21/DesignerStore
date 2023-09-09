import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function login(email, pass) {
        if(email == '')
        {
            alert('You have not entered an email address. Please enter one and proceed.');
        }
        else if(pass == '')
        {
            alert('You have not entered a password. Please enter one and proceed.');
        }
        else if(email == '' && pass == '')
        {
            alert('You have not entered an email address and password. Please enter and proceed.');
        }
        else
        {
            signInWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    SecureStore.setItemAsync('user', email);
                    const user = userCredential.user;
                    SecureStore.setItemAsync('id', user.uid);
                    navigation.navigate('View');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error Code: ', errorCode, 'Error Message: ', errorMessage);
                    alert(errorMessage);
                });
        }
    }

    return (
        <View style = {styles.container}>
            <ScrollView style = {styles.scrollV}>
                <Image style = {{ width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center', margin: 10, padding: 1 }}
                    source = {require('../images/M.png')}/>
                <Text style = {styles.header}>Please Login</Text>
                <View style = {styles.form}>
                    <Text style = {styles.label}>Email Address</Text>
                    <TextInput style = {styles.input}
                        autoComplete = {'email'}
                        textContentType = {'emailAddress'}
                        onChangeText = {setEmail}
                        value = {email}/>
                    <Text style = {styles.label}>Password</Text>
                    <TextInput style = {styles.input}
                        autoComplete = {'password'}
                        textContentType = {'password'}
                        onChangeText = {setPass}
                        value = {pass}/>
                    <TouchableOpacity style = {styles.forgot}  
                        onPress = { () => {navigation.navigate('Forgot')}}>
                        <Text style = {styles.text}> Forgot Password </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button}  
                        onPress = { () => {login(email, pass)}}>
                        <Text style = {styles.login}> Login </Text>
                    </TouchableOpacity>
                </View>
                <Text style = {styles.desc}>
                    If you don't yet have an account, please click below to Sign Up.
                </Text>
                <TouchableOpacity style = {styles.button2}
                    onPress = {() => navigation.navigate('Signup')}>
                    <Text style = {styles.signup}> Sign Up </Text>
                </TouchableOpacity>
                <Text style = {styles.space}></Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        minWidth: '100%',
        maxWidth: '100%',
        minHeight: '100%',
        maxHeight: '100%',
        margin: 0
    },

    header:
    {
        color: 'black',
        alignSelf: 'center',
        fontFamily: 'sans-serif',
        fontSize: 18,
        paddingBottom: 15,
    },

    form:
    {
        alignSelf: 'center',
        minWidth: '90%',
        maxWidth: '90%',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderTopColor: 'black',
        borderTopWidth: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollV:
    {
        paddingVertical: 15,
    },

    space:
    {
        paddingBottom: 20
    },

    label:
    {
        color: 'black',
        fontFamily: 'sans-serif-thin',
        fontSize: 15,
        marginTop: 15,
        alignSelf: 'center',
    },

    input:
    {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minWidth: '80%',
        maxWidth: '80%',
        marginTop: 15,
    },

    button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#e6c2bf',
        borderWidth: 2,
        borderRadius: 60,
        backgroundColor: '#e6c2bf',
        marginTop: 25,
        paddingVertical: 7.5,
        paddingHorizontal: 80
    },

    forgot:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        marginTop: 2.5,
        paddingVertical: 1.5,
        paddingHorizontal: 1.5
    },

    text:
    {
        alignSelf: 'baseline',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        padding: 2.5
    },

    login:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        padding: 2.5
    },

    desc:
    {
        color: 'black',
        fontFamily: 'sans-serif-light',
        fontSize: 13.5,
        padding: 15,
    },

    button2:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 60,
        backgroundColor: 'black',
        paddingVertical: 7.5,
        paddingHorizontal: 80
    },

    signup:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: '#e6c2bf',
        padding: 2.5,
    },

    setPass:
    {
        marginVertical: 7.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        minWidth: '80%',
        maxWidth: '80%',
    },

    pass:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: 12.5,
        fontWeight: 'bold',
        alignSelf: 'baseline'
    }
});

export default Login;