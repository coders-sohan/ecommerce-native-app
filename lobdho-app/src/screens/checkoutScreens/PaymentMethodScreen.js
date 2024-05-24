// core libary component 
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Alert } from 'react-native';
// third party icon 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
//custom components
import PaymentScreen from './PaymentScreen';

// default styles
import { colors, padding } from '../../assets/theme/styles';
import { showMessage } from 'react-native-flash-message';
import { useNewOrderMutation, usePaymentMethodMutation } from '../../store/features/checkout/checkoutSlice';
import LoodingSpinner from '../../components/shared/LoodingSpinner';
import { useDispatch } from 'react-redux';
import { removeCartItem } from '../../store/features/cartData/cartItemSlice';




export default function PaymentMethodScreen({ navigation, route }) {
    // payment getway popup open
    const [modalVisible, setModalVisible] = useState(false);
    // payment getway url 
    const [payUrl, setPayUrl] = useState(null);
    // payment succss status if payment success 
    const [success, setSuccess] = useState(false)
    // payment method selection tab cashon delivery or pay online
    const [tab, setTab] = useState(0);
    const amount = route?.params?.amount
    const itemPrice = route?.params?.itemPrice
    const orderInfo = route.params?.data
    const userInfo = route?.params?.user
    const shipAddress = route?.params?.shippingAddress
    const [paymentMethod, { isError, isLoading, isSuccess, error, data }] = usePaymentMethodMutation();
    const [newOrder, { isLoading: cashLoad, error: cashError, isSuccess: cassSuccess, data: cashData }] = useNewOrderMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            showMessage({
                type: 'danger',
                message: 'Something went wrong please try again',
                duration: 5000,
            })
        } else if (isSuccess) {
            if (data) {
                setPayUrl(data)
            }
        }
        console.log(error)
    }, [error, isSuccess, data])
    useEffect(() => {
        if (cashError) {
            showMessage({
                type: 'danger',
                message: 'Something went wrong please try again',
                duration: 5000,
            })
        } else if (cassSuccess) {
            if (cashData) {
                // setPayUrl(data)
                setSuccess(true)
            }
        }
    }, [cashError, cassSuccess, cashData])

    useEffect(() => {
        if (success) {
            Alert.alert('Success', 'Your order placed successfully', [
                {
                    text: 'My Order',
                    onPress: () => navigation.navigate("orders")
                },
                {
                    text: 'Home',
                    onPress: () => navigation.navigate('Home')
                }
            ])
            setSuccess(false)
            orderInfo?.map(item => {
                dispatch(removeCartItem(item?._id))
            })

        }

    }, [success])

    const handlePayment = () => {
        setModalVisible(true)
        const data = {
            shippingInfo: {
                name: userInfo?.name,
                email: userInfo?.email,
                address: `${shipAddress?.village},${shipAddress?.house},${shipAddress?.ZipCode}`,
                city: shipAddress?.city,
                phone: userInfo?.PhoneNumber,
                country: 'Bangladesh'

            },
            orderItems: orderInfo,
            totalPrice: amount,
            itemsPrice: itemPrice,
            user: userInfo?._id,
            paymentStatus: true,
            paidAt: amount
        }
        // console.log(data)
        if (tab === 1) {
            newOrder(data)
        } else {
            paymentMethod(data)
        }

    }
    return (

        <View style={{ flex: 1, backgroundColor: '#E4EAEA', paddingTop: padding.default }}>
            <View style={{ marginHorizontal: 20 }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={28} color="#000000" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>Payment Method</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: colors.secondary, borderRadius: 10, padding: 5 }} onPress={() => navigation.navigate("MyCart")}>
                            <Icon name="shopping-outline" size={20} color="#dddddd" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'Inter-Light', color: '#000000', fontSize: 14 }}>Select the payment method you want to use</Text>
                </View>

                {/* payment method card items  */}
                <View style={{ marginTop: 30, marginHorizontal: 30 }}>
                    <TouchableOpacity style={styles.container} onPress={() => setTab(1)}>
                        <View >
                            <Icon name="truck-fast" size={33} color="#000000" />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 17, color: '#000000', }}>cash on delivery</Text>
                        </View>
                        <View >
                            <Icon name={tab === 1 ? 'radiobox-marked' : 'radiobox-blank'} size={33} color="#000000" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.container} onPress={() => setTab(2)}>
                        <View >
                            <Icon name="credit-card" size={33} color="#000000" />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 17, color: '#000000', }}>Pay Now</Text>
                        </View>
                        <View >
                            <Icon name={tab === 2 ? 'radiobox-marked' : 'radiobox-blank'} size={33} color="#000000" />
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.container} onPress={() => setTab(3)}>
                        <View >
                            <Icon name="cash" size={33} color="#000000" />
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'Inter-Light', fontSize: 17, color: '#000000', }}>Bkash</Text>
                        </View>
                        <View >
                            <Icon name={tab === 3 ? 'radiobox-marked' : 'radiobox-blank'} size={33} color="#000000" />
                        </View>
                    </TouchableOpacity> */}
                </View>

            </View>
            {/* contintue payment button  */}
            <View style={{ flex: 1, marginHorizontal: 50, marginBottom: 20, justifyContent: 'flex-end' }}>
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.secondary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30 }}
                        onPress={handlePayment}
                    // disabled={!userInfo}
                    >
                        <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 15, color: '#FFFFFF', textAlign: 'center' }}>Continue Payment</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* payment popup screen  */}
            {tab === 2 &&
                <Modal
                    visible={modalVisible}
                    transparent
                >
                    <View style={{ flex: 1, marginHorizontal: 20, marginVertical: 20 }}>
                        {payUrl && <PaymentScreen payUrl={payUrl} setPayUrl={setPayUrl} setModalVisible={setModalVisible} setSuccess={setSuccess} />}
                        {isLoading && <LoodingSpinner />}
                    </View>

                </Modal>
            }

            {/* // payment and order success modal  */}
            {cashLoad && <LoodingSpinner />}
        </View>







    )
}
// custom style sheet 
const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

})

