import { FormControl, Input, Select, Skeleton } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const PublicThana = ({ data, setUpzila }) => {
    const [service, setService] = React.useState("");
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        setUpzila(service)
    }, [service])
    return (
        <Select
            selectedValue={service}
            minWidth="200"
            accessibilityLabel="Upzila"
            placeholder="Choose Upzila"
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


            {data?.upazilla?.filter(item => (item?.toLowerCase()?.includes(searchValue?.toLocaleLowerCase())))
                .map(upazilla => {
                    return <Select.Item label={upazilla} value={upazilla} key={upazilla} />
                })}
        </Select>
    );
}

const styles = StyleSheet.create({})

export default PublicThana;
