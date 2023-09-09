import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Loading from './Loading';

const AuthLoading = ({navigation}) => {

    useEffect(() => {
        const checkLoginState = async() => {
            const userToken = await SecureStore.getItemAsync('user');
                navigation.navigate(userToken ? 'View' : 'Auth');
        };
        
        checkLoginState();
    });
    
    return <Loading />;

};
export default AuthLoading;