// core libary configuration component 
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
//third party libary
import { useDispatch } from 'react-redux'
// redux add to cart item to store item local storage
import { addCartItem } from '../../store/features/cartData/cartItemSlice';
// custom  default styles 
import { colors } from '../../assets/theme/styles'
import { Rating } from 'react-native-ratings';


export default function ProductActionContent({ details }) {
    // details and review tab by default set 1 means open details tab 2 for review item 
    const [tab, setTab] = useState(1);
    // product size like t shir size  state
    const [size, setSize] = useState('S')
    //    for add item to persitst storage 
    const dispatch = useDispatch();
    // product details 
    const { title, description, reviews, ratings, benefits, suggested, price, discount } = details;

    return (
        <View style={{ width: '100%' }} >
            <View style={{ marginHorizontal: 20 }}>
                {/* product title  */}
                <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontFamily: 'Inter-Bold', color: '#FFFFFF', fontSize: 25 }}>{title}</Text>
                    <View>
                        <View style={{
                            backgroundColor: '#ffffff',
                            padding: 2,
                            borderRadius: 15,
                            alignItems: 'center',
                            marginBottom: 5,
                            width: 50,

                        }}>
                            <Text style={{ fontFamily: 'Inter-Bold', color: '#000000', fontSize: 14 }}> {discount} %</Text>
                        </View>

                        <Text style={{ fontFamily: 'Inter-Bold', color: colors.secondary, fontSize: 25 }}>৳ {price}</Text>
                    </View>

                </View>
                {/* product size selection item  */}
                {/* <View style={{ marginTop: 20 }}>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF' }}>Size</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: size === 'S' ? '#DECAFF' : '#23212E',
                                ...styles.productSizeButton
                            }}
                            onPress={() => setSize('S')}
                        >
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: size === 'S' ? 'black' : '#FFFFFF' }}>S</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: size === 'M' ? '#DECAFF' : '#23212E',
                                ...styles.productSizeButton
                            }}
                            onPress={() => setSize('M')}
                        >
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: size === 'M' ? 'black' : '#FFFFFF' }}>M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: size === 'L' ? '#DECAFF' : '#23212E',
                                ...styles.productSizeButton
                            }}
                            onPress={() => setSize('L')}
                        >
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: size === 'L' ? 'black' : '#FFFFFF' }}>L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: size === 'XL' ? '#DECAFF' : '#23212E',
                                ...styles.productSizeButton
                            }}
                            onPress={() => setSize('XL')}
                        >
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: size === 'XL' ? 'black' : '#FFFFFF' }}>XL</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                {/* details and review tab  */}
                <View style={{ marginTop: 20, flexDirection: 'row', gap: 20 }}>
                    {/* tab selector button  */}
                    <TouchableOpacity
                        style={{ borderBottomWidth: tab === 1 ? 2 : 0, borderBottomColor: colors.secondary }}
                        onPress={() => setTab(1)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF' }}>Details</Text>
                    </TouchableOpacity>
                    {/* tab selector button  */}

                    <TouchableOpacity
                        style={tab === 3 ? { borderBottomWidth: 2, borderBottomColor: colors.secondary } : {}}
                        onPress={() => setTab(3)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF' }}>Benefits</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tab === 4 ? { borderBottomWidth: 2, borderBottomColor: colors.secondary } : {}}
                        onPress={() => setTab(4)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF' }}>Suggested</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tab === 2 ? { borderBottomWidth: 2, borderBottomColor: colors.secondary, } : {}}
                        onPress={() => setTab(2)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF' }}>Review</Text>
                    </TouchableOpacity>
                </View>
                {/* details and review based on active tab  */}
                <View style={{ marginTop: 10 }}>
                    {
                        tab === 1 &&
                        <ScrollView style={{ maxHeight: 250, overflow: 'scroll' }}>
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF', textAlign: 'justify', overflow: 'scroll' }}>
                                {description}
                            </Text>
                        </ScrollView>


                    }
                    {
                        tab === 2 &&
                        <View>
                            {reviews &&
                                // <Rating
                                //     type='custom'
                                //     readonly
                                //     startingValue={ratings}
                                //     ratingBackgroundColor='black'
                                //     imageSize={30}
                                //     tintColor="#141221"

                                // /> :
                                <Text style={{ fontFamily: 'Inter-Bold', color: 'white' }}>{reviews.length} Reviews</Text>
                            }
                        </View>
                    }
                    {
                        tab === 3 &&
                        <ScrollView style={{ maxHeight: 250, overflow: 'scroll' }}>
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF', textAlign: 'justify', overflow: 'scroll' }}>
                                {benefits}
                            </Text>
                        </ScrollView>


                    }
                    {
                        tab === 4 &&
                        <ScrollView style={{ maxHeight: 250, overflow: 'scroll' }}>
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 14, color: '#FFFFFF', textAlign: 'justify', overflow: 'scroll' }}>
                                {suggested}
                            </Text>
                        </ScrollView>


                    }
                </View>
                {/* add cart button  */}
                <View style={{ marginVertical: 20 }}>
                    <TouchableOpacity
                        style={{ padding: 15, backgroundColor: colors.secondary, alignItems: 'center', borderRadius: 15, marginHorizontal: 30, }}
                        onPress={() => dispatch(addCartItem(details))}
                    >
                        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#FFFFFF', fontWeight: '700' }}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
// custom style sheet for common use
const styles = StyleSheet.create({
    productSizeButton: {
        borderRadius: 7,
        borderWidth: 2,
        borderColor: colors.secondary,
        width: 28,
        height: 28,
        alignItems: 'center',
        marginRight: 10
    },

}) 