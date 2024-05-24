import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Arrow from 'react-native-vector-icons/SimpleLineIcons'
import { padding } from '../../assets/theme/styles';
import TrackOrderContent from '../../components/trackOrderContent/TrackOrderContent';


const TrackOrderScreen = ({ navigation, route }) => {
    const data = route?.params?.item?.item
    // console.log(item)
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: padding.default }}>
            <View style={{ marginHorizontal: 20 }}>
                {/* custom header  */}
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Arrow name="arrow-left" size={18} color="#000000" />
                        </TouchableOpacity>
                        <View style={{ marginLeft: '30%' }}>
                            <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>Track Order</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#7D7676', margin: 15 }}></View>
                </View>
                {/* track order content  */}
                <View>
                    <TrackOrderContent data={data} />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({})

export default TrackOrderScreen;
