import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Rating } from 'react-native-ratings';

const MyOrderCard = ({ navigation, item, tab }) => {
    const title = item?.item?.orderItems[0]?.title;
    const image = item.item?.orderItems?.[0]?._id?.images[0]
    return (
        <View style={{
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
        }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* card image  */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#E6EDFE', }}>
                        <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#CEDCFB', transform: [{ scale: .8 }] }}>
                            <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#A7C2FC', transform: [{ scale: .7 }] }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image source={{ uri: image }} style={{ width: 100, height: 100, transform: [{ scale: 1.5 }], marginTop: -20 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 14, color: '#585CB4', fontWeight: '800' }}>{title ? title?.slice(0, 15) : 'product name'}</Text>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 16, color: '#585CB4', fontWeight: '800', marginTop: 3 }}>${item?.item?.totalPrice}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Rating
                            readonly
                            ratingCount={1}
                            startingValue={5}
                            imageSize={12}
                            style={{ padding: 0, margin: 0, alignItems: 'flex-start' }}
                        />
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 12, color: '#A69797' }}>
                            (4.5)
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 10 }}>
                        {tab === 1 ?
                            <TouchableOpacity
                                style={{ backgroundColor: '#C2C3BB', height: 24, padding: 1, borderRadius: 15, backgroundColor: '#000000', paddingHorizontal: 10 }}
                                onPress={() => navigation.navigate("TrackOrder", { item })}
                            >
                                <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 14 }}>Track Order</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={{ backgroundColor: '#C2C3BB', height: 24, padding: 1, borderRadius: 15, backgroundColor: '#000000', paddingHorizontal: 10 }}>
                                <Text style={{ textAlign: 'center', color: '#FFFFFF', fontFamily: 'Inter-Bold', fontSize: 14 }}>Leave Review</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({})

export default MyOrderCard;
