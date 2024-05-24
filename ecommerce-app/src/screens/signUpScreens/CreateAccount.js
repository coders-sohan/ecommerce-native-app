import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { colors, padding } from '../../assets/theme/styles'
import { Checkbox } from 'native-base'
import { addUserData, useUserRegisterMutation } from '../../store/features/user/userSlice'
import { Formik } from 'formik'
import UsevalidationSchema from '../../hooks/validationschema/validationSchema'
import { showMessage } from 'react-native-flash-message'
import LoodingSpinner from '../../components/shared/LoodingSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../hooks/auth/useAuth'
import useFirebase from '../../hooks/auth/useFirebase'





export default function CreateAccount({ navigation }) {
    //hooks
    const [userRegister, { isError, isSuccess, isLoading, error, data }] = useUserRegisterMutation();
    const { createUserEmailPassword } = useFirebase()
    const { signupValidationSchema } = UsevalidationSchema();
    const dispatch = useDispatch();
    // const userInfo = useSelector((state) => state.persist)
    const userInfo = useAuth()
    console.log(userInfo)




    const handleRegister = async (data) => {
        await createUserEmailPassword(data)
    }

    // show message based on server response 
    useEffect(() => {
        if (isLoading) {

        }
        else if (isError) {
            if (error) {
                showMessage({
                    type: 'danger',
                    message: error?.data?.message,
                    duration: 5000,
                })

            }
        }
        else if (isSuccess) {
            if (data) {
                showMessage({
                    type: 'success',
                    message: "Registration successfully complete! Please login",
                    duration: 3000
                })
                dispatch(addUserData(data))
            }
        }

    }, [isError, isSuccess, isLoading, error, data])

    return (

        <View style={{ backgroundColor: '#ffff', }}>
            <View style={{ paddingTop: padding.default, paddingHorizontal: 20, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#000000" style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Open Sans', fontWeight: '600', fontSize: 20, color: '#000000', marginLeft: 20 }}>Create Account</Text>
                </View>

            </View>
            {/* form submission */}
            <Formik

                validationSchema={signupValidationSchema}
                initialValues={{ fristName: '', lastName: '', email: '', PhoneNumber: '', password: '', passwordConfirmation: '', acceptCondition: false }}
                onSubmit={values => {
                    const { PhoneNumber, email, fristName, lastName, password } = values;
                    const data = { name: fristName + ' ' + lastName, PhoneNumber, email, password }
                    handleRegister(data)
                }}

            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    setFieldValue

                }) => (
                    <ScrollView>

                        <View style={styles.inputWrapper}>
                            {isLoading && <LoodingSpinner />}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Frist Name'
                                    style={{ ...styles.inputField, borderColor: errors.fristName ? 'red' : "#000000" }}
                                    onChangeText={handleChange('fristName')}
                                    onBlur={handleBlur('fristName')}
                                />
                                {errors.fristName &&
                                    <Text style={styles.validationErrorText}>{errors.fristName}</Text>
                                }
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Last Name'
                                    style={{ ...styles.inputField, borderColor: errors.lastName ? 'red' : "#000000" }}
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                />
                                {errors.lastName &&
                                    <Text style={styles.validationErrorText}>{errors.lastName}</Text>
                                }
                            </View>


                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder='Email'
                                    style={{ ...styles.inputField, borderColor: errors.email ? 'red' : "#000000" }}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}

                                />
                                {errors.email &&
                                    <Text style={styles.validationErrorText}>{errors.email}</Text>
                                }
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
                                {errors.PhoneNumber &&
                                    <Text style={styles.validationErrorText}>{errors.PhoneNumber}</Text>
                                }
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder='Pasword'
                                    style={{ ...styles.inputField, borderColor: errors.password ? 'red' : "#000000" }}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {errors.password &&
                                    <Text style={styles.validationErrorText}>{errors.password}</Text>
                                }
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder='Re-Pasword'
                                    style={{ ...styles.inputField, borderColor: errors.passwordConfirmation ? 'red' : "#000000" }}
                                    onChangeText={handleChange('passwordConfirmation')}
                                    onBlur={handleBlur('passwordConfirmation')}
                                    value={values.passwordConfirmation}
                                />
                                {errors.password &&
                                    <Text style={styles.validationErrorText}>{errors.passwordConfirmation}</Text>
                                }
                            </View>

                            <View style={{ marginVertical: 15, paddingHorizontal: 10 }}>
                                <Checkbox
                                    value={values.acceptCondition}
                                    outlineColor={errors.acceptCondition ? 'red.800' : 'black'}
                                    borderColor={errors.acceptCondition ? 'red.800' : 'black'}

                                    colorScheme="danger"
                                    onChange={data => setFieldValue('acceptCondition', data)}

                                >
                                    <View>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#000000' }}>
                                            By signing up, you agree to our <Text style={{ color: colors.primary }}>Terms and Conditions.</Text>
                                        </Text>
                                        {errors.acceptCondition &&
                                            <Text style={styles.validationErrorText}>{errors.acceptCondition}</Text>
                                        }
                                    </View>

                                </Checkbox>
                            </View>

                        </View>
                        <View>
                            <TouchableOpacity style={{
                                backgroundColor: colors?.primary,
                                marginBottom: 25,
                                borderRadius: 30,
                                padding: 10,
                                marginHorizontal: 10
                            }}
                                // disabled={!isValid && !isLoading}
                                title="submit"
                                onPress={handleSubmit}
                            >
                                <Text style={{
                                    textAlign: 'center',
                                    fontWeight: '800',
                                    fontSize: 16,
                                    color: '#FFFFFF'
                                }}>Register Account</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}


            </Formik>

        </View>
    )
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
        borderColor: '#000000',
        borderRadius: 30,
        fontSize: 18,
        fontWeight: '400',
        backgroundColor: '#F2ECEE',
        marginHorizontal: 10,
        paddingLeft: 20,


    },
    validationErrorText: {
        fontFamily: 'Inter-Bold',
        fontSize: 10,
        fontStyle: 'italic',
        color: "red",
        marginHorizontal: 20,
    }

})