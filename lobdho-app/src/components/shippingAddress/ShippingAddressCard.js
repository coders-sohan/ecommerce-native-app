import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ShippingAddressCard = ({ navigation, data, address, navigate }) => {
    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Icon name="map-marker" size={20} color="#000000" />
            </View>
            <View>
                <Text style={{ fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#000000', }}>Home</Text>
                <Text style={{ fontFamily: 'Inter-Medium', fontSize: 12, color: '#000000', }}>{data}</Text>
            </View>
            <View>
                {navigate &&
                    <TouchableOpacity style={styles.label} onPress={() => navigation.navigate("ShippingAddress", { data: address })} >
                        <Icon name="pencil-outline" size={20} color="#000000" />
                    </TouchableOpacity>
                }
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        backgroundColor: '#D3E0DF', borderRadius: 100, height: 38, width: 38, alignItems: 'center', justifyContent: 'center'
    }
})

export default ShippingAddressCard;
