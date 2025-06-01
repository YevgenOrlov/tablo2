// components/ColorPickerModal.tsx
import React, { useState } from 'react';
import { Modal, View, Button, StyleSheet, TextInput } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    onPick: (color: string) => void;
}

const ColorPickerModal: React.FC<Props> = ({ visible, onClose, onPick }) => {
    const [color, setColor] = useState('#000000');

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        value={color}
                        onChangeText={setColor}
                        placeholder="#RRGGBB"
                    />
                    <Button title="Выбрать цвет" onPress={() => onPick(color)} />
                    <Button title="Отмена" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    input: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
    },
});

export default ColorPickerModal;




