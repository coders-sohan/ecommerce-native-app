import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/images/logo.png'
import facebookLogo from '../../assets/images/icons/facebook.png'
import googleLogo from '../../assets/images/icons/google.png'
import appleLogo from '../../assets/images/icons/apple-black-logo.png'
import { colors } from '../../assets/theme/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Checkbox, Input, Pressable } from 'native-base';
import { addUserData, useLoginUserMutation } from '../../store/features/user/userSlice';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/auth/useAuth';
import LoodingSpinner from '../../components/shared/LoodingSpinner';

const PasswordLoginScreen = ({ navigation }) => {
    const [show, setShow] = useState(null);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    // const [remember, setRemember] = useState(false);
    const [loginUser, { isError, error, isSuccess, isLoading, data }] = useLoginUserMutation();
    const dispatch = useDispatch()
    const userInfo = useAuth()
    // console.log(userInfo)
    const handleLogin = async () => {
        await loginUser(loginData)
    }

    useEffect(() => {
        if (isError) {

            if (error) {
                console.log(error)
                showMessage({
                    type: 'danger',
                    message: error?.data?.message,
                    duration: 5000,
                })

            }
        }
        else if (isSuccess) {
            if (data) {
                showMessage({
                    type: 'success',
                    message: "Sgin in Successfull",
                    duration: 3000
                })
                dispatch(addUserData(data))
            }
        }
    }, [isError, error, isLoading, isSuccess])
    return (
        <SafeAreaView style={{ padding: 20, backgroundColor: '#ffff' }}>
            <View style={{ marginVertical: 10 }}>
                <Image source={Logo} style={{ width: 150, height: 150, alignSelf: 'center' }} />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: '800', fontSize: 25, color: '#0085FF', marginLeft: 20 }}>Login</Text>
                <View style={{ marginVertical: 20 }}>
                    <View style={{ marginBottom: 20 }}>
                        <Input
                            InputLeftElement={<Icon name="email-outline" style={{ fontSize: 30, marginLeft: 20, color: '#3333' }} />}
                            placeholder="Email" variant="unstyled" backgroundColor="#E6F2F0" rounded="full" size="lg"
                            onChangeText={text => setLoginData({ ...loginData, email: text })}
                        />

                    </View>
                    <Input
                        type={show ? "text" : "password"}
                        InputRightElement={<Pressable style={{ marginRight: 20 }} onPress={() => setShow(!show)}  >
                            <MaterialIcons name={show ? "visibility" : "visibility-off"} size={30} />
                        </Pressable>}
                        InputLeftElement={<Icon name="lock" style={{ fontSize: 30, marginLeft: 20, color: '#3333' }} />}
                        placeholder="Password" variant="unstyled"
                        backgroundColor="#E6F2F0"
                        rounded="full" size="lg"
                        onChangeText={text => setLoginData({ ...loginData, password: text })}

                    />
                    {/* <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Checkbox value='remember' size="sm" outlineColor="#060606" colorScheme="danger" onChange={(value) => setRemember(value)} >
                            Remember me
                        </Checkbox>
                    </View> */}
                </View>
                {isLoading && <LoodingSpinner />}
                <TouchableOpacity style={{
                    backgroundColor: colors?.primary,
                    marginBottom: 20,
                    borderRadius: 30,
                    padding: 10,
                    marginHorizontal: 10,

                }}
                    onPress={handleLogin}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '800',
                        fontSize: 16,
                        color: '#FFFFFF'
                    }}>Sign in </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("forgotpass")}>
                    <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600', color: '#060606' }}>Forgot the password?</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 30 }}>
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400', color: '#060606' }}>or continue with</Text>
                </View>

                <View style={{ alignSelf: 'center', marginVertical: 30 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Image source={facebookLogo} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginHorizontal: 60 }}>
                            <Image source={googleLogo} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={appleLogo} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ marginTop: 30 }} onPress={() => navigation.navigate("signup")}>
                        <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '400', color: '#060606' }}>Don,t have an account? <Text style={{ fontWeight: '800' }}>Sing up </Text> </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default PasswordLoginScreen;
