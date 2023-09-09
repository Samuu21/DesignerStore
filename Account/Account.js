import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Advert from "./Advert";

const Account = ({ navigation }) => {
    return(
        <View style = {styles.container}>
            <Advert/>
            <ImageBackground source = {require('../images/cover8.png')} resizeMethod = 'scale'
                    style = {{flex: 1, justifyContent: 'center'}}>
                    <View style = {styles.row}>
                    <TouchableOpacity style = {styles.button}
                        onPress = {() => navigation.navigate('User')}>
                        <Text style = {styles.label}>User Details</Text>
                        <AntDesign name = 'idcard' size = {30} color = 'black'/>
                    </TouchableOpacity>
                    <Text style = {styles.space}></Text>
                    <TouchableOpacity style = {styles.button}
                        onPress = {() => navigation.navigate('Delivery')}>
                        <Text style = {styles.label}>Delivery Details</Text>
                        <AntDesign name = 'form' size = {30} color = 'black'/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    row: 
    {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: 90,
        opacity: 0.90
    },

    welcome:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 17.5,
        padding: 20,
        lineHeight: 20,
        backgroundColor: 'white',
        opacity: 0.75
    },

    space:
    {
        paddingRight: 25,
    },

    button:
    {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#E7E6E6',
        borderColor: '#E7E6E6',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 50,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: 
        {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.84,
        elevation: 10,
        minWidth: '45%',
        maxWidth: '45%',
    },

    label:
    {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: 'black',
        fontFamily: 'sans-serif',
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20
    },
});

export default Account;