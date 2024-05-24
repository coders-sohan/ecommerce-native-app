import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating } from 'react-native-ratings';
import { colors } from '../../assets/theme/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/features/cartData/cartItemSlice';
import { useCheckCartItem } from '../../hooks/cartItem/useCartItem';
import { showMessage } from 'react-native-flash-message';
import { addWishlistItem, useAddWishlishtDataMutation } from '../../store/features/wishlishtData/wishlishtDataSlice';
import { useNavigation } from '@react-navigation/native';
import { Spinner } from 'native-base';



export default function ProductCard({ item, userId, checkWishListItem }) {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [addWishlishtData, { isError, isLoading, error, data, isSuccess }] = useAddWishlishtDataMutation();
    //check that item is wishlisht or not
    const { images, discount, title, price, ratings, _id, brand } = item;
    // wishlisht item cheaker item is wishlist or not (given value true or false)
    const isWishLisht = checkWishListItem(_id);
    // add item to cart
    const handleAddCart = () => {
        const data = {
            _id, images: images[0]?.url, title, price, brand, discount
        }
        dispatch(addCartItem(data))
    }
    // check item is already cart or not 
    const checkItem = useCheckCartItem();
    const isCart = checkItem(_id);

    // handle data to add wishlisht
    const handleWishlisht = async () => {
        const Itemdata = {
            userId: userId,
            items: { itemId: _id, title, price, image: images[0]?.url }
        }
        if (userId) {
            await addWishlishtData(Itemdata)
            dispatch(addWishlistItem(Itemdata?.items))

        }
        else {
            showMessage({
                type: 'warning',
                message: "please login and try",
                duration: 3000,
            })
        }
    }
    // handle success or failed status 
    useEffect(() => {
        if (error) {
            showMessage({
                type: 'danger',
                message: "Something wrong try again!",
                duration: 3000
            })
        }
        if (isSuccess) {
            showMessage({
                type: 'success',
                message: "item added",
                duration: 3000
            })

        }

    }, [data, isSuccess, error]);



    return (
        <View>
            <TouchableOpacity style={{
                backgroundColor: '#FFFFFF',
                padding: 10,
                marginTop: 10,
                borderRadius: 11,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
                elevation: 7,
            }}
                onPress={() => navigation.navigate("viewProduct", { data: item })}
            >
                {/* product card header   */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ backgroundColor: '#A7C2FC', borderRadius: 5, padding: 5 }}>
                        {/* discount  */}
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 7, color: '#FFFFFF' }}>{discount}% off</Text>
                    </View>
                    {/* wish lisht button  */}
                    <TouchableOpacity
                        onPress={handleWishlisht}
                        disabled={isWishLisht}
                    >
                        {
                            isLoading ? <Spinner /> : <IconM name="cards-heart" size={16} color={isWishLisht ? "#ff3034" : 'black'} />
                        }

                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                    {/* card image  */}
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 96, height: 96, borderRadius: 100, backgroundColor: '#E6EDFE', }}>
                            <View style={{ width: 96, height: 96, borderRadius: 100, backgroundColor: '#CEDCFB', transform: [{ scale: .8 }] }}>
                                <View style={{ width: 96, height: 96, borderRadius: 100, backgroundColor: '#A7C2FC', transform: [{ scale: .7 }] }}>
                                    <View style={{}}>
                                        <Image source={{ uri: images?.[0] }} style={{ width: 100, height: 100, transform: [{ scale: 1.9 }], marginTop: -10 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* product description  */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View>
                            <View>
                                <Text style={{ fontFamily: 'Inter-bold', fontSize: 14, color: '#544C4C', fontWeight: '800' }}>{title?.slice(0, 18)}</Text>
                                <Text style={{ fontFamily: 'Inter-bold', fontSize: 14, color: '#000000', fontWeight: '800' }}>৳{price}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Rating
                                    readonly
                                    ratingCount={5}
                                    startingValue={5}
                                    imageSize={12}
                                    style={{ padding: 0, margin: 0, alignItems: 'flex-start' }}
                                />
                            </View>
                        </View>
                        {/* add cart button  */}
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={handleAddCart} disabled={isCart} >
                            <Icon name={isCart ? 'shop' : "add-circle"} size={31} color={isCart ? colors.primary : colors?.secondary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}