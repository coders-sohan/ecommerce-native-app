import { View, Text, Image } from 'react-native'
import React from 'react'

import { Rating } from 'react-native-ratings';

const TrackOrderProductCard = ({ data }) => {
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* card image  */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
                    <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#E6EDFE', }}>
                        <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#CEDCFB', transform: [{ scale: .8 }] }}>
                            <View style={{ width: 76, height: 76, borderRadius: 100, backgroundColor: '#A7C2FC', transform: [{ scale: .7 }] }}>
                                <View style={{ alignItems: 'center' }}>
                                    {data?.image
                                        && <Image source={{ uri: data.image }} style={{ width: 100, height: 100, transform: [{ scale: 1.5 }], marginTop: -20 }} />
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 14, color: '#585CB4', fontWeight: '800' }}>{data?.title ? data.title : 'title'}</Text>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 16, color: '#585CB4', fontWeight: '800', marginTop: 3 }}>${data?.price ? data?.price : ''}</Text>
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
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({})

export default TrackOrderProductCard;
