import React from "react";
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Advert from "./Advert";

const Customer = ({ navigation }) => {
    return (
      <View style = {styles.container}>
        <Advert/>
        <ImageBackground source = {require('../images/cover9.png')} resizeMethod = 'resize'
          style = {{flex: 1, justifyContent: 'center'}}>
          <ScrollView style = {styles.scrollV}>
            <View style = {styles.row}>
              <TouchableOpacity style = {styles.button}
                onPress = {() => navigation.navigate('Privacy')}>
                <Text style = {styles.label}>Privacy Policy</Text>
                <AntDesign name = 'form' size = {30} color = 'black'/>
              </TouchableOpacity>
              <Text style = {styles.space}></Text>
              <TouchableOpacity style = {styles.button}
                onPress = {() => navigation.navigate('Refund')}>
                <Text style = {styles.label}>Refund Service</Text>
                <AntDesign name = 'creditcard' size = {30} color = 'black'/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.button}
                onPress = {() => navigation.navigate('Terms')}>
                <Text style = {styles.label}>Terms & Conditions</Text>
                <AntDesign name = 'idcard' size = {30} color = 'black'/>
              </TouchableOpacity>
              <Text style = {styles.space}></Text>
            </View>  
          </ScrollView>
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

  scrollV:
  {
      paddingBottom: 10,
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

export default Customer;