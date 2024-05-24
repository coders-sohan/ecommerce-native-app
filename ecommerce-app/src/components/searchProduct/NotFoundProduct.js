import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import noData from '../../assets/images/icons/undraw-No-data.png';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/theme/styles';

export default function NotFoundProduct({ searchText }) {
    const navigation = useNavigation();
    return (
        <View style={{ marginTop: 10 }}>
            <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#5C5C5C' }}>Resutls for "{searchText}" </Text>
                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#000000' }}>0 Found </Text>
            </View>
            <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
                <Image source={noData} />
                <View>
                    <Text style={{ fontFamily: 'Inter-Medium', fontSize: 20, color: '#000000', textAlign: 'center' }}>Not Found </Text>
                    <Text style={{ fontFamily: 'Inter-Light', fontSize: 15, color: '#000000', textAlign: 'center' }}>Sorry, the keyword you entered cannot be
                        found, please check again or search with
                        another keyword.</Text>

                </View>
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            borderRadius: 5
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text
                            style={{
                                color: '#ffffff',
                            }}
                        >
                            Go back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}