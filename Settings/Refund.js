import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Refund = () => {
    return (
      <View style = {styles.container}>
        <Text>Refund Service</Text>
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

export default Refund;