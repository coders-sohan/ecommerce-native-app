import { View } from 'native-base'
import React, { useEffect, useState } from 'react'
import FlashMessage from 'react-native-flash-message'
import CustomStatusBar from '../components/shared/CustomStatusBar'
import AppStack from '../navigation/AppStack'
import PushNotification from "react-native-push-notification";
import { addNotificationInterection } from '../store/features/notification/notificationSlice'
import { useDispatch } from 'react-redux'
import { useAuth } from '../hooks/auth/useAuth'
import Onboarding from './onboardingScreens/Onboarding'



export default function MainScreen() {
    const [welcome, setWelcome] = useState(false)
    const userData = useAuth()
    const dispatch = useDispatch()

    useEffect(() => {
        PushNotification.configure({
            ...PushNotification.configure,
            onNotification: function (notification) {
                console.log("NOTIFICATIONfom main:", notification);
                if (notification?.channelId === 'fcm_fallback_notification_channel') {
                    PushNotification.localNotification({
                        channelId: "test-channel",
                        channelName: 'My channel',
                        title: notification?.title, // (optional)
                        message: notification?.message, // (required)
                        bigPictureUrl: notification?.bigPictureUrl
                    })
                }
                if (notification?.userInteraction) {
                    dispatch(addNotificationInterection(notification.userInteraction))
                }

            },
        })

    }, [PushNotification])
    useEffect(() => {
        if (userData?.frist) {
            setWelcome(true)
        } else {
            setWelcome(false)
        }
    }, [userData])
    if (welcome) {
        return (
            <Onboarding dispatch={dispatch} />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {/* {loading ? <Spinner visible={true} /> : <></>} */}

            <CustomStatusBar />
            <AppStack />
            {/* <AuthStack /> */}
            <FlashMessage position="bottom" style={{ alignItems: 'center' }} />
        </View>

    )
}