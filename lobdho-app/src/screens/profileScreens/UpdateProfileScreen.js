import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { Formik } from 'formik';
import { Avatar } from 'native-base';
import { useAuth } from '../../hooks/auth/useAuth';
import { launchImageLibrary } from 'react-native-image-picker';
import { useUpdateProfileMutation, useUploadProfileImageMutation } from '../../store/features/user/userSlice';
import ProfileSceleton from '../../components/shared/sceleton/profileSceleton';
import { showMessage } from 'react-native-flash-message';
import Spinner from 'react-native-loading-spinner-overlay/lib';
// import AddressForm from '../../components/addressform/AddressForm';
import { colors } from '../../assets/theme/styles';
import UsevalidationSchema from '../../hooks/validationschema/validationSchema';
import { useDispatch } from 'react-redux';
import { addUserData } from '../../store/features/user/userSlice'


const UpdateProfileScreen = ({ navigation }) => {
    const userData = useAuth()
    // const [editAddress, setEditAddress] = useState(false)
    // const [division, setDivision] = useState(null);
    // const [district, setDistrict] = useState(null);
    // const [upzila, setUpzila] = useState(null);
    // const [village, setVillage] = useState(null)
    // const [house, setHouse] = useState(null)
    // const [ZipCode, setZipCode] = useState(null)
    const [photo, setPhoto] = useState(userData?.user?.image);
    const [previewImage, setPreviewImage] = useState('');
    const [uploadProfileImage, { error: imgerror, isLoading: imgloading, data: imgdata, isSuccess: isImgSuccess }] = useUploadProfileImageMutation();
    const [updateProfile, { error, isLoading, data, isSuccess }] = useUpdateProfileMutation()
    const userAddress = userData?.user?.presentAddress?.[0];
    const { updateProfileSchema } = UsevalidationSchema();
    const dispatch = useDispatch();
    const handleImageUpload = async () => {
        // for launching image libary to select image from gallery
        await launchImageLibrary({ mediaType: 'photo', }, async (res) => {
            try {
                if (res?.assets[0]?.uri) {
                    setPhoto(res?.assets[0])
                }

            } catch (error) {
                showMessage({
                    type: 'warning',
                    message: 'something went wrong!'
                })
            }
        })
    }
    // upload profile image backend
    useEffect(() => {

        if (photo) {
            const imageData = new FormData()

            imageData.append('image', {
                name: photo.fileName,
                uri: photo.uri,
                type: photo.type
            })
            setPreviewImage(photo?.uri)
            uploadProfileImage(imageData)
        }

    }, [photo])
    // show message after image update successfull 
    useEffect(() => {
        if (isImgSuccess) {
            showMessage({
                type: 'success',
                message: 'Image update succssfull'

            })
            if (imgerror) {
                showMessage({
                    type: 'danger',
                    message: 'Image upload Failed!'
                })
            }
        }
    }, [isImgSuccess, imgerror])
    // update profile information function 
    const handleUpdate = (info) => {
        const { name, PhoneNumber, city, upazila, village, house, ZipCode } = info;
        const data = {
            name,
            PhoneNumber,
            presentAddress: { city, upazila, village, house, ZipCode },
            shippingAddress: { city, upazila, village, house, ZipCode },
            image: previewImage
        }
        // console.log(data)
        updateProfile({ id: userData.user._id, data })
    }

    useEffect(() => {
        if (error) {
            showMessage({
                type: 'danger',
                error: 'something wrong. try again!'
            })
        }
        if (data && isSuccess) {
            // console.log(data)
            const updatedUser = {
                token: userData?.token,
                user: data?.user
            }

            dispatch(addUserData(updatedUser))
            showMessage({
                type: 'success',
                message: 'Information updated successfull',
            })
        }
    }, [data, error])

    // set preview image
    useEffect(() => {
        if (userData?.user?.image)
            setPreviewImage(userData?.user?.image)
    }, [userData])
    return (
        <>
            {<Spinner visible={isLoading} />}
            {<Spinner visible={imgloading} />}
            {
                userData?.user?.email ?
                    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                        <Formik
                            validationSchema={updateProfileSchema}
                            initialValues={{
                                name: userData?.user?.name,
                                email: userData?.user?.email,
                                PhoneNumber: userData?.user?.PhoneNumber,
                                city: userAddress?.city,
                                upazila: userAddress?.upazila,
                                village: userAddress?.village,
                                house: userAddress?.house,
                                ZipCode: userAddress?.ZipCode

                            }}
                            onSubmit={values => {
                                handleUpdate(values)
                                // console.log(values)
                            }}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                            }) => (
                                <ScrollView>
                                    <TouchableOpacity style={{ marginTop: 10 }}
                                        onPress={handleImageUpload}
                                    >
                                        <Avatar bg="green.500" alignSelf="center" size="xl" source={{
                                            uri: previewImage ? previewImage : 'https://bkjadljfa.com/dlfdjlkdj'
                                        }}>
                                            click
                                        </Avatar>
                                    </TouchableOpacity>
                                    <View style={styles.inputWrapper}>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                placeholder='Full Name'
                                                style={{ ...styles.inputField, borderColor: errors.fristName ? 'red' : "#000000" }}
                                                value={values?.name}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                            />

                                        </View>

                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                placeholder='Email'
                                                editable={false}
                                                style={{ ...styles.inputField, borderColor: errors.email ? 'red' : "#000000" }}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                placeholder='Phone Number'
                                                style={{ ...styles.inputField, borderColor: errors.PhoneNumber ? 'red' : "#000000" }}
                                                onChangeText={handleChange('PhoneNumber')}
                                                onBlur={handleBlur('PhoneNumber')}
                                                value={values.PhoneNumber}
                                                keyboardType="number-pad"
                                            />
                                        </View>
                                        {/* address fields  */}
                                        <View style={{ marginHorizontal: 20 }}>
                                            <Text style={{ color: '#000000', fontFamily: 'Inter-Bold', marginVertical: 10 }}>
                                                Address
                                            </Text>
                                        </View>
                                        <View >
                                            {/* <TouchableOpacity
                                                style={{
                                                    borderRadius: 20,
                                                    borderWidth: 1.5,
                                                    borderColor: '#333',
                                                    marginHorizontal: 10,
                                                    padding: 10,

                                                }}
                                                onPress={() => setEditAddress(true)}
                                            >
                                                <Text style={{
                                                    color: '#000000'
                                                }}>{userAddress?.city},{userAddress?.upazila},{userAddress?.village},{userAddress?.house},{userAddress?.ZipCode}</Text>
                                            </TouchableOpacity> */}
                                        </View>
                                        <View>
                                            {/* <AddressForm
                                                setDivision={setDivision}
                                                division={division}
                                                setDistrict={setDistrict}
                                                setUpzila={setUpzila}
                                                district={district}
                                                upzila={upzila}
                                                setVillage={setVillage}
                                                setHouse={setHouse}
                                                setZipCode={setZipCode}
                                            /> */}
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    placeholder='City'
                                                    style={{ ...styles.inputField, borderColor: errors.city ? 'red' : "#000000" }}
                                                    onChangeText={handleChange('city')}
                                                    onBlur={handleBlur('city')}
                                                    value={values.city}
                                                />
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    placeholder='Upazila'
                                                    style={{ ...styles.inputField, borderColor: errors.upazila ? 'red' : "#000000" }}
                                                    onChangeText={handleChange('upazila')}
                                                    onBlur={handleBlur('upazila')}
                                                    value={values.upazila}
                                                />
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    placeholder='Area'
                                                    style={{ ...styles.inputField, borderColor: errors.village ? 'red' : "#000000" }}
                                                    onChangeText={handleChange('village')}
                                                    onBlur={handleBlur('village')}
                                                    value={values.village}
                                                />
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    placeholder='House/Appertment'
                                                    style={{ ...styles.inputField, borderColor: errors.house ? 'red' : "#000000" }}
                                                    onChangeText={handleChange('house')}
                                                    onBlur={handleBlur('house')}
                                                    value={values.house}
                                                />
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    placeholder='Zip Code'
                                                    style={{ ...styles.inputField, borderColor: errors.ZipCode ? 'red' : "#000000" }}
                                                    onChangeText={handleChange('ZipCode')}
                                                    onBlur={handleBlur('ZipCode')}
                                                    value={values.ZipCode}
                                                    keyboardType='number-pad'
                                                />
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ marginVertical: 20, marginHorizontal: 50 }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: colors?.primary,
                                            marginBottom: 25,
                                            borderRadius: 30,
                                            padding: 10,
                                            marginHorizontal: 10
                                        }}

                                            title="submit"
                                            onPress={handleSubmit}
                                        >
                                            <Text style={{
                                                textAlign: 'center',
                                                fontWeight: '800',
                                                fontSize: 16,
                                                color: '#FFFFFF'
                                            }}>Update Information</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            )}
                        </Formik>

                    </View> : <ProfileSceleton />}
        </>

    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        paddingHorizontal: 20
    },
    inputContainer: {
        marginTop: 15
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#333',
        fontFamily: 'Inter-Bold',
        borderRadius: 30,
        fontSize: 14,
        fontWeight: '400',
        backgroundColor: '#F2ECEE',
        marginHorizontal: 10,
        paddingLeft: 20,
        color: '#000000'


    },
    validationErrorText: {
        fontFamily: 'Inter-Bold',
        fontSize: 10,
        fontStyle: 'italic',
        color: "red",
        marginHorizontal: 20,
    }

})

export default UpdateProfileScreen;
