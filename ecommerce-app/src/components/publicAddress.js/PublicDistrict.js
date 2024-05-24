import { FormControl, Input, Select, Skeleton } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDistrictDetailsQuery } from '../../store/features/publicAddressData/publicAddressDataSlice';


const PublicDistrict = ({ division, setDistrict }) => {
    const [service, setService] = React.useState({});
    const [searchValue, setSearchValue] = useState('')
    const { error, data, isLoading } = useDistrictDetailsQuery(division);
    const handledata = (item) => {
        setDistrict(item)
    }
    return (
        <>
            {isLoading && <Skeleton />}
            {
                !error && !isLoading && data &&
                <Select
                    selectedValue={service?.district}
                    minWidth="200"
                    accessibilityLabel="District"
                    placeholder="Choose District"
                    fontSize={14}
                    borderColor="#333"
                    fontFamily="Inter-Bold"
                    rounded="full"
                    paddingLeft={4}
                    mx={2}
                    _actionSheetBody={{
                        ListHeaderComponent: <>
                            <FormControl mb={5}>
                                <Input placeholder='search' onChangeText={text => setSearchValue(text)} />
                            </FormControl>
                            <View>
                                {isLoading && <Skeleton />}
                                {error && <Text> Opps Something Wrong </Text>}
                            </View>
                        </>


                    }}

                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <Icon name="arrow-down" size={3}
                            color='#333'
                        />
                    }} mt={1}
                    onValueChange={(itemValue) => {
                        setService(itemValue)
                    }}>


                    {data?.data?.filter(item => (item?.district?.toLowerCase()?.includes(searchValue?.toLocaleLowerCase())))
                        .map(district => {
                            return <Select.Item label={district?.district} value={district?.district} key={district._id} onPressOut={() => handledata(district)} />
                        })}
                </Select>
            }
        </>

    );
}

const styles = StyleSheet.create({})

export default PublicDistrict;
