import { Center, HStack, Skeleton, VStack } from 'native-base';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProductSceleton = () => {
    return <Center w="100%">
        <HStack w="90%" maxW="400" borderWidth="1" space={8} rounded="md" _dark={{
            borderColor: "coolGray.500"
        }} _light={{
            borderColor: "coolGray.200"
        }} p="4">
            <Skeleton flex="1" h="100" rounded="md" startColor="coolGray.300" />
            <VStack flex="3" space="4">
                <Skeleton startColor="gray.300" />
                <Skeleton.Text startColor="gray.300" />
                <HStack space="2" alignItems="center">
                    <Skeleton size="5" rounded="full" startColor="gray.300" />
                    <Skeleton h="3" flex="2" rounded="full" startColor="gray.300" />
                    <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
                </HStack>
            </VStack>
        </HStack>

    </Center>;

}

const styles = StyleSheet.create({})

export default ProductSceleton;
