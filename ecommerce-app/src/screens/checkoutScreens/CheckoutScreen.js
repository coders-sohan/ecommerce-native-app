import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { colors, padding } from '../../assets/theme/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ShoppingIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'native-base';
import ShippingAddressCard from '../../components/shippingAddress/ShippingAddressCard';
import CartItem from '../../components/cartItem/CartItem';
import { useAuth } from '../../hooks/auth/useAuth';

const CheckoutScreen = ({ navigation, route }) => {
    const orderData = route.params?.cartItem
    const netAmount = route.params?.netAmount;
    const itemPrice = route.params?.itemPrice;
    const user = useAuth()
    const shippingAddress = user?.user?.shippingAddress[0];

    return (
        <View style={{ flex: 1, backgroundColor: '#E4EAEA', paddingTop: padding.default }}>
            <View style={{ marginHorizontal: 20 }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={28} color="#000000" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>Check out</Text>

                    </View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: colors.secondary, borderRadius: 10, padding: 5 }} onPress={() => navigation.navigate("MyCart")}>
                            <View style={{}}>
                                <ShoppingIcon name="shopping-outline" size={20} color="#dddddd" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginHorizontal: 60, marginTop: 10 }}>
                    <Divider bg={'#A6A0A0'} />
                </View>

                <ScrollView style={{ marginBottom: 30 }}>
                    {/* shipping address card  */}
                    <View style={{ marginTop: 10, marginBottom: 15 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.title}>Shipping Address</Text>
                        </View>
                        {
                            shippingAddress?.city && shippingAddress?.upazila && shippingAddress?.village ?
                                <ShippingAddressCard navigation={navigation} data={`${shippingAddress?.city}, ${shippingAddress?.upazila},${shippingAddress?.village} ,${shippingAddress?.house} ,${shippingAddress?.ZipCode} `}
                                    address={user?.user?.shippingAddress}
                                    navigate={false}
                                /> :
                                <TouchableOpacity
                                    onPress={navigation.navigate('Profile Update')}
                                    style={{
                                        padding: 15,
                                        paddingHorizontal: 20,
                                        borderRadius: 30,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 5,
                                        },
                                        shadowOpacity: 0.36,
                                        shadowRadius: 6.68,
                                        elevation: 11,
                                    }}
                                >
                                    <Text style={{ color: '#000000' }}>Update Your Profile</Text>
                                </TouchableOpacity>
                        }

                    </View>
                    <View style={{ marginHorizontal: 40, }}>
                        <Divider bg={"#A6A0A0"} />
                    </View>
                    {/* order item list  */}
                    <View style={{ marginTop: 10 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.title}>Order List</Text>
                        </View>
                        <View>
                            {orderData?.map(item => {
                                return <CartItem item={item} key={item._id} disabled={true} />
                            })}
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 40, }}>
                        <Divider bg={"#A6A0A0"} />
                    </View>
                    {/* shipping type section  */}
                    <View style={{ marginTop: 10, marginBottom: 15 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.title}>Choose Shipping </Text>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: '#FFFFFF', borderRadius: 20, padding: 10, paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Icon name="truck-fast-outline" size={29} color="#8E8888" />
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: "#000000" }}>Choose Shipping Type</Text>
                            </View>
                            <View>
                                <Icon name="chevron-right" size={29} color="#000000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 40 }}>
                        <Divider bg={"#A6A0A0"} />
                    </View>
                    {/* promo code input field  */}
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={styles.title}>Promo Code</Text>
                        </View>
                        <View>
                            <TextInput placeholder='Enter Promo Code ' style={{ ...styles.title, color: '#8E8888', backgroundColor: '#DBDBDB', paddingLeft: 40, borderRadius: 20 }} />
                        </View>
                    </View>
                    {/* calculation cart  */}
                    <View style={{ marginTop: 8 }}>
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, padding: 15, paddingHorizontal: 20 }}>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 15, color: '#B9B7C5' }}>Subtotal: <Text style={{ color: '#000000' }}>৳{netAmount}</Text></Text>
                                <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 15, color: '#B9B7C5' }}>Taxes: <Text style={{ color: '#000000' }}>৳0</Text></Text>
                            </View>
                            <View style={{ marginHorizontal: 40 }}>
                                <Divider bg={"#A6A0A0"} my="4" />
                            </View> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginTop: 5 }}>
                                <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 30, color: "#000000" }}>Total:</Text>
                                <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 30, color: "#000000" }}>৳{netAmount}</Text>
                            </View>
                        </View>
                    </View>
                    {/* continue payment button */}
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 25, marginHorizontal: 50, marginVertical: 10 }}>
                        <TouchableOpacity style={{ backgroundColor: colors.secondary, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 30 }} onPress={() => navigation.navigate("PaymentMethod", { data: orderData, itemPrice, amount: netAmount, user: { ...user?.user }, shippingAddress: shippingAddress })}>
                            <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 15, color: '#FFFFFF', textAlign: 'center' }}>Continue to payment</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Inter-Medium',
        fontSize: 15,
        color: '#000000'
    }
})

export default CheckoutScreen;
