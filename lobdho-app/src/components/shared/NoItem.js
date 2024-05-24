import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import noData from '../../assets/images/icons/undraw-No-data.png';


const NoItem = () => {
    return (
        <View>
            <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                <Image source={noData} />
                <View>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 20, color: '#000000', textAlign: 'center' }}>Not Found </Text>
                    <Text style={{ fontFamily: 'Inter-Light', fontSize: 15, color: '#000000', textAlign: 'center' }}>Opps! No Item</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default NoItem;
