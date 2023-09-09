import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Advert from './Advert';

const Shop = ({ navigation }) => {
    const Gender = [{title: 'Men', image: require('../images/man.png')},
                    {title: 'Women', image: require('../images/woman.png')}]

    const Item = ({ title, image }) => (
        <TouchableOpacity 
            style = {styles.button}
            onPress = { () => navigation.navigate('Gender', {title: title})}>
            <Image style = {{ width: 170, height: 170, resizeMode: 'contain'}}
                source = {image}/>
                <Text style = {styles.text}>{title}</Text>
        </TouchableOpacity>
    );
                    
    const renderItem = ({ item }) => (
        <Item 
            title = {item.title}
            image = {item.image}/>
    );

    return (
        <SafeAreaView style = {{flex: 1, maxWidth: '100%', minwidth: '100%', maxHeight: '100%', minHeight: '100%', backgroundColor: 'white'}}>
            <Advert/>
            <FlatList
                style = {{backgroundColor: 'white', minHeight: '100%', minWidth: '100%', alignSelf: 'center'}}
                horizontal = {false}
                numColumns = {2}
                data = {Gender}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button:
    {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 1,
        marginTop: 35,
        paddingVertical: 100,
        paddingHorizontal: 3.5,
        minWidth: '50%',
        maxWidth: '50%',
    },
                    
    text:
    {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        fontFamily: 'sans-serif-thin',
        fontSize: 18,
        color: 'black'
    },
});

export default Shop;