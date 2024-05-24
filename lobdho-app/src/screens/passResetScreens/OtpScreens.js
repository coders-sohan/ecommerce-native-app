import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import otpAvatar from '../../assets/images/otp-avatar.png'
import { colors, padding } from '../../assets/theme/styles'


export default function OtpScreens({ navigation }) {
    return (
        <SafeAreaView style={{ fontFamily: 'Inter-Regular' }}>
            <View style={{ paddingTop: padding.default }}>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={20} color="#000000" style={{ marginTop: 5 }} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000', marginLeft: 18 }}>Forgot Password</Text>
                    </View>
                </View>
                <View>
                    <Image source={otpAvatar} style={{ alignSelf: 'center' }} />
                    <Text style={{ fontWeight: 400, fontSize: 14, color: '#000000', textAlign: 'center' }}>Code has been send to +88017******19</Text>
                </View>
                <View style={{ marginHorizontal: 20, alignItems: 'center', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', }}>
                        <TextInput style={{ borderWidth: 1.5, borderColor: '#A7A1A1', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 15, }} />
                        <TextInput style={{ borderWidth: 1.5, borderColor: '#A7A1A1', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 15, marginLeft: 10 }} />
                        <TextInput style={{ borderWidth: 1.5, borderColor: '#A7A1A1', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 15, marginLeft: 10 }} />
                        <TextInput style={{ borderWidth: 1.5, borderColor: '#A7A1A1', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 15, marginLeft: 10 }} />

                    </View>
                </View>
                <View style={{ paddingVertical: 60 }}>
                    <Text style={{ fontWeight: 400, fontSize: 15, color: '#000000', textAlign: 'center', }}>Resend code in 55 s</Text>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors?.primary,
                    marginBottom: 30,
                    borderRadius: 30,
                    padding: 10,
                    marginHorizontal: 10
                }}
                    onPress={() => navigation.navigate("newPassword")}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '800',
                        fontSize: 16,
                        color: '#FFFFFF'
                    }}>Verify</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}