import React from 'react';
import { Modal, View, Button, StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

type Props = {
    visible: boolean;
    onClose: () => void;
    onColorSelected: (color: string) => void;
};

const ColorPickerModal: React.FC<Props> = ({ visible, onClose, onColorSelected }) => {
    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modal}>
                <ColorPicker
                    onColorSelected={(color) => {
                        onColorSelected(color);
                        onClose(); // Закрытие после выбора
                    }}
                    style={{ flex: 1 }}
                />
                <Button title="Закрыть" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});

export default ColorPickerModal;


