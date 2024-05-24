import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import onBoardImage1 from "../../assets/images/on1.png";
import onBoardImage2 from "../../assets/images/on2.png";
import onBoardImage3 from "../../assets/images/on3.png";
import onBoardImage4 from "../../assets/images/on4.png";
import { colors } from '../../assets/theme/styles';
import { fristUser } from '../../store/features/user/userSlice';

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        backgroundColor: '#FFFFFF'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFF',
        fontFamily: 'Inter-Regular'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default class Onboarding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idxActive: 0
        }
    }
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={this.state.idxActive < 3 ? true : false} activeDotStyle={{ width: 25, backgroundColor: '#FFFFFF', marginBottom: 100 }} dotColor="#5A6070" dotStyle={{ marginBottom: 100 }}
                index={0}
                buttonWrapperStyle={{
                    position: 'absolute',
                    top: 0,
                    alignItems: 'flex-end',
                    justifyContent: 'center'

                }}
                onIndexChanged={idxActive => this.setState({ idxActive })}

                nextButton={
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '800',
                        fontSize: 20,
                        color: '#FFFFFF',
                        backgroundColor: colors?.primary,
                        marginBottom: 30,
                        borderRadius: 30,
                        padding: 10,
                        paddingHorizontal: 140,

                    }}>Next</Text>
                }
                prevButton={<View style={{ width: 0 }}></View>}
            // onScrollEndDrag={this.props.dispatch(fristUser(false))}
            >
                <View style={styles.slide}>
                    <ImageBackground source={onBoardImage1} style={{
                        flex: 1,
                        width: '100%'
                    }}
                        resizeMode='cover'
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            paddingBottom: 100,
                            paddingHorizontal: 20

                        }}

                        >
                            <Text
                                style={{

                                    fontWeight: '800',
                                    fontSize: 42,
                                    color: '#FFFFFF'
                                }}
                            >
                                Welco
                                <Text style={{ color: colors.primary }}>me to 👋</Text>
                            </Text>
                            <Text style={{
                                fontWeight: '800',
                                fontSize: 75,
                                color: '#FFFFFF'
                            }}>
                                Lobdho
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 800,
                                color: '#FFFFFF'
                            }}>
                                The best e-commerce app of the century
                                for your daily needs!
                            </Text>

                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.slide}>
                    <ImageBackground source={onBoardImage2}
                        style={{
                            flex: 1,
                            width: '100%'
                        }}
                        resizeMode='cover'
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            marginBottom: 70,
                            paddingHorizontal: 30
                        }}>
                            <Text style={{
                                color: '#FFFFFF',
                                fontWeight: '800',
                                fontSize: 32,
                                textAlign: 'center'

                            }}>
                                We provide high quality products <Text style={{ color: colors?.primary }}>just </Text>  for you
                            </Text>
                        </View>

                    </ImageBackground>
                </View>
                <View style={styles.slide}>
                    <ImageBackground source={onBoardImage3}
                        style={{
                            flex: 1,
                            width: '100%'
                        }}
                        resizeMode='cover'
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            marginBottom: 70,
                            paddingHorizontal: 30
                        }}>
                            <Text style={{
                                color: '#FFFFFF',
                                fontWeight: '800',
                                fontSize: 32,
                                textAlign: 'center'

                            }}>
                                We provide high quality products <Text style={{ color: colors?.primary }}>just </Text>  for you
                            </Text>
                        </View>

                    </ImageBackground>
                </View>
                <View style={styles.slide}

                >
                    <ImageBackground source={onBoardImage4}
                        style={{
                            flex: 1,
                            width: '100%'
                        }}
                        resizeMode='cover'
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            marginBottom: 70,
                            paddingHorizontal: 30
                        }}>
                            <Text style={{
                                color: '#FFFFFF',
                                fontWeight: '800',
                                fontSize: 32,
                                textAlign: 'center'

                            }}>
                                Let,s fulfill your daily
                                needs with Lobdho
                                <Text style={{ color: colors?.primary }}> right now! </Text>
                            </Text>
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: colors?.primary,
                            marginBottom: 30,
                            borderRadius: 30,
                            padding: 10,
                            marginHorizontal: 10,

                        }}
                            onPress={() => this.props.dispatch(fristUser(false))}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: '800',
                                fontSize: 20,
                                color: '#FFFFFF'
                            }}>Get Started</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </Swiper>
        )
    }
}

AppRegistry.registerComponent('Lobdho', () => Onboarding)