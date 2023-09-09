import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
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

const Details_D = ({ id, ho, st, to, po, doci }) => {
    const [n, setN] = useState(ho); //house number
    const [s, setS] = useState(st); //street name
    const [t, setT] = useState(to); //town
    const [p, setP] = useState(po); //postal code

    async function updateData(n, s, t, p, id, doci) 
    {
        try {
            await setDoc(doc(db, 'Delivery', 'doci', doci),
            {
                number: n,
                street: s,
                town: t,
                postal: p,
                user: id
            });
            alert('Your delivery details have been updated.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    async function addData(n, s, t, p, id) 
    {
        try {
            const docRef = await addDoc(collection(db, 'Delivery'),
            {
                number: n,
                street: s,
                town: t,
                postal: p,
                user: id
            });
            alert('Your delivery details have been inserted.');
        } catch (error) {
            console.error("Error adding document: ", error);
        }    
    }

    if(doci = '')
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Delivery Details Form</Text>
                    <View style = {styles.form}>
                        <Text style = {styles.label}>House Number:</Text>
                        <TextInput style = {styles.input} 
                            keyboardType = 'number-pad'
                            placeholder = '12345'
                            onChangeText = {setN}
                            value = {n}
                            defaultValue = {n}/>
                        <Text style = {styles.label}>Street Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Boulevard Street'
                            onChangeText = {setS}
                            value = {s}
                            defaultValue = {s}/>
                        <Text style = {styles.label}>Town/City Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Cityburg'
                            onChangeText = {setT}
                            value = {t}
                            defaultValue = {t}/>
                        <Text style = {styles.label}>Postal Code:</Text>
                        <TextInput style = {styles.input}
                            keyboardType = 'number-pad' 
                            placeholder = '0000'
                            onChangeText = {setP}
                            value = {p}
                            defaultValue = {p}/>    
                    </View>
                    <TouchableOpacity style = {styles.button}
                        onPress = {() => {addData(n, s, t, p, id)}}>
                        <Text style = {styles.buttonLabel}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    else
    {
        return (
            <View style = {styles.container}>
                <ScrollView style = {{ flex: 1, minHeight: '100%' }}>
                    <Text style = {styles.header}>Delivery Details Form</Text>
                    <View style = {styles.form}>
                        <Text style = {styles.label}>House Number:</Text>
                        <TextInput style = {styles.input} 
                            keyboardType = 'number-pad'
                            placeholder = '12345'
                            onChangeText = {setN}
                            value = {n}
                            defaultValue = {n}/>
                        <Text style = {styles.label}>Street Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Boulevard Street'
                            onChangeText = {setS}
                            value = {s}
                            defaultValue = {s}/>
                        <Text style = {styles.label}>Town/City Name:</Text>
                        <TextInput style = {styles.input} 
                            placeholder = 'Cityburg'
                            onChangeText = {setT}
                            value = {t}
                            defaultValue = {t}/>
                        <Text style = {styles.label}>Postal Code:</Text>
                        <TextInput style = {styles.input}
                            keyboardType = 'number-pad' 
                            placeholder = '0000'
                            onChangeText = {setP}
                            value = {p}
                            defaultValue = {p}/>    
                    </View>
                    <TouchableOpacity style = {styles.button}
                        onPress = {() => {updateData(n, s, t, p, id, doci)}}>
                        <Text style = {styles.buttonLabel}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },

    header:
    {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: 18,
        paddingBottom: 15,
        alignSelf: 'center',
        marginTop: 10
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

    input:
    {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 1,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 10,
        margin: 10,
        minWidth: '80%',
        maxWidth: '80%',
    },

    button:
    {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: '#e6c2bf',
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: '#e6c2bf',
        marginTop: 17.5,
        paddingVertical: 5,
        minWidth: '75%',
        maxWidth: '75%'
    },

    buttonLabel:
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

export default Details_D;