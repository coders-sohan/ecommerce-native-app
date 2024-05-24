import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileScreen from '../screens/profileScreens/ProfileScreen';
import WishlistScreen from '../screens/wishlistScreens/WishlistScreen';
import HomeScreens from '../screens/homeScreens/HomeScreens';
import ProductScreens from '../screens/productScreens/ProductScreens';
import SearchProductScreens from '../screens/searchProductScreens/SearchProductScreens';
import { useCartItem } from '../hooks/cartItem/useCartItem';
import MyCartScreens from '../screens/myCartScreens/MyCartScreens';
import AuthStack from './AuthStack';
import { useAuth } from '../hooks/auth/useAuth';
import { colors } from '../assets/theme/styles';

export default function TabNavigation() {
    const cartItem = useCartItem();
    const cartBadge = cartItem.length;
    const Tab = createBottomTabNavigator();

    const userData = useAuth();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarInactiveTintColor: 'white', tabBarActiveTintColor: colors?.secondary, tabBarStyle: { backgroundColor: '#1C1A28', height: 80, marginHorizontal: 10, marginBottom: 10, borderRadius: 17 }, }}>
            <Tab.Screen name='Home' component={HomeScreens} options={{
                tabBarIcon: ({ color }) => (<Icon name="home-variant" size={34} style={{ color: color }} />)
            }} />
            <Tab.Screen name='product' component={SearchProductScreens} options={{
                tabBarIcon: ({ color }) => (<Icon name="view-grid" size={34} style={{ color: color }} />)
            }} />
            <Tab.Screen name='ViewProduct' component={MyCartScreens} options={{
                tabBarBadge: cartBadge,
                tabBarBadgeStyle: { marginTop: 15 },
                tabBarIcon: ({ color }) => (<Icon name="cart-outline" size={34} style={{ color: color }} />)
            }} />
            {userData?.user?.email ? <Tab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarIcon: ({ color }) => (<Icon name="account-circle-outline" size={34} style={{ color: color }} />)
            }} /> : <Tab.Screen name='Profile' component={AuthStack} options={{
                tabBarIcon: ({ color }) => (<Icon name="account-circle-outline" size={34} style={{ color: color }} />)
            }} />}
        </Tab.Navigator>
    )
}