import React from 'react'
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import OrderScreens from '../../screens/orderScreens/OrderScreens';
import StackNavigation from '../StackNavigation';
import CustomDrawer from './CustomDrawer';
import ProfileScreen from '../../screens/profileScreens/ProfileScreen';
import PrivacyPolicyScreen from '../../screens/privacyPolicy/privacyPolicyScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../assets/theme/styles';
import PaymentMethodScreen from '../../screens/checkoutScreens/PaymentMethodScreen';
import WishlistScreen from '../../screens/wishlistScreens/WishlistScreen';
import AuthStack from '../AuthStack';
import { useAuth } from '../../hooks/auth/useAuth';

export default function DrawarNavigation() {
    const Drawar = createDrawerNavigator();
    // const user = false;
    const userData = useAuth()
    return (
        <Drawar.Navigator
            drawerCont
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: colors.secondary,
                drawerInactiveBackgroundColor: '#FFFFFF',
                drawerActiveTintColor: '#FFFFFF',
                drawerItemStyle: {

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderRadius: 10,
                    marginTop: 15,


                },
                drawerLabelStyle: {
                    // marginLeft: -20,
                    fontFamily: 'Inter-Bold',
                    marginLeft: -20
                },
                drawerStyle: {
                    marginTop: -70,
                    paddingTop: 0,
                    flex: 1,
                    backgroundColor: '#FFFFFF'
                }
            }}

            drawerContent={props => <CustomDrawer {...props} drawerHideStatusBarOnOpen={true} overlayColor={0} />} >
            <Drawar.Screen name='homeStackNavigation' component={StackNavigation} options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerItemStyle: { height: 0 }
            }} />
            {userData?.user?.email ?
                <Drawar.Group>
                    <Drawar.Screen name='profile' component={ProfileScreen}
                        options={{
                            drawerIcon: ({ color, focused, size }) => <Icon name="account-circle" size={size} color={color} />,
                            drawerLabel: 'My Profile'
                        }}
                    />
                    <Drawar.Screen name='orders' component={OrderScreens}
                        options={{
                            drawerIcon: ({ color, focused, size }) => <Icon name="shopping" size={size} color={color} />,
                            drawerLabel: 'Orders'
                        }}
                    />
                    <Drawar.Screen name='WishList' component={WishlistScreen}
                        options={{
                            drawerIcon: ({ color, focused, size }) => <Icon name="heart" size={size} color={color} />,
                            drawerLabel: 'Wish List'
                        }}
                    />
                    {/* <Drawar.Screen name='payment' component={PaymentMethodScreen}
                        options={{
                            drawerIcon: ({ color, focused, size }) => <Icon name="credit-card" size={size} color={color} />,
                            drawerLabel: 'Payment'
                        }}
                    />
                    <Drawar.Screen name='account&secqurity' component={ProfileScreen}
                        options={{
                            drawerIcon: ({ color, focused, size }) => <Icon name="shield-account" size={size} color={color} />,
                            drawerLabel: 'Accounts & Secqurity'
                        }}
                    /> */}
                </Drawar.Group> :
                <Drawar.Group>
                    <Drawar.Screen name='authStackNavigation' component={AuthStack} options={{
                        drawerLabel: () => null,
                        title: null,
                        drawerIcon: () => null,
                        drawerItemStyle: { height: 0 }
                    }} />

                </Drawar.Group>

            }
            {/* <Drawar.Screen name='help' component={ProfileScreen}
                options={{
                    drawerIcon: ({ color, focused, size }) => <Icon name="help" size={size} color={color} />,
                    drawerLabel: 'Help'
                }}
            /> */}
        </Drawar.Navigator>
    )
}