import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, FormControl, Input, Modal, } from 'native-base';
import { colors } from '../../assets/theme/styles';

const EmailPasswordResetModal = ({ modalVisible, setModalVisible, setEmail, handleReset }) => {
    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Forgot Password?</Modal.Header>
                <Modal.Body>
                    Enter email address and we'll send a link to reset your password.
                    <FormControl mt="3">
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            onChangeText={text => setEmail(text)}
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button flex="1" onPress={handleReset}
                        bgColor={colors.primary}
                    >
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>

    </>;
}

const styles = StyleSheet.create({})

export default EmailPasswordResetModal;
