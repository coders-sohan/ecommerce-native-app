import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import loginAvatar from '../../assets/images/login-avatar.png';
import googleLogo from '../../assets/images/icons/google.png'
import appleLogo from '../../assets/images/icons/apple-black-logo.png'
import { colors } from '../../assets/theme/styles';
import useFirebase from '../../hooks/auth/useFirebase';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome'



const SignInScreens = ({ navigation }) => {
    const { onGoogleButtonPress, onFacebookButtonPress, loading } = useFirebase()
    return (
        <SafeAreaView style={styles.wrapper}>
            {loading ? <Spinner visible={true} /> : <></>}
            {/* {<LoodingSpinner />} */}
            <View style={{ alignItems: 'center' }}>
                <Image source={loginAvatar} />
            </View>
            <View style={{ marginTop: 15 }}>
                <Text style={{
                    fontWeight: '800',
                    color: '#212121',
                    fontSize: 35,
                    textAlign: 'center',
                    marginBottom: 10
                }}>
                    Let,s you in
                </Text>
                <TouchableOpacity style={styles.socialBtn}
                    onPress={() => onFacebookButtonPress().then(data => {
                        showMessage({
                            type: 'success'
                        })
                    }).catch(error => {
                        showMessage({
                            type: 'danger',
                            message: error?.message,
                            duration: 3000,
                        })
                    })}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Image source={facebookLogo} /> */}
                        <Icon name="facebook" size={20} color='#3b5998' />
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: '#060606',
                            marginLeft: 10
                        }}>Continue with facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}
                    onPress={() => onGoogleButtonPress()}
                >
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={googleLogo} />
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: '#060606',
                            marginLeft: 10
                        }}>Continue with Goolge</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}>
                    <View style={{ flexDirection: 'row', }}>
                        <Image source={appleLogo} />
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: '#060606',
                            marginLeft: 10
                        }}>Continue with Apple</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 20 }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: '400',
                        color: '#060606'
                    }}>
                    or
                </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
                <TouchableOpacity style={{
                    backgroundColor: colors?.primary,
                    marginBottom: 30,
                    borderRadius: 30,
                    padding: 10,
                    marginHorizontal: 10
                }}
                    onPress={() => navigation.navigate("signInWithPassword")}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '800',
                        fontSize: 16,
                        color: '#FFFFFF'
                    }}>Sign in with password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate("signup")}>
                    <Text style={{
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#060606'
                    }}>Don't have an account? <Text style={{ fontWeight: '800' }}>Sign up</Text> </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        fontFamily: 'Inter-Regular',
        paddingTop: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    socialBtn: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.21,
        shadowRadius: 7.68,
        elevation: 10,
        padding: 10,
        paddingVertical: 15,
        backgroundColor: '#ffff',
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 10

    }
})

export default SignInScreens;
