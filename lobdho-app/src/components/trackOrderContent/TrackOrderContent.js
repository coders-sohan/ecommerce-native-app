import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import TrackOrderProductCard from './TrackOrderProductCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OrderStatusCard from './OrderStatusCard';

const TrackOrderContent = ({ data }) => {

    return (
        <View>
            {/* product view card  */}
            <View style={{ marginVertical: 20 }}>
                <TrackOrderProductCard data={{ price: data?.itemsPrice, title: data?.orderItems[0]?.title?.slice(0, 30), image: data.orderItems?.[0]?._id?.images[0] }} />
            </View>
            {/* deliver report  */}
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="gift-outline" size={31} color="#000000" />
                        <Text style={{ fontSize: 31, color: 'black' }}>
                            ---
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="truck-fast" size={31} color="#ccc" />
                        <Text style={{ fontSize: 31, color: 'black' }}>
                            ---
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="bike-fast" size={31} />
                        <Text style={{ fontSize: 31, color: 'black' }}>
                            ---
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="gift-open-outline" size={31} />
                    </View>
                </View>
            </View>
            {/* order status details title  */}
            <View style={{ alignItems: 'center', marginVertical: 20, marginHorizontal: 40, borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#7D7676' }}>
                <Text style={styles.headingText}>{data?.orderStatus}</Text>
            </View>
            {/* order status details  */}
            <View style={{ marginTop: 10 }}>
                <View style={{ marginBottom: 5 }}>
                    <Text style={{ ...styles.headingText, fontSize: 17 }}>Order Status Details</Text>
                </View>
                <FlatList
                    data={[{ id: 1, status: data?.orderStatus, date: data?.createdAt, }]}
                    renderItem={item => <OrderStatusCard item={item} />}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    headingText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        color: '#000000'
    },
    contentText: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        color: '#000000'
    }
})

export default TrackOrderContent;
