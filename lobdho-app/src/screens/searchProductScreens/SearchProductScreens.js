// core libary components
import { View, Text, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
//third party libary components
import { Actionsheet, Avatar, Input, useDisclose } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons';
//custom components
import FilterContent from '../../components/searchProduct/FilterContent';
import NotFoundProduct from '../../components/searchProduct/NotFoundProduct';
import SearchProduct from '../../components/searchProduct/SearchProduct';
import ProductSceleton from '../../components/shared/sceleton/productSceleton';
// hooks
import { useAuth } from '../../hooks/auth/useAuth';
import { useAllProductsQuery, useFilterProductsQuery, useSearchProductsQuery, } from '../../store/features/productsData/productsSlice';
import { addWishlistItemAll, useGetWishlishtItemQuery } from '../../store/features/wishlishtData/wishlishtDataSlice';
// default styles
import { colors, padding } from '../../assets/theme/styles';
import { useDispatch } from 'react-redux';


export default function SearchProductScreens({ navigation }) {
    //user details hooks
    const user = useAuth();
    //products data state
    const [dataSource, setDataSource] = useState(null);
    // search input text
    const [searchText, setSearchText] = useState(null);
    const [filterData, setFilterData] = useState(null);

    // action sheet hooks or bottom drawer (native base)
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    // load search data conditionally 
    const { error: searchError, isLoading: searchLoading, isSuccess: searchSuccess, data: searchData } = useSearchProductsQuery(searchText, {
        skip: !searchText
    });
    // load default products
    const { isError, error, isSuccess, isLoading, data } = useAllProductsQuery('', {
        skip: searchData
    })
    // wishlisht item
    const { isLoading: wishLoading, data: wishData, error: WishError } = useGetWishlishtItemQuery(user?.user?._id);
    const { isError: filterError, data: filterItems } = useFilterProductsQuery(filterData, {
        skip: !filterData
    })

    // console.log('this is wishlisht data ', wishData?.wishlistItems)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(addWishlistItemAll(wishData?.wishlistItems))
    }, [wishData])

    // optimize products data for quick work flat lisht
    useEffect(() => {
        if (!isError && !searchData && data) {
            let items = Array.apply(null, data.data).map((item, i) => {
                return {
                    _id: item._id,
                    title: item.title,
                    ratings: item.ratings,
                    description: item.description,
                    images: item.images,
                    price: item.price,
                    brand: item.brand,
                    discount: item.discount
                };
            });
            setDataSource(items);
        } else {
            setDataSource(null)
        }
        if (!searchError && searchData) {
            let items = Array.apply(null, searchData.data).map((item, i) => {
                return {
                    _id: item._id,
                    title: item.title,
                    ratings: item.ratings,
                    description: item.description,
                    images: item.images,
                    price: item.price,
                    brand: item.brand,
                    discount: item.discount
                };
            });
            setDataSource(items);
        } else if (searchData?.data?.length <= 0) {
            setDataSource(null)
        }

    }, [data, searchData])
    // set item to show after filtering products 
    useEffect(() => {
        if (!filterError && filterItems) {
            let items = Array.apply(null, filterItems.data).map((item, i) => {
                return {
                    _id: item._id,
                    title: item.title,
                    ratings: item.ratings,
                    description: item.description,
                    images: item.images,
                    price: item.price,
                    brand: item.brand,
                    discount: item.discount
                };
            });
            setDataSource(items);
        } else if (filterItems?.data?.length <= 0) {
            setDataSource(null)
        }
    }, [filterItems])
    return (
        <View style={{ backgroundColor: '#E4EAEA', flex: 1, }}>
            <View style={{ paddingHorizontal: 20, paddingTop: padding.default }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="circle" size={10} color={colors.secondary} />
                            <Icon name="circle" size={10} color={colors.secondary} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="circle" size={10} color={colors.secondary} />
                            <Icon name="circle" size={10} color={colors.secondary} />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate("Profile")}>
                            {user.user?.image ?
                                <Avatar width={36} height={36} bg="green.500" rounded="full" source={{
                                    uri: user?.user?.image
                                }}>
                                    AJ
                                </Avatar>
                                : <Avatar width={36} height={36} bg="green.500" rounded="full" >
                                    {user?.user?.name ? user?.user?.name?.slice(0, 2) : 'L'}
                                </Avatar>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {/* search bar */}
                <View style={{ marginTop: 10 }}>
                    <Input
                        variant="unstyled"
                        rounded="md"
                        placeholder="Search Product"
                        placeholderTextColor="#DDCACA"
                        leftElement={<Icon name="search" size={25} style={{ paddingLeft: 10, fontFamily: 'Inter-Bold', }} />}
                        backgroundColor="#F6F6F6"
                        size="xl"
                        style={{ height: 58 }}
                        onChangeText={(text) => setSearchText(text)}
                    />
                </View>

            </View>
            {/* product card */}
            <View style={{
                marginBottom: 60
            }}>
                {isLoading || wishLoading || searchLoading || wishLoading ? <View>
                    <ProductSceleton />
                    <ProductSceleton />
                </View> :
                    dataSource?.length > 0 ? <SearchProduct dataSource={dataSource} user={user} onOpen={onOpen} data={wishData?.wishlistItems} /> : <NotFoundProduct searchText={searchText} />
                }
            </View>

            {/* action sheet bottom  */}
            <Actionsheet isOpen={isOpen} onClose={onClose} size="full"  >
                <Actionsheet.Content>
                    <View style={{}}>
                        <Text style={{ fontFamily: 'Inter-ExtraBold', fontSize: 20, color: '#000000', textAlign: 'center', }}>Sort & Filter</Text>
                        <FilterContent setDataSource={setDataSource} filterData={filterData} setFilterData={setFilterData} />
                    </View>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    )
}