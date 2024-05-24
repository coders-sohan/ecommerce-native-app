import { View, Text, TouchableOpacity, SectionList } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import NotificationCard from '../../components/notificationCard/NotificationCard';
import { padding } from '../../assets/theme/styles';
import { useDispatch } from 'react-redux';
import { addNotificationInterection } from '../../store/features/notification/notificationSlice';
import { useAuth } from '../../hooks/auth/useAuth';
import { useGetUserHistoryQuery } from '../../store/features/user/userSlice';
export default function NotificationScreens({ navigation }) {
    const userDAta = useAuth();
    const { isLoading, error, data } = useGetUserHistoryQuery(userDAta?.user?._id);
    console.log(data?.data?.userHistory?.[0], error, userDAta?.user?._id)

    const dispatch = useDispatch();
    // show notification page based on user interection 
    useEffect(() => {
        dispatch(addNotificationInterection(false))
    }, [])
    return (
        <View style={{ backgroundColor: '#E4EAEA', flex: 1 }}>
            <View style={{ marginHorizontal: 20, paddingTop: padding.default }}>
                {/* custom header  */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={18} color="#000000" />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{ fontFamily: 'Inter-Bold', color: '#010101', fontSize: 22 }}>Notification</Text>
                    </View>

                </View>
                {/* wish list card  */}
                {
                    data?.data?.userHistory?.[0]?.message?.length > 0 ?
                        <View style={{ marginTop: 30 }}>
                            <SectionList
                                sections={data?.data?.userHistory[0].message}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => (
                                    <NotificationCard item={item} />
                                )}
                                renderSectionHeader={({ section: { title } }) => (
                                    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 15, color: '#000000', marginVertical: 10 }}>{title?.split('T')?.[0]}</Text>
                                )}
                            />
                        </View> : <Text style={{ color: '#000000', textAlign: 'center' }}>No notification found</Text>
                }


            </View>
        </View>
    )
}