// components/ColorPickerModal.tsx
import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
    onPick: (color: string) => void;
}

const ColorPickerModal = ({ visible, onClose, onPick }: Props) => {
    return (
        <Modal visible={visible} animationType="slide">
            <View>
                <Text>Выбор цвета</Text>
                <Button title="Красный" onPress={() => onPick('#FF0000')} />
                <Button title="Закрыть" onPress={onClose} />
            </View>
        </Modal>
    );
};

export default ColorPickerModal;



