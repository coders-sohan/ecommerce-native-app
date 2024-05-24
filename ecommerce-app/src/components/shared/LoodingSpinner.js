import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function LoodingSpinner() {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})