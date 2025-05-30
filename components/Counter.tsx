// components/Counter.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ClassSlider from './ClassSlider';
import ColorPickerModal from './ColorPickerModal';

interface CounterProps {
    label: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onColorChange: (type: 'label' | 'value', color: string) => void;
}

export const Counter = ({ label, value, onIncrement, onDecrement, onColorChange }: CounterProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [colorType, setColorType] = useState<'label' | 'value'>('label');

    const openColorPicker = (type: 'label' | 'value') => {
        setColorType(type);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text>{label}: {value}</Text>
            <View style={styles.buttons}>
                <Button title="-" onPress={onDecrement} />
                <Button title="+" onPress={onIncrement} />
            </View>
            <ClassSlider value={value} onValueChange={(v) => { }} min={0} max={99} />
            <View style={styles.colorButtons}>
                <Button title="Цвет метки" onPress={() => openColorPicker('label')} />
                <Button title="Цвет значения" onPress={() => openColorPicker('value')} />
            </View>
            <ColorPickerModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onPick={(color) => {
                    onColorChange(colorType, color);
                    setModalVisible(false);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
    colorButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});




