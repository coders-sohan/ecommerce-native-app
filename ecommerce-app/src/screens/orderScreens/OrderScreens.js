import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Arrow from 'react-native-vector-icons/SimpleLineIcons'
import { padding } from '../../assets/theme/styles'
import MyOrderCard from '../../components/myOrderCards/MyOrderCard';
import { useAuth } from '../../hooks/auth/useAuth';
import { useGetOrdersQuery } from '../../store/features/checkout/checkoutSlice';
import { Skeleton } from 'native-base';

export default function OrderScreens({ navigation }) {
    const [tab, setTab] = useState(1);
    const user = useAuth();
    const { isError, isSuccess, data, error, isLoading } = useGetOrdersQuery(user?.user?._id);
    const [completeitem, setCompleteItem] = useState(null);
    const [ongoingItem, setOngoingItem] = useState(null);


    useEffect(() => {
        let completeData = []
        const ongoing = data?.orders?.filter(item => {
            if (item?.orderStatus === 'Completed') {
                completeData.push(item)
                return
            } else {
                return item
            }

        })
        setCompleteItem(completeData)
        setOngoingItem(ongoing)
    }, [data])
    return (
        <>
            <View style={{ backgroundColor: '#FFFFFF', flex: 1, paddingTop: padding.default }}>
                <View style={{ marginHorizontal: 20 }}>
                    {/* custom header  */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Arrow name="arrow-left" size={18} color="#000000" />
                        </TouchableOpacity>
                        <View style={{ marginLeft: '30%' }}>
                            <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>MY Order</Text>
                        </View>
                    </View>
                    {/* tab action  */}
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ marginVertical: 10, marginHorizontal: 40, flexDirection: 'row', justifyContent: 'space-between', }}>
                            <TouchableOpacity onPress={() => setTab(1)} >
                                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#000000' }}>Ongoing</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setTab(2)} >
                                <Text style={{ fontFamily: 'Inter-Regular', fontSize: 18, color: '#000000' }}>Completed</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: tab === 1 ? 6 : 3, backgroundColor: tab === 1 ? '#000000' : '#D9D9D9', borderRadius: 5, width: '50%' }}></View>
                            <View style={{ height: tab === 2 ? 6 : 3, backgroundColor: tab === 2 ? '#000000' : '#D9D9D9', borderRadius: 5, width: '50%' }}></View>
                        </View>
                    </View>
                    {/* order product card list  */}

                    <View style={{ marginVertical: 10 }}>
                        {isLoading && <View>
                            <Skeleton startColor="blueGray.300" />
                            <Skeleton startColor="blueGray.300" my={3} />
                            <Skeleton startColor="blueGray.300" />

                        </View>
                        }

                        {!isLoading && !error && data && <>
                            {tab === 1 &&
                                <>
                                    {ongoingItem?.length > 0 ?
                                        <FlatList
                                            data={ongoingItem}
                                            renderItem={(item) => <MyOrderCard navigation={navigation} item={item} tab={tab} />}
                                        /> : <View><Text>No Item found</Text></View>
                                    }
                                </>


                            }
                            {tab === 2 &&
                                <>
                                    {completeitem?.length > 0 ?
                                        <FlatList
                                            data={completeitem}
                                            renderItem={(item) => <MyOrderCard navigation={navigation} item={item} tab={tab} />}
                                        /> : <View><Text>No Item found</Text></View>
                                    }
                                </>


                            }




                        </>}
                    </View>
                </View>
            </View>
        </>

    )
}