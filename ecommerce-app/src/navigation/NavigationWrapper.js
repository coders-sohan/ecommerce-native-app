import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawarNavigation from './drawarNavigation/DrawarNavigation'
import useFirebase from '../hooks/auth/useFirebase'
import Spinner from 'react-native-loading-spinner-overlay';
import { View } from 'native-base';

export default function NavigationWrapper() {
    const { loading, userDetails } = useFirebase();


    return (
        <>
            {loading ? <View>
                {
                    !userDetails && <Spinner visible={loading} />
                }
            </View> : <></>}
            <NavigationContainer>
                <DrawarNavigation />
            </NavigationContainer>
        </>

    )
}