import React, {useState} from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, TextInput, Image } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

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

const Forgot = () => {
    const [email, setEmail] = useState('');

    async function fetch(email)
    {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Email has been sent');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error Code: ', errorCode, 'Error Message: ', errorMessage);
            });
    };

    return (
        <View style = {styles.container}>
            <ScrollView style = {styles.scrollV}>
                <Image style = {{ width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center', margin: 10, padding: 1 }}
                    source = {require('../images/M.png')}/>
                <Text style = {styles.header}>Please Provide Email Address:</Text>
                <View style = {styles.form}>
                    <Text style = {styles.label}>Email Address</Text>
                    <TextInput style = {styles.input}
                        textContentType = {'emailAddress'}
                        onChangeText = {setEmail}
                        value = {email}/>
                    <TouchableOpacity style = {styles.button}  
                        onPress = { () => {fetch(email)}}>
                        <Text style = {styles.reset}> Reset </Text>
                    </TouchableOpacity>
                </View>
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

    reset:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        padding: 2.5
    },
});

export default Forgot;