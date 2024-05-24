import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { colors, padding } from '../../assets/theme/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'native-base';
import ShippingAddressCard from '../../components/shippingAddress/ShippingAddressCard';


const ShippingAddressScreen = ({ navigation, route }) => {
    const address = route?.params?.data;
    // console.log(address?.data)

    return (
        <View style={{ flex: 1, backgroundColor: '#E4EAEA', paddingTop: padding.default }}>
            <View style={{ marginHorizontal: 20 }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={28} color="#000000" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>Shipping Address</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: '#9052F0', borderRadius: 10, padding: 5 }} onPress={() => navigation.navigate("MyCart")}>
                            <View style={{}}>
                                <Icon name="shopping-outline" size={20} color="#dddddd" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginHorizontal: 60, marginTop: 10 }}>
                    <Divider bg={'#A6A0A0'} />
                </View>
                {/* shipping address card item  */}
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={address}
                        renderItem={item => <View style={{ marginVertical: 15 }}><ShippingAddressCard data={`${item?.item?.city}, ${item?.item?.upazila},${item?.item?.village} ,${item?.item?.house} ,${item?.item?.ZipCode} `} /></View>}
                        style={{ marginBottom: 10 }}
                    />
                </View>
                <View style={{ marginHorizontal: 50, marginTop: 20 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.secondary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30 }}
                        onPress={() => navigation.navigate("Add New Address")}
                    >
                        <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 15, color: '#FFFFFF', textAlign: 'center' }}>Add New Address</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ShippingAddressScreen;
