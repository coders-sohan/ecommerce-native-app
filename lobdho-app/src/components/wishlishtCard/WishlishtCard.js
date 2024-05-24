import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
//third party components
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Spinner } from 'native-base';
import { showMessage } from 'react-native-flash-message';
// redux api fetch 
import { useDeleteWishlishtItemMutation } from '../../store/features/wishlishtData/wishlishtDataSlice';
import { useNavigation } from '@react-navigation/native';


export default function WishlishtCard({ item, userId, setDeleteItem }) {
    const [deleteWishlishtItem, { error, isLoading, data, }] = useDeleteWishlishtItemMutation();
    const navigation = useNavigation();
    const handleWishlist = () => {

        Alert.alert('Are you sure?', 'Remove item from wishlist', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel')
        },
        {
            text: 'Delete',
            onPress: () => {
                const payload = { userId, ItemId: item?.itemId?._id }
                // console.log(payload)
                deleteWishlishtItem(payload)
                setDeleteItem(payload)
            }
        }
        ])
    }
    useEffect(() => {
        setDeleteItem(data)
        if (error) {
            showMessage({
                type: 'danger',
                message: 'Something went wrong! try again!'
            })
        }

    }, [data, error])


    return (
        <TouchableOpacity style={{
            backgroundColor: '#FFFFFF',
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
            borderRadius: 30,
            marginBottom: 15
        }}
            onPress={() => navigation.navigate("viewProduct", { data: item?.itemId })}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* card image  */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#E6EDFE', }}>
                        <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#CEDCFB', transform: [{ scale: .8 }] }}>
                            <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#A7C2FC', transform: [{ scale: .7 }] }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={{ uri: item.itemId?.images?.[0] }} style={{ width: 80, height: 80, transform: [{ scale: 1.5 }], marginTop: -20 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 14, color: '#585CB4', fontWeight: '800' }}>{item?.title?.slice(0, 25)}</Text>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 16, color: '#585CB4', fontWeight: '800' }}>${item?.price}</Text>
                    </View>
                </View>
                {/* button heart  */}
                <TouchableOpacity
                    style={{ backgroundColor: '#C2C3BB', borderRadius: 100, padding: 5, width: 40, height: 40, marginRight: 10 }}
                    onPress={handleWishlist}
                >
                    {
                        isLoading ? <Spinner /> : <IconM name="cards-heart" size={30} color="#ff3034" />
                    }

                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}