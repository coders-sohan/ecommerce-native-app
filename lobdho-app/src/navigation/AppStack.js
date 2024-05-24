import { View } from 'native-base'
import React from 'react'
import NavigationWrapper from './NavigationWrapper'

export default function AppStack() {
    return (
        <View style={{ flex: 1 }}>
            <NavigationWrapper />
        </View>
    )
}