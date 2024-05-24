import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/profileScreens/ProfileScreen';
import NotificationScreens from '../screens/notificationScreens/NotificationScreens';
import SearchProductScreens from '../screens/searchProductScreens/SearchProductScreens';
import ViewProductScreen from '../screens/productScreens/ViewProductScreen';
import TabNavigation from './TabNavigation';
import MyCartScreens from '../screens/myCartScreens/MyCartScreens';
import TrackOrderScreen from '../screens/orderScreens/TrackOrderScreen';
import CheckoutScreen from '../screens/checkoutScreens/CheckoutScreen';
import ShippingAddressScreen from '../screens/checkoutScreens/ShippingAddressScreen';
import PaymentMethodScreen from '../screens/checkoutScreens/PaymentMethodScreen';
import AuthStack from './AuthStack';
import { useAuth } from '../hooks/auth/useAuth';
import UpdateProfileScreen from '../screens/profileScreens/UpdateProfileScreen';
import AddNewShippingAddressScreen from '../screens/checkoutScreens/AddNewShippingAddressScreen';
export default function StackNavigation() {
    const Stack = createNativeStackNavigator();
    const userData = useAuth()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTab" component={TabNavigation} />
            {/* <Stack.Screen name='Home' component={HomeScreens} /> */}
            {userData?.user?.email ?
                <Stack.Group>
                    <Stack.Screen name='Profile' component={ProfileScreen} />
                    <Stack.Screen name='Profile Update' component={UpdateProfileScreen} options={{ headerShown: true }} />
                </Stack.Group> :
                <Stack.Screen name='authStack' component={AuthStack} />}

            <Stack.Screen name='Notification' component={NotificationScreens} />
            <Stack.Screen name='searchProduct' component={SearchProductScreens} />
            <Stack.Screen name='viewProduct' component={ViewProductScreen} />
            <Stack.Screen name='MyCart' component={MyCartScreens} />
            <Stack.Screen name='TrackOrder' component={TrackOrderScreen} />
            {
                userData?.user?.email ?
                    <Stack.Screen name='Checkout' component={CheckoutScreen} /> :
                    <Stack.Screen name='Checkout' component={AuthStack} />
            }
            <Stack.Screen name='ShippingAddress' component={ShippingAddressScreen} />
            <Stack.Screen name='Add New Address' component={AddNewShippingAddressScreen} options={{ headerShown: true }} />
            <Stack.Screen name='PaymentMethod' component={PaymentMethodScreen} />
        </Stack.Navigator>
    )
}