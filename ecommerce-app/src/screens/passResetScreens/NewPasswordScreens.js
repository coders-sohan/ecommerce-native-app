import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import newpasswrodavatar from '../../assets/images/newpasswrod-avatar.png'
import { Checkbox, Input, Pressable } from 'native-base'
import { colors, padding } from '../../assets/theme/styles'



export default function NewPasswordScreens({ navigation }) {
    const [show, setShow] = useState(null);
    return (
        <View style={{ paddingTop: padding.default }}>
            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#000000" style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000', marginLeft: 18 }}>Create New Password</Text>
                </View>
            </View>
            <View>
                <Image source={newpasswrodavatar} style={{ alignSelf: 'center' }} />
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <View>
                    <Input
                        type={show ? "text" : "password"}
                        InputRightElement={
                            <Pressable style={{ marginRight: 20 }} onPress={() => setShow(!show)}  >
                                <MaterialIcons name={show ? "visibility" : "visibility-off"} size={19} />
                            </Pressable>}
                        InputLeftElement={<MaterialIcons name="lock" style={{ fontSize: 19, marginLeft: 20, color: '#000000' }} />}
                        placeholder="Password" variant="outline" rounded="full" size="lg" outlineColor={"#A7A1A1"}
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Input
                        type={show ? "text" : "password"}
                        InputRightElement={
                            <Pressable style={{ marginRight: 20 }} onPress={() => setShow(!show)}  >
                                <MaterialIcons name={show ? "visibility" : "visibility-off"} size={19} />
                            </Pressable>}
                        InputLeftElement={<MaterialIcons name="lock" style={{ fontSize: 19, marginLeft: 20, color: '#000000' }} />}
                        placeholder="Password" variant="outline" rounded="full" size="lg" outlineColor={"#A7A1A1"}
                    />
                </View>
                <View style={{ alignItems: 'center', marginVertical: 20 }}>
                    <Checkbox value='remember' colorScheme="dark" bgColor="black" rounded="full" size="md" defaultIsChecked>
                        <Text style={{ fontWeight: 12, color: '#000000', fontWeight: '400' }}>Remember me</Text>
                    </Checkbox>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors?.primary,
                    marginBottom: 30,
                    borderRadius: 30,
                    padding: 10,
                    marginHorizontal: 10,
                    marginTop: 30
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
        </View>
    )
}