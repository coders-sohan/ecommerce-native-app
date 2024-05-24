import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Radio from 'react-native-vector-icons/Ionicons'


export default function OrderStatusCard({ item }) {

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }} >
                    <View>
                        <Radio name="md-radio-button-on" size={29} color="black" />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.headingText}>{item?.item?.status} {item?.item?.date}</Text>
                        </View>
                        <Text style={styles.contentText}>{item?.item?.location ? item.item.location : 'no location found'}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ ...styles.contentText, fontSize: 10 }}>15.20PM</Text>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        color: '#000000'
    },
    contentText: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: '#000000'
    }
})