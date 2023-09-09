import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
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

const Advert = () => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchAdvert = async() => {
            const q = query(collection(db, "Adverts"), where("screen", "==", "Account"), where("app", "==", "M"));
            const qSnapShot = await getDocs(q);
            if(qSnapShot.empty)
            {
                //
            }
            else
            {
                qSnapShot.forEach((doc) => {
                    setImage(doc.data().image);
                });
            }
        };
        
        fetchAdvert();
    }, []);

    return (
        <Image style = {{ width: '100%', height: '30%', resizeMode: 'stretch' }} source = {{ uri: 'data:image/jpeg;base64,' + image}}/>
    ); 
};

export default Advert;