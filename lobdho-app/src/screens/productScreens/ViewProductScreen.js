// core libary component 
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// third party libary component 
import { Actionsheet, FlatList, useDisclose } from 'native-base';
// third party icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// custom component and hooks
import ProductActionContent from '../../components/homePageProduct/ProductActionContent';
import { UseBadgeNumber } from '../../hooks/cartItem/useCartItem';
//default styles
import { colors, padding } from '../../assets/theme/styles';

export default function ViewProductScreen({ route, navigation }) {
    const badgeNum = UseBadgeNumber();
    // native base action sheet control hook 
    const { isOpen, onOpen, onClose, } = useDisclose();
    // view image use for showing main big image 
    const [viewImage, setViewImage] = useState(null)
    // product details this route comes form home page product carusel , search product page or all product page
    const details = route?.params?.data;
    //  main images
    const [images, setImages] = useState(null);
    // call onopen funtion for default open bottom action sheet (product item details and add cart option )
    useEffect(() => {
        onOpen()
    }, []);
    //set  images and product details conditionally
    useEffect(() => {
        setViewImage(details.images?.[0]);
        setImages(details?.images)
    }, [details]);
    // galerry image thumbnails component
    const Thumbnails = ({ image, setViewImage }) => {
        if (image) {
            return (
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FFFFFF',
                        width: 62, height: 62,
                        borderRadius: 10,
                        borderWidth: 3,
                        padding: 5,
                        borderColor: viewImage === image ? colors.primary : colors?.secondary,
                        marginTop: 10
                    }}
                    onPress={() => setViewImage(image)}
                >
                    {image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />}
                </TouchableOpacity>
            )
        }
        else {
            return <></>
        }
    }

    // start the main product view component
    return (
        <>
            <View style={{ backgroundColor: '#FFFFFF', paddingTop: padding.default, flex: 1 }}>
                <View style={{ marginHorizontal: 20, }}>
                    {/* heaer cart  badge  */}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {/* badge custom button  */}
                        <TouchableOpacity style={{ backgroundColor: colors.secondary, borderRadius: 10, padding: 5 }} onPress={() => navigation.navigate("MyCart")}>
                            {/* badge  */}
                            <View style={{}}>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <View style={{ backgroundColor: 'red', color: '#ffffff', width: 15, borderRadius: 100, marginBottom: -10 }}>
                                        <Text style={{ fontFamily: 'Inter-Bold', textAlign: 'center', fontSize: 12, color: '#ffffff' }}>
                                            {badgeNum}
                                        </Text>
                                    </View>
                                </View>
                                {/* header badge icon metrial MaterialCommunityIcons */}
                                <Icon name="cart-plus" size={30} color="#dddddd" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* main image view (selected image )  */}
                    <View style={{ marginTop: 30, marginLeft: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, alignItems: 'center', marginTop: isOpen ? 0 : '30%' }}>
                                {images &&
                                    <Image source={{ uri: viewImage }} style={{ width: '70%', height: '70%', transform: [{ scale: isOpen ? 1 : 1.5 }] }} />
                                }
                            </View>
                            {/* thumb nails  */}
                            <View>
                                {
                                    images && <FlatList
                                        data={images}
                                        renderItem={(item) => <Thumbnails image={item?.item} setViewImage={setViewImage} />}
                                    />
                                }
                            </View>
                        </View>
                    </View>
                </View>
                {/* button for open action sheet  */}
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.secondary, padding: 20, marginBottom: 30, borderRadius: 20 }}
                        onPress={onOpen}
                    ><Text style={{ fontFamily: 'Inter-Bold', color: '#FFFFFF', fontSize: 18 }}>Click for details</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* // action sheet item  */}
            <View>
                <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay={true}  >
                    <Actionsheet.Content backgroundColor="#141221"  >
                        <ProductActionContent details={details} />
                    </Actionsheet.Content>
                </Actionsheet>
            </View>
        </>
    )
}