import React, { useEffect } from 'react';
import { SafeAreaView, } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import MainScreen from './src/screens/MainScreen';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/app/Store';
import { PersistGate } from 'redux-persist/integration/react';
import PushNotification, { Importance } from 'react-native-push-notification';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';

const App = () => {
    // configure googole sigin in
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '401538707661-eovh2ob65nhaugb9dim2tpce57gms425.apps.googleusercontent.com',
        });
        Settings.initializeSDK(true);

    }, [])


    // push notification 
    const handlechannel = () => {
        PushNotification.createChannel(
            {
                channelId: "test-channel", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    useEffect(() => {
        handlechannel()
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaView style={{ flex: 1 }} >
                    <NativeBaseProvider>
                        <MainScreen />
                    </NativeBaseProvider>
                </SafeAreaView>
            </PersistGate>
        </Provider>
    )
};

export default App;