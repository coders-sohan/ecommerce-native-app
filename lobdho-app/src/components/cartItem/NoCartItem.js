import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../assets/theme/styles';
const NoCardItem = ({ navigation }) => {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <View>
                <Icon name="cart" size={200} color={colors.primary} />
                <Text style={{ textAlign: 'center', fontFamily: 'Inter-bold', color: 'black' }}>No Item</Text>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: colors.secondary, padding: 10, borderRadius: 10, marginTop: 40 }}
                onPress={() => navigation.navigate("product")}
            >
                <Text style={{ color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 20 }}>Go to soppping</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({})

export default NoCardItem;
