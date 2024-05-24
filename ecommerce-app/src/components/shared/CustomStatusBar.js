import React from 'react';
import { View, StatusBar } from 'react-native';

export default function CustomStatusBar({ style }) {
    return (
        <View style={{ ...style }} >
            <StatusBar backgroundColor="transparent"
                translucent={true} barStyle='dark-content'
            />
        </View>

    );
}