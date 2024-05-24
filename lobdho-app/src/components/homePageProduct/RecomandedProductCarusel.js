import React, { useRef, useState, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { colors } from '../../assets/theme/styles';
import { useDispatch } from 'react-redux';
import { useRecomandedProductsQuery, useTopProductsQuery } from '../../store/features/productsData/productsSlice';
import { addCartItem } from '../../store/features/cartData/cartItemSlice';
import { useCheckCartItem } from '../../hooks/cartItem/useCartItem';
import ProductSceleton from '../shared/sceleton/productSceleton';


const { width: screenWidth } = Dimensions.get('window');

const RecomandedProductCarusel = ({ navigation }) => {
    // add cart item
    const dispatch = useDispatch();
    //load product item
    const { isLoading, isError, data, error } = useRecomandedProductsQuery()
    const checkItem = useCheckCartItem();

    // carusel item data 
    const [entries, setEntries] = useState([]);
    // carusel ref 
    const carouselRef = useRef(null);
    const goForward = () => {
        carouselRef.current.snapToNext();
    };
    // set carusel item 
    useEffect(() => {
        if (!isLoading && !isError) {
            setEntries(data.data.slice(0, 10))
        }
    }, [data]);

    const renderItem = ({ item, index }) => {
        const { images, title, price, _id, brand, discount } = item;
        const handleAddCart = () => {
            const data = {
                _id, title, price, brand, images: images?.[0], discount
            }
            dispatch(addCartItem(data))
        }
        const isCart = checkItem(_id);

        return (
            <TouchableOpacity style={styles.item}
                key={index}
                onPress={() => navigation.navigate("viewProduct", { data: item })}
            >
                {/* thumbnail image container  */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.images?.[0] }}
                        style={styles.image}
                    />
                </View>
                {/* item details contailer / */}
                <View style={{
                    width: 267, backgroundColor: '#EEF6FF',
                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 4.59,
                    elevation: 5,
                    borderRadius: 18
                }}>

                    <View style={{ marginLeft: 40, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }} >
                        <View style={{}}>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ fontFamily: 'Inter-Bold', color: '#252222', fontSize: 15 }} >{item.title?.slice(0, 18)}..</Text>
                                <Text style={{ fontFamily: 'Inter-Bold', color: '#252222', fontSize: 14 }} >{item?.brand}</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Inter-Regular', fontWeight: '600', fontSize: 14, color: '#2D2929' }}>৳{item?.price}</Text>
                            </View>
                        </View>
                        {/* // add to shop car button  */}
                        <TouchableOpacity
                            style={{ backgroundColor: isCart ? colors.primary : colors.secondary, justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: 36, height: 36, marginTop: 35 }}
                            onPress={handleAddCart}
                        >
                            <Icon name={isCart ? 'cart' : 'cart-plus'} style={{ fontSize: 20, color: '#DDDD' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity >
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 10, fontSize: 18, color: '#696262' }}>
                <Text style={{ fontFamily: 'Inter-Bold', color: '#333' }}>Recomanded</Text>
            </View>
            {isLoading && <ProductSceleton />}
            {error && <View><Text>something wrong please try again</Text></View>}
            {data && !isLoading &&
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={320}
                    data={entries}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    activeSlideAlignment="start"
                    inactiveSlideOpacity={1}

                />
            }

        </View>
    );
};

export default RecomandedProductCarusel;

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
    },
    item: {
        flexDirection: 'row',
        marginVertical: 10
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        width: 91,
        height: 84,
    },
    imageContainer: {
        zIndex: 11,
        marginRight: -50,
        padding: 5,
        backgroundColor: '#ffff',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
        borderRadius: 5,
        transform: [{ scale: .85 }]
    }
});
