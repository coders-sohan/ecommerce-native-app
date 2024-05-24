import { Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import SignInScreens from '../screens/signInScreens/SignInScreens';
import PasswordLoginScreen from '../screens/signInScreens/PasswordLoginScreen';
import CreateAccount from '../screens/signUpScreens/CreateAccount';
import ForgotPasswordScreens from '../screens/passResetScreens/ForgotPasswordScreens';
import OtpScreens from '../screens/passResetScreens/OtpScreens';
import NewPasswordScreens from '../screens/passResetScreens/NewPasswordScreens';

export default function AuthStack() {
    const Stack = createNativeStackNavigator();
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,

            background: '#FFFFFF',

        },
    };
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='signIn' component={SignInScreens} />
            <Stack.Screen name='signInWithPassword' component={PasswordLoginScreen} />
            <Stack.Screen name='signup' component={CreateAccount} />
            <Stack.Screen name='forgotpass' component={ForgotPasswordScreens} />
            <Stack.Screen name='forgotOtp' component={OtpScreens} />
            <Stack.Screen name='newPassword' component={NewPasswordScreens} />
        </Stack.Navigator>
    )
}

