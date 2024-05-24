import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-ratings';
import { colors } from '../../assets/theme/styles';

export default function NotificationCard({ item }) {
    console.log(item)
    return (
        <View style={{
            backgroundColor: '#FFFFFF',
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            borderRadius: 30,
            marginBottom: 15
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                {/* card image  */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                    <View style={{ width: 51, height: 51, borderRadius: 100, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center' }}>
                        <IconM name="brightness-percent" color="#000000" size={27} />
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 16, color: '#000000', }}>{item?.title}</Text>
                        <Text style={{ fontFamily: 'Inter-Light', fontSize: 12, color: '#000000', }}>{item?.content}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}