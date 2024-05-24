import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Arrow from 'react-native-vector-icons/SimpleLineIcons'
import { padding } from '../../assets/theme/styles';


const PrivacyPolicyScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, paddingTop: padding.default, backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Arrow name="arrow-left" size={18} color="#000000" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: '10%', }}>
                    <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22, textAlign: 'center' }}>Privacy Policy</Text>
                </View>
            </View>
            <ScrollView style={{ marginTop: 30 }}>
                <View style={{ marginHorizontal: 20, }}>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos, cumque sunt voluptatibus numquam et ea nostrum, consequuntur cupiditate hic consequatur beatae, quo vero harum non animi voluptas aliquam at.
                    </Text>
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({})

export default PrivacyPolicyScreen;
