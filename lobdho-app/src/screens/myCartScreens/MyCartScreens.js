// core configaration component 
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
// custom components
import CartItem from '../../components/cartItem/CartItem';
import NoCardItem from '../../components/cartItem/NoCartItem';
// third party components 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrow from 'react-native-vector-icons/SimpleLineIcons';
// styles 
import { colors, padding } from '../../assets/theme/styles';
// hooks
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../store/features/cartData/cartItemSlice';
import { useCartItem } from '../../hooks/cartItem/useCartItem';


export default function MyCartScreens({ navigation }) {
    const [checkoutItem, setChekoutItem] = useState([]);
    const [netAmount, setNetAmount] = useState(0);
    const [discountedAmount, setDiscountedAmount] = useState(0);
    // carts product data 
    const [cartItem, setCartItem] = useState([]);
    // remove product from cart item state 
    const [selectedItem, setSelectedItem] = useState(null);
    // redux action 
    const dispatch = useDispatch();
    // load cart item data from persist storage 
    const cartData = useCartItem();
    //set cart data to show cart item & initaial price calculation
    useEffect(() => {
        if (cartData) {
            setCartItem(cartData);
            setNetAmount(cartData.reduce((accumulator, { price, quantity, discount }) => {
                // const discountedAmount = accumulator + (quantity * price) * (discount / 100)

                return accumulator + (quantity * price)
            }, 0))
            setDiscountedAmount(cartData.reduce((accumulator, { price, quantity, discount }) => {


                return accumulator + (quantity * price) * (discount / 100)
            }, 0))
        }
    }, [cartData]);
    // handle delete cart item from persist storage 
    const handleDeleteCartItem = () => {
        dispatch(removeCartItem(selectedItem));
        setSelectedItem(null)
    };


    return (
        <View style={{ paddingTop: padding.default, marginHorizontal: 20, flex: 1 }}>
            {/* custom header  */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow name="arrow-left" size={18} color="#000000" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>My Cart</Text>
                </View>
                <View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleDeleteCartItem} >
                        <Icon name='delete' style={{ fontSize: 20, color: selectedItem ? 'red' : '#888888' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View >
                {/* show cart product  */}
                {cartItem?.length > 0 ?
                    <View style={{ marginTop: 30, marginBottom: 10 }}>
                        <FlatList
                            data={cartItem}
                            renderItem={(item) =>
                            (<CartItem {...item}
                                key={item?._id}
                                selectedItem={selectedItem}
                                setSelectedItem={setSelectedItem}
                                netAmount={netAmount}
                                setNetAmount={setNetAmount}
                            />)
                            }
                        />
                    </View> :
                    <View>
                        <NoCardItem navigation={navigation} />
                    </View>
                }
            </View>
            {/* // amount calculation            */}
            {cartItem?.length > 0 ?
                <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 30, marginBottom: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 20 }}>
                        <Text style={{ fontFamily: 'Inter-ExtraBold', color: '#B9B7C5', fontSize: 15 }}>SubTotal:   <Text style={{ color: '#000000' }}>৳ {netAmount}</Text></Text>
                        {/* tax amout if tax applicable  */}
                        <Text style={{ fontFamily: 'Inter-ExtraBold', color: '#B9B7C5', fontSize: 15 }}>shipping:   <Text style={{ color: '#000000' }}>৳ 65</Text></Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, }}>
                        <View>
                            <Text style={{ fontFamily: 'Inter-SemiBold', color: '#000000', fontSize: 18, fontStyle: 'italic' }}>Final price with shipping cost</Text>
                        </View>

                    </View>
                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {/* net total amout  */}
                            <View>
                                <Text style={{ fontFamily: 'Inter-ExtraBold', color: '#000000', fontSize: 30 }}>৳ {netAmount - discountedAmount + 65}</Text>
                            </View>
                            {/* checkout button  */}
                            <TouchableOpacity
                                style={{ backgroundColor: colors.secondary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 18 }}
                                onPress={() => navigation.navigate("Checkout", { cartItem, netAmount: netAmount - discountedAmount + 65, itemPrice: netAmount - discountedAmount })}
                            >
                                <Text style={{ fontFamily: 'Inter-ExtraBold', color: '#ffffff', fontSize: 15, textAlign: 'center' }}>Check Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : <></>
            }
        </View>
    );
};