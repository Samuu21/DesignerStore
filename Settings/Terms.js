import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Terms = () => {
    return (
      <View style = {styles.container}>
        <Text>Terms & Conditions</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Terms;