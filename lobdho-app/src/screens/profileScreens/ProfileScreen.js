import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { colors, padding } from '../../assets/theme/styles'
import Arrow from 'react-native-vector-icons/SimpleLineIcons'
import { Avatar } from 'native-base'
import { useAuth } from '../../hooks/auth/useAuth'

export default function ProfileScreen({ navigation }) {
    const userData = useAuth()
    const presentAddress = userData?.user?.presentAddress?.[0]
    const address = `${presentAddress?.city},${presentAddress?.upazila},${presentAddress?.village},${presentAddress?.house},${presentAddress?.ZipCode}`
    return (
        <ScrollView style={{ paddingTop: padding.default, flex: 1, backgroundColor: '#E4EAEA', }}>
            <View style={{ marginHorizontal: 20, }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Arrow name="arrow-left" size={18} color="#000000" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginLeft: '30%', }}>
                        <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22, textAlign: 'center' }}>My Profile</Text>
                    </View>
                </View>
                {/* personal details card  */}
                <View style={{ marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#000000', fontStyle: 'italic' }}>Personal Details</Text>
                        {/* update button  */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Profile Update", { userData })}
                        >
                            <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#000000', fontStyle: 'italic' }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileContainer}>
                        <View style={{ borderRadius: 10 }}>
                            <Avatar width={88} height={88} bg="green.500" source={{
                                uri: userData?.user?.image
                            }}>
                                {userData?.user?.name?.slice(0, 2)}
                            </Avatar>
                        </View>
                        <View style={{ marginLeft: 15 }} >
                            {/* name  */}
                            <View style={{ marginVertical: 5 }}>
                                <Text style={styles.listCardText}>{userData?.user?.name}</Text>
                            </View>

                            <View style={{ opacity: .5, }}>
                                <Text style={{ fontFamily: 'Inter-Light', fontSize: 15, color: '#000000', fontStyle: 'italic' }}>{userData?.user?.email}</Text>
                                <Text style={{ fontFamily: 'Inter-Light', fontSize: 15, color: '#000000', fontStyle: 'italic', marginVertical: 5 }}> {userData?.user?.PhoneNumber}</Text>
                                <View style={{ marginRight: 90 }}>
                                    <Text style={{ fontFamily: 'Inter-Light', fontSize: 15, color: '#000000', fontStyle: 'italic' }}>
                                        {address}
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
                <View >
                    <TouchableOpacity style={styles.listCard} onPress={() => navigation.navigate("orders")}>
                        <Text style={styles.listCardText}>Orders</Text>
                        <Arrow name="arrow-right" size={18} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listCard} onPress={() => navigation.navigate("WishList")}>
                        <Text style={styles.listCardText}>My Wishlist</Text>
                        <Arrow name="arrow-right" size={18} color="#000000" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.listCard}>
                        <Text style={styles.listCardText}>Pending reviews</Text>
                        <Arrow name="arrow-right" size={18} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listCard}>
                        <Text style={styles.listCardText}>Faq</Text>
                        <Arrow name="arrow-right" size={18} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listCard}>
                        <Text style={styles.listCardText}>Orders</Text>
                        <Arrow name="arrow-right" size={18} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listCard}>
                        <Text style={styles.listCardText}>Logout</Text>
                        <Arrow name="arrow-right" size={18} color="#000000" />
                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                    style={{ paddingHorizontal: 40, paddingVertical: 15, backgroundColor: colors.secondary, borderRadius: 30, marginVertical: 20, alignItems: 'center', }}
                    onPress={() => navigation.navigate("Profile Update")}
                >
                    <Text style={{ fontFamily: 'Inter-Light', fontStyle: 'italic', color: '#F6F6F9', fontSize: 17 }}>Update</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    listCard: {
        padding: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    listCardText: {
        fontFamily: 'Inter-Regular', fontSize: 18, color: '#000000', fontStyle: 'italic'
    },
    profileContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        flexDirection: 'row',

        marginTop: 10,
    }
})