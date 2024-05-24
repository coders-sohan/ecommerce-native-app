import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Avatar, FlatList, Skeleton } from 'native-base';
import WishlishtCard from '../../components/wishlishtCard/WishlishtCard';
import { padding } from '../../assets/theme/styles';
import { useGetWishlishtItemQuery, useLazyGetWishlishtItemQuery } from '../../store/features/wishlishtData/wishlishtDataSlice';
import { useAuth } from '../../hooks/auth/useAuth';
import NoItem from '../../components/shared/NoItem';
import useWishLisht from '../../hooks/wishlisht/useWishlist';


export default function WishlistScreen({ navigation }) {
    const [deleteItem, setDeleteItem] = useState(null);
    const wishLisht = useWishLisht();
    const user = useAuth();

    const { isLoading, error, data, refetch } = useGetWishlishtItemQuery(user?.user?._id, {});
    useEffect(() => {
        refetch()
    }, [deleteItem, wishLisht])
    useEffect(() => {
        refetch()
    }, [])
    return (
        <View style={{ backgroundColor: '#E4EAEA', flex: 1, paddingTop: padding.default }}>
            <View style={{ marginHorizontal: 20 }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={18} color="#000000" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>My Wishlisht</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate("Profile")}>
                            <Avatar width={52} height={52} bg="green.500" rounded="full" borderColor='cyan.500' borderWidth={1.5} source={{
                                uri: user?.user?.image
                            }}>
                                {user?.user?.name?.slice(0, 2)}
                            </Avatar>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* wish list card  */}
                <View style={{ marginTop: 30 }}>
                    {data?.wishlistItems?.length > 0 && !isLoading &&
                        <FlatList
                            data={data?.wishlistItems}
                            renderItem={({ item }) => (
                                <WishlishtCard item={item} userId={user?.user?._id} setDeleteItem={setDeleteItem} />
                            )}
                        />
                    }
                    {
                        !isLoading && !data.wishlistItems?.length > 0 &&
                        <NoItem />
                    }
                    {isLoading &&
                        <View>
                            <Skeleton startColor="gray.300" h={10} my="1.5" />
                            <Skeleton startColor="gray.300" h={10} my="1.5" />
                            <Skeleton startColor="gray.300" h={10} my="1.5" />
                            <Skeleton startColor="gray.300" h={10} my="1.5" />
                            <Skeleton startColor="gray.300" h={10} my="1.5" />
                        </View>}
                </View>
            </View>
        </View>
    )
}