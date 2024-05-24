import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Message from 'react-native-vector-icons/AntDesign'
import Comment from 'react-native-vector-icons/Ionicons'
import forgotAvatar from '../../assets/images/forgot-avatar.png'
import { colors, padding } from '../../assets/theme/styles';
import EmailPasswordResetModal from './EmailPasswordResetModal';
import useFirebase from '../../hooks/auth/useFirebase';
import { showMessage } from 'react-native-flash-message';

const ForgotPasswordScreens = ({ navigation }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const { passwordResetEmail } = useFirebase();
    const [email, setEmail] = useState('');
    const handleReset = () => {
        passwordResetEmail(email).then(res => {
            Alert.alert('Success', 'Password rest link send your email. Please check your email!', [

                {
                    text: 'OK', onPress: () => {
                        navigation.navigate("signIn")
                        setModalVisible(false)
                    }
                },
            ]);

        }).catch(error => {
            showMessage({
                type: 'danger',
                message: error?.message,
                duration: 3000
            })
        })
    }
    return (

        <ScrollView style={{ backgroundColor: '#ffff', flex: 1 }}>

            <View style={{ paddingTop: padding.default }} >
                <View >
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={20} color="#000000" style={{ marginTop: 5 }} />
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '600', fontSize: 20, color: '#000000', marginLeft: 18 }}>Forgot Password</Text>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                        <Image source={forgotAvatar} style={{ alignSelf: 'center' }} />
                        {/* <Text style={{ fontWeight: 400, fontSize: 15, color: '#000000' }}>Select which contact details should we use to reset your password</Text> */}
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 20 }} >
                            <View style={{ borderWidth: 1.5, flex: 1, borderRadius: 30, padding: 20 }}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <View style={{ width: 70, height: 70, backgroundColor: '#ECECEC', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                                                <Comment name="ios-chatbubble-ellipses-sharp" size={23} style={{ color: 'black' }} />
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                                            <Text style={{ fontWeight: 300, fontSize: 12, color: '#757575' }}>via SMS</Text>
                                            <Text style={{ fontWeight: 500, fontSize: 12, color: '#000000', marginTop: 5 }}>+8801*********</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View> */}
                    <View style={{ marginHorizontal: 20, marginBottom: 20, marginVertical: 20 }} >
                        <TextInput
                            style={{
                                borderColor: '#333',
                                borderWidth: 1,
                                borderRadius: 15,
                                paddingLeft: 20
                            }}
                            placeholder="Enter your email"
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors?.primary,
                    marginBottom: 30,
                    borderRadius: 30,
                    padding: 10,
                    marginHorizontal: 10
                }}
                    onPress={handleReset}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '800',
                        fontSize: 16,
                        color: '#FFFFFF'
                    }}>Continue</Text>
                </TouchableOpacity>
            </View>

        </ScrollView >



    );
}


export default ForgotPasswordScreens;
