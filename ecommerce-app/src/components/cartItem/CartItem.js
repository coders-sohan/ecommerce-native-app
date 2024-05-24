import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import nikeShoes from '../../assets/images/nike.png'
import { colors } from '../../assets/theme/styles';
import { useDispatch } from 'react-redux';
import { addCartItem, manageCartItemQuantity } from '../../store/features/cartData/cartItemSlice';

const CartItem = ({ navigation, item, selectedItem, setSelectedItem, disabled }) => {
    const dispatch = useDispatch()
    // const [total, setTotal] = useState(0)
    const { title, price, images, quantity, discount } = item;
    const handleSelection = () => {
        if (item._id === selectedItem) {
            setSelectedItem(null)
        } else {
            setSelectedItem(item._id)
        }
    }
    const handleAddQuantity = () => {
        dispatch(manageCartItemQuantity({ ...item, quantity: item.quantity + 1 }))
    }
    const handleRemoveQuantity = () => {
        dispatch(manageCartItemQuantity({ ...item, quantity: item.quantity - 1 }))
    }
    return (
        <TouchableOpacity style={{
            backgroundColor: selectedItem === item._id ? '#ccc' : '#FFFFFF',
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
            disabled={disabled}
            onPress={handleSelection}
        >
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: disabled ? 'space-around' : 'space-between' }}>
                {/* card image  */}
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: typeof images === 'string' ? images : images?.[0] }} style={{ width: 80, height: 80, transform: [{ scale: 1 }], borderRadius: 100 }} />
                </View>
                <View>
                    <View>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 14, color: '#585CB4', fontWeight: '800' }}>{title?.slice(0, 20)}..</Text>
                        <Text style={{ fontFamily: 'Inter-bold', fontSize: 16, color: '#585CB4', fontWeight: '800' }}>৳{(price - (price / 100) * discount) * quantity}</Text>
                    </View>

                </View>
                {
                    disabled ? <></> : <View style={{ marginRight: 10, flexDirection: 'column' }}  >
                        <TouchableOpacity onPress={handleRemoveQuantity} disabled={item?.quantity === 0}>
                            <Icon name="minus-circle" size={20} color={item?.quantity === 0 ? 'red' : colors.secondary} />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 12, color: '#000000', textAlign: 'center', }}>{quantity}</Text>
                        </View>
                        <TouchableOpacity onPress={handleAddQuantity} >
                            <Icon name="plus-circle" size={20} color={colors.secondary} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </TouchableOpacity>

    )
}
export default CartItem