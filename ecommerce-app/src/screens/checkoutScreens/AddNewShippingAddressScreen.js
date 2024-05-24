import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../assets/theme/styles';
import AddressForm from '../../components/addressform/AddressForm';

const AddNewShippingAddressScreen = () => {
    const [division, setDivision] = useState(null);
    const [district, setDistrict] = useState(null);
    const [upzila, setUpzila] = useState(null);
    const [village, setVillage] = useState(null)
    const [house, setHouse] = useState(null)
    const [ZipCode, setZipCode] = useState(null)

    const handleUpdate = () => {
        const data = {
            shippingAddress: { city: district?.district, upazila: upzila, village, house, ZipCode },

        }
        console.log(data)
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', marginTop: 10 }}>
            <AddressForm
                setDivision={setDivision}
                division={division}
                setDistrict={setDistrict}
                setUpzila={setUpzila}
                district={district}
                upzila={upzila}
                setVillage={setVillage}
                setHouse={setHouse}
                setZipCode={setZipCode}
            />
            <View>
                {
                    village && <View style={{ marginTop: 30, marginHorizontal: 50 }}>
                        <TouchableOpacity style={{
                            backgroundColor: colors.primary,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20


                        }}
                            onPress={handleUpdate}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 12, fontFamily: 'Inter-Bold', textAlign: 'center' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>


        </View>
    );
}

const styles = StyleSheet.create({})

export default AddNewShippingAddressScreen;
