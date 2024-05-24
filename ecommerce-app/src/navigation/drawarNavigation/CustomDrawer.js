import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Avatar } from 'native-base';
import { useAuth } from '../../hooks/auth/useAuth';
import { colors } from '../../assets/theme/styles';
import useFirebase from '../../hooks/auth/useFirebase';

export default function CustomDrawer(props) {
    const { logOut } = useFirebase()
    const userData = useAuth()
    const address = userData?.user?.presentAddress;
    // console.log(userData)
    const image = { uri: 'https://img.freepik.com/premium-photo/shopping-cart-with-blank-mobile-phone-pastel-pink-background-e-commerce-online-buying-online-commerce-background-technology-shopping-day-black-friday-network-copy-space-mock-up_146482-2148.jpg' }
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} >
                <View>
                    <ImageBackground source={image} style={{ paddingTop: 60, paddingVertical: 20, flex: 1 }} resizeMode="cover" >
                        <View style={{ color: '#fff', marginLeft: 20 }}>
                            {userData?.user?.image ?
                                <Avatar width={50} height={50} rounded="full" bg={colors.primary} source={{ uri: userData?.user?.image }} >
                                    {/* {userData?.user?.name?.slice(0, 2)} */}
                                </Avatar> :
                                <Avatar width={50} height={50} rounded="full" bg={colors.primary}  >
                                    {userData?.user?.name ? userData?.user?.name.slice(0, 2) : 'L'}
                                </Avatar>
                            }
                        </View>
                        <View style={{ paddingVertical: 5, justifyContent: 'flex-start' }}>
                            <Text style={{ color: '#fff', fontSize: 17, fontFamily: 'Inter-Bold', textAlign: 'justify' }}>   {userData?.user?.name ? userData.user.name : 'Annonymus'}</Text>
                            <Text style={{ color: '#fff', fontFamily: 'Inter-Bold', fontSize: 14, marginLeft: 10 }}>{userData?.user?.email ? userData?.user?.email : 'you are not logged in'}</Text>
                            <Text style={{ color: '#fff', fontFamily: 'Inter-Bold', fontSize: 12, marginLeft: 10 }}>{address?.[0]?.city},{address?.[0]?.upazila},{address?.[0]?.village}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ backgroundColor: '#fff', borderTopColor: '#ccc', borderTopWidth: 1, padding: 20 }} >
                {userData?.user?.email ?
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={logOut} >
                        <View>
                            <Icon name='logout' size={30} color="#333" />
                            <Text style={{ color: '#333' }}>Log Out</Text>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => props.navigation.navigate("authStackNavigation")} >
                        <View>
                            <Icon name='login' size={30} color="#333" />
                            <Text style={{ color: '#333' }}>Log In</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>

    )
}