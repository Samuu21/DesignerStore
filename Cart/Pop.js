import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { decode } from 'base-64';

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

const Pop = ({ id, name, price, top, bottom, bra, cup }) => {

    async function deleteData(id, name, price, top, bottom, bra, cup) 
    {
        const q = query(collection(db, "Cart"), where("user", "==", id), where("name", "==", name), where("name", "==", name), where("price", "==", price), where("top", "==", top),  where("bottom", "==", bottom), where("bra", "==", bra), where("cup", "==", cup));
        const querySnapShot = await getDocs(q);
        if(querySnapShot.empty)
        {
            //
        }
        else
        {
            querySnapShot.forEach(async (doc) => {
                try 
                {
                    await deleteDoc(doc.ref);
                    alert("Product has been deleted successfully!");
                } 
                catch (error) 
                {
                    console.error("Error deleting document: ", error);
                }
            });
        }
    }

    return (
        <View style = {styles.container}>
            <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                <Text style = {styles.header}>Product Removal Form:</Text>
                <View style = {styles.form}>
                    <TouchableOpacity style = {styles.delete}
                        onPress = {() => {deleteData(id, name, price, top, bottom, bra, cup)}}>
                        <Text style = {styles.label}>Delete</Text>
                    </TouchableOpacity>
                </View>
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

    delete:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: 'black',
        marginTop: 17.5,
        paddingVertical: 5,
        minWidth: '75%',
        maxWidth: '75%'
    },

    label:
    {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
        padding: 5
    },
});

export default Pop;