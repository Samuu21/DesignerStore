import React, { useState, useEffect } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';
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

const Photo = ({ id, name }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async() => {
            const q = query(collection(db, 'Images'), where("supplier", "==", id), where("name", "==", name));
            const querySnapShot = await getDocs(q);
            if(querySnapShot.empty)
            {
                //
            }
            else
            {
                const productList = [];
                querySnapShot.forEach((doc) => {
                    var hold = `data:image/jpeg;base64,${doc.data().image}`;
                    productList.push(hold);
                });
                setImages(productList);
            }
        };
        
        fetchImages();
    }, []);

    return(
        <SliderBox
            images = {images}
            sliderBoxHeight = {225}
            parentWidth = {275}
            resizeMode={'contain'}
            dotColor = '#e6c2bf'
            inactiveDotColor = 'black'
            autoplay = {true}
            autoplayInterval = {4000}
            circleLoop = {true}
            imageLoadingColor = '#e6c2bf'
            activeOpacity = {1}
        />
    );
};

export default Photo;