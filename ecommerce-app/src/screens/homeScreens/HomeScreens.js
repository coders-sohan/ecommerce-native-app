import React from 'react'
import { View, Text, TouchableOpacity, } from 'react-native'
import { Avatar, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PopularProductCarusel from '../../components/homePageProduct/PopularProductCarusel';
import RecomandedProductCarusel from '../../components/homePageProduct/RecomandedProductCarusel';
import { colors, padding } from '../../assets/theme/styles';
import { useAuth } from '../../hooks/auth/useAuth';



export default function HomeScreens({ navigation }) {
    const userData = useAuth()
    return (
        <View style={{ backgroundColor: '#E4EAEA', flex: 1, }}>
            <View style={{ marginHorizontal: 20, paddingTop: padding.default }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.openDrawer()}>
                        {userData?.user?.image ?
                            <Avatar width={41} height={41} bg="green.500" source={{
                                uri: userData?.user?.image
                            }}>
                                {userData?.user?.name}
                            </Avatar> :
                            <Avatar width={41} height={41} bg={colors.secondary}
                            >
                                {userData?.user?.name ? userData.user.name.slice(0, 2) : 'L'}
                            </Avatar>
                        }

                        {/* user name  */}
                        <Text style={{ fontFamily: 'Inter-Regular', fontWeight: '700', fontSize: 13, color: '#675F5F', marginLeft: 10 }}>Hi, {userData?.user?.name ? userData?.user?.name : 'Welcome to lobdho'}</Text>
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: colors.secondary, borderRadius: 10, padding: 5 }} onPress={() => navigation.navigate("Notification")}>
                            <View>
                                <View style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 100, marginLeft: 16, marginBottom: -11 }}></View>
                                <Icon name="notifications-none" size={30} color="#FFFFFF" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* search bar */}
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 26, color: '#000000' }}>Good Product Waiting!</Text>
                    <View style={{ marginTop: 15 }}>
                        <Input variant="unstyled" rounded="md" onFocus={() => navigation.navigate("searchProduct")} placeholder="Search Product" placeholderTextColor="#DDCACA" leftElement={<Icon name="search" size={25} style={{ paddingLeft: 10, fontFamily: 'Inter-Bold', }} />} backgroundColor="#F6F6F6" size="lg" height={58} />
                    </View>
                </View>
            </View>
            {/* product carusel  */}
            <View>
                <PopularProductCarusel navigation={navigation} />
            </View>
            <View style={{}}>
                <RecomandedProductCarusel navigation={navigation} />
            </View>
        </View>
    )
}