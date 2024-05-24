import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import { Image } from 'react-native';
import { colors } from '../../assets/theme/styles';
import { usePopularProductsQuery, useTopProductsQuery } from '../../store/features/productsData/productsSlice';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/features/cartData/cartItemSlice';
import { useCheckCartItem } from '../../hooks/cartItem/useCartItem';
import ProductSceleton from '../shared/sceleton/productSceleton';

const { width: screenWidth } = Dimensions.get('window');
const PopularProductCarusel = ({ navigation }) => {
    // add cart item
    const dispatch = useDispatch();
    //load product item
    const { isLoading, isError, data, error } = usePopularProductsQuery()
    // carusel item data 
    const [entries, setEntries] = useState([]);
    // carusel ref 
    const carouselRef = useRef(null);
    const goForward = () => {
        carouselRef.current.snapToNext();
    };
    // set carusel item 
    useEffect(() => {
        if (data) {
            setEntries(data.data.slice(0, 10))
        }
    }, [data]);

    const checkItem = useCheckCartItem();

    // carusel item 
    const renderItem = ({ item, index }) => {
        const { images, title, price, _id, brand, discount } = item;
        // add to the item in cart 
        const handleAddCart = () => {
            const data = {
                _id, title, price, brand, images: images?.[0], discount
            }
            dispatch(addCartItem(data))
        }
        //check the item in cart or not
        const isCart = checkItem(_id);
        // console.log(item)
        return (
            <TouchableOpacity style={styles.item} key={index} onPress={() => navigation.navigate("viewProduct", { data: item })}>
                <View>
                    <Image
                        source={{ uri: item?.images?.[0] }}
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                    />
                    <TouchableOpacity disabled={isCart} onPress={handleAddCart}>
                        <View style={{ backgroundColor: isCart ? colors.primary : colors.secondary, justifyContent: 'center', alignItems: 'center', maxWidth: 36, height: 36, borderRadius: 10, marginTop: -20, marginLeft: 130 }}>
                            <Icon name={isCart ? 'cart' : 'cart-plus'} style={{ fontSize: 20, color: '#dddd' }} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
                        <View>
                            <Text style={{ fontFamily: 'Inter-Bold', color: '#544C4C' }} >{item?.title?.slice(0, 13)}..</Text>
                            <Text style={{ fontFamily: 'Inter-Bold', color: '#8D8383', fontSize: 15 }} >{item.brand}</Text>
                        </View>

                        <View>
                            <Text style={{ fontFamily: 'Inter-Regular', fontWeight: '600', fontSize: 15, color: '#2D2929' }}>৳{item?.price}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 10, fontSize: 18, color: '#696262' }}>
                <Text style={{ fontFamily: 'Inter-Bold', color: '#333' }}>Popular Product</Text>
            </View>
            {isLoading && <ProductSceleton />}
            {error && <View><Text>something wrong please try again</Text></View>}

            {
                data && !isLoading && <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 160}
                    data={entries}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    activeSlideAlignment="start"

                    inactiveSlideOpacity={1}
                    initialScrollIndex={1}

                />
            }

        </View>
    );
};

export default PopularProductCarusel;
const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
    },
    item: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#ffff',
        borderRadius: 23,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
        width: screenWidth - 170,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 20
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        width: 167,
        height: 126,
        borderRadius: 18

    },
});
