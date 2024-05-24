import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import graphImage from '../../assets/images/slider-graph.png'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomLabel from './SliderCustomLabel';
import { useFilterProductsQuery, useGetcategoriesQuery } from '../../store/features/productsData/productsSlice';

export default function FilterContent({ setDataSource, setFilterData }) {
    const [categories, setCategories] = useState('');
    const [rating, setRating] = useState(null);
    // const [sortBy, setSortBy] = useState('Popular');
    const [applyTab, setApplyTab] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const { isLoading, isError, data } = useGetcategoriesQuery();
    // const { isError: filterError, data: filterItems } = useFilterProductsQuery(filterData)

    const handleFilter = () => {
        const filterData = `price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&rating=${rating}&category=${categories}`
        setFilterData(filterData)
    }
    const handleReset = () => {
        setRating(5)
        setPriceRange([0, 10000])
        setCategories('');
    }
    // console.log(filterItems)
    return (
        <View style={{ marginTop: 15, borderTopWidth: 2, borderTopColor: '#D5D6D5', }}>
            {/* categories  */}
            <View style={{ marginVertical: 10 }}>
                <View>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: '#000000' }}>Categories</Text>
                </View>
                <ScrollView style={{ marginTop: 15, flexDirection: 'row', }}
                    horizontal
                >
                    {data?.data?.map(item => {
                        return (

                            <TouchableOpacity
                                key={item?._id}
                                style={{
                                    borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                                    backgroundColor: categories === item?._id ? '#000000' : '#ffffff'
                                }}
                                onPress={() => setCategories(item?._id)}
                            >
                                <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === item?._id ? '#ffffff' : '#000000' }}>{item?.title}</Text>
                            </TouchableOpacity>


                        )

                    })}

                    {/* <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: categories === 'Clothes' ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setCategories('Clothes')}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === 'Clothes' ? '#ffffff' : '#000000' }}>Clothes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: categories === 'Electronics' ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setCategories('Electronics')}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === 'Electronics' ? '#ffffff' : '#000000' }}>Electronics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: categories === 'Shoes' ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setCategories('Shoes')}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === 'Shoes' ? '#ffffff' : '#000000' }}>Shoes</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
            {/* price range  */}
            <View style={{ marginTop: 5, marginBottom: 10 }}>
                <View>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: '#000000' }}>Price Range</Text>
                </View>
                <View style={{ marginLeft: 40, marginTop: 5 }}>
                    <Image source={graphImage} style={{ width: 240, height: 73 }} />
                    <MultiSlider
                        values={priceRange}
                        containerStyle={{ marginTop: -20, }}
                        sliderLength={240}
                        trackStyle={{ backgroundColor: '#9999', height: 4 }}
                        selectedStyle={{ backgroundColor: '#000000' }}
                        pressedMarkerStyle={{ backgroundColor: '#000000' }}
                        markerStyle={{ width: 22, height: 22, borderWidth: 4, borderColor: '#000000', backgroundColor: '#ffffff' }}
                        onValuesChange={(value) => setPriceRange(value)}
                        enableLabel
                        customLabel={CustomLabel}
                        step={50}
                        min={20}
                        max={10000}
                        allowOverlap={false}
                        snapped
                        minMarkerOverlapDistance={20}

                    />
                </View>
            </View>
            {/* sort  */}
            {/* <View style={{ marginBottom: 15, marginTop: 15 }}>
                <View>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: '#000000' }}>Sort by</Text>
                </View>
                <ScrollView style={{ marginTop: 15, flexDirection: 'row', }} horizontal>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: categories === 'All' ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setCategories('All')}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === 'All' ? '#ffffff' : '#000000' }}>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: categories === 'Clothes' ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setCategories('Clothes')}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === 'Clothes' ? '#ffffff' : '#000000' }}>Most Recent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: categories === 'Electronics' ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setCategories('Electronics')}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === 'Electronics' ? '#ffffff' : '#000000' }}>Price High</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: categories === 'Electronics' ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setCategories('Electronics')}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: categories === 'Electronics' ? '#ffffff' : '#000000' }}>Price High</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View> */}
            {/* Rating  */}
            <View style={{ marginTop: 10 }}>
                <View>
                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: '#000000' }}>Rating</Text>
                </View>
                <ScrollView style={{ marginTop: 15, flexDirection: 'row', }} horizontal>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: rating === 5 ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setRating(5)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: rating === 5 ? '#ffffff' : '#000000' }}>
                            <Icon name="star" size={14} color="gold" /> All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: rating === 5 ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setRating(5)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: rating === 5 ? '#ffffff' : '#000000' }}>
                            <Icon name="star" size={14} color="gold" /> 5
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1, borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: rating === 4 ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setRating(4)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: rating === 4 ? '#ffffff' : '#000000' }}>
                            <Icon name="star" size={14} color="gold" /> 4
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: rating === 3 ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setRating(3)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: rating === 3 ? '#ffffff' : '#000000' }}>
                            <Icon name="star" size={14} color="gold" /> 3
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginRight: 10,
                            backgroundColor: rating === 2 ? '#000000' : '#ffffff'
                        }}
                        onPress={() => setRating(2)}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: rating === 2 ? '#ffffff' : '#000000' }}>
                            <Icon name="star" size={14} color="gold" /> 2
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            {/* apply section  */}
            <View style={{ marginBottom: 10, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 30, marginHorizontal: 20, justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000',
                            paddingHorizontal: 40,
                            paddingVertical: 10,
                            borderRadius: 25,
                            backgroundColor: applyTab === 1 ? '#000000' : '#ffffff'
                        }}
                        onPress={() => {
                            handleReset()
                            setApplyTab(1)
                        }}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 16, color: applyTab === 1 ? '#ffffff' : '#000000' }}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: '#000000',
                            paddingHorizontal: 40,
                            paddingVertical: 10,
                            borderRadius: 25,
                            backgroundColor: applyTab === 2 ? '#000000' : '#ffffff'
                        }}
                        onPress={() => {
                            handleFilter()
                            setApplyTab(2)
                        }}
                    >
                        <Text style={{ fontFamily: 'Inter-Bold', fontSize: 18, color: applyTab === 2 ? '#ffffff' : '#000000' }}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}