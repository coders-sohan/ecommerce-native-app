import { View, TextInput } from 'react-native'
import React from 'react'
import PublicDivision from '../publicAddress.js/PublicDivision'
import PublicDistrict from '../publicAddress.js/PublicDistrict'
import PublicThana from '../publicAddress.js/PublicThana'

const AddressForm = ({
    setDivision,
    division,
    setDistrict,
    setUpzila,
    district,
    setVillage,
    setHouse,
    setZipCode,
    upzila
}) => {
    return (
        <View>
            <View>
                <PublicDivision setDivision={setDivision} />
            </View>

            <View style={{ marginVertical: 10 }}>
                {division && <PublicDistrict division={division} setDistrict={setDistrict} />}
            </View>
            <View >
                {district && <PublicThana setUpzila={setUpzila} data={district} />}
            </View>
            <View>
                {upzila &&
                    <View>
                        <View style={{ marginVertical: 5, marginTop: 10 }}>
                            <TextInput
                                placeholder='village'
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#333',
                                    fontFamily: 'Inter-Bold',
                                    borderRadius: 30,
                                    fontSize: 14,
                                    fontWeight: '400',
                                    backgroundColor: '#F2ECEE',
                                    marginHorizontal: 10,
                                    paddingVertical: 7,
                                    paddingLeft: 20,
                                }}
                                onChangeText={setVillage}
                            />
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <TextInput
                                placeholder='House'
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#333',
                                    fontFamily: 'Inter-Bold',
                                    borderRadius: 30,
                                    fontSize: 14,
                                    fontWeight: '400',
                                    backgroundColor: '#F2ECEE',
                                    marginHorizontal: 10,
                                    paddingVertical: 7,
                                    paddingLeft: 20,
                                }}
                                onChangeText={setHouse}
                            />
                        </View>
                        <View style={{ marginVertical: 5 }}>
                            <TextInput
                                placeholder='Zip Code'
                                keyboardType='number-pad'
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#333',
                                    fontFamily: 'Inter-Bold',
                                    borderRadius: 30,
                                    fontSize: 14,
                                    fontWeight: '400',
                                    backgroundColor: '#F2ECEE',
                                    marginHorizontal: 10,
                                    paddingVertical: 7,
                                    paddingLeft: 20,
                                }}
                                onChangeText={setZipCode}
                            />
                        </View>
                    </View>
                }
            </View>

        </View>
    )
}
export default AddressForm;