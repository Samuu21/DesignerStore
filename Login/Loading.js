import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingWrap = () => {
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    </View>
}

const Loading = () => {
    return (
        <LoadingWrap>
            <ActivityIndicator size="large" />
        </LoadingWrap>
    );
};

export default Loading;