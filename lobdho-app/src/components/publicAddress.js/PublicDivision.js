import { FormControl, Input, Select, Skeleton } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDivisionQuery } from '../../store/features/publicAddressData/publicAddressDataSlice';


const PublicDivision = ({ setDivision }) => {
    const [service, setService] = React.useState("");
    const { data, isLoading, error } = useDivisionQuery();
    const [searchValue, setSearchValue] = useState('')
    useEffect(() => {
        setDivision(service)
    }, [service])

    return (
        <Select selectedValue={service}
            minWidth="200"
            accessibilityLabel="Division"
            placeholder="Choose Division"
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
            }} mt={1} onValueChange={itemValue => setService(itemValue)}>


            {data?.data?.filter(item => (item?.division?.toLowerCase()?.includes(searchValue?.toLocaleLowerCase())))
                .map(division => {
                    return <Select.Item label={division?.division} value={division?.division} key={division._id} />
                })}
        </Select>
    );
}

const styles = StyleSheet.create({})

export default PublicDivision;
