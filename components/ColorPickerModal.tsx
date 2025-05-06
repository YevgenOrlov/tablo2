import React from 'react';
import { Modal, View, Button } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

interface Props {
    visible: boolean;
    onClose: () => void;
    onColorSelected: (color: string) => void;
}

const ColorPickerModal: React.FC<Props> = ({ visible, onClose, onColorSelected }) => {
    return (
        <Modal visible={visible} transparent={false} animationType="slide">
            <View style={{ flex: 1, padding: 20 }}>
                <ColorPicker
                    onColorSelected={color => {
                        onColorSelected(color);
                        onClose();
                    }}
                    style={{ flex: 1 }}
                />
                <Button title="Закрыть" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default ColorPickerModal;
