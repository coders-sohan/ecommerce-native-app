import { useNavigation } from '@react-navigation/native';
import { Button, Modal } from 'native-base';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../assets/theme/styles';

const SuccessOrder = ({ setModalVisible, modalVisible, }) => {
    const navigation = useNavigation()
    return (
        <Modal isOpen={modalVisible} onClose={setModalVisible} size="md">
            <Modal.Content maxH="212">
                <Modal.CloseButton />
                <Modal.Header>Your Order placed successfully</Modal.Header>
                <Modal.Body>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <Icon name="shopping" size={40} color={colors.secondary} />
                    </View>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>

                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            navigation.navigate('orders')
                        }}>
                            My orders
                        </Button>

                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}



export default SuccessOrder;
