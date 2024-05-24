import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import ProductCard from '../productCard/ProductCard'
import Icon from 'react-native-vector-icons/MaterialIcons';
import useWishLisht from '../../hooks/wishlisht/useWishlist';


export default function SearchProduct({ dataSource, onOpen, user, data }) {
    // load wish lisht item
    const wishlisht = useWishLisht();
    // wish lisht item cheaker . item is wishlisht or not 
    const checkWishListItem = (id) => {

        if (id) {
            const find = wishlisht?.find(item => (item?.itemId === id))
            if (find) {
                return true
            } else {
                return false
            }
        }

    }

    return (
        <View>
            <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 16, color: '#5C5C5C' }}>Products</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 10, padding: 10 }}
                            onPress={onOpen}
                        >
                            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 11, color: '#C0B3B3' }}>
                                Sort By
                            </Text>
                            <Icon name="arrow-drop-down" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <FlatList
                data={dataSource}
                initialNumToRender={10}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            marginHorizontal: 10, marginBottom: 10
                        }}>
                        <ProductCard item={item} userId={user?.user?._id} checkWishListItem={checkWishListItem} />
                    </View>
                )}
                //Setting the number of column
                numColumns={2}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}