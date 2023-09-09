import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import Advert from './Advert';
import Women from './Women';
import Men from './Men';
import Sale from './Sale';
import Release from './Release';
import Under from './Under';

const Home = ({ navigation }) => {
    return (
        <View style = {styles.container}> 
            <ScrollView style = {styles.scroll}>
                <Advert/>
                <Women navigation = {navigation}/>
                <Men navigation = {navigation}/>
                <ImageBackground style = {{ width: 235, height: 60, resizeMode: 'contain', alignSelf: 'center'}}
                    source = {require('../images/pattern(5).png')}>
                    <Text style = {styles.text}>Current Sale</Text>
                </ImageBackground>
                <Sale navigation = {navigation}/>
                <ImageBackground style = {{ width: 235, height: 60, resizeMode: 'contain', alignSelf: 'center'}}
                    source = {require('../images/pattern(5).png')}>
                    <Text style = {styles.text}>New Releases</Text> 
                </ImageBackground>
                <Release navigation = {navigation}/>
                <ImageBackground style = {{ width: 235, height: 60, resizeMode: 'contain', alignSelf: 'center'}}
                    source = {require('../images/pattern(5).png')}>
                    <Text style = {styles.text}>Under R150</Text>
                </ImageBackground>
                <Under navigation = {navigation}/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    scroll:
    {
        flex: 1,
        width: '100%'
    },

    text:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif-thin',
        fontSize: 27.5,
        color: 'black',
        margin: 2.5,
        paddingTop: 15,
        paddingBottom: 1,
        elevation: 5
    }

});

export default Home;