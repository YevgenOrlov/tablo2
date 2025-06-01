// components/Counter.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ColorPickerModal from './ColorPickerModal';

interface CounterProps {
    label: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onColorChange: (type: 'label' | 'value', color: string) => void;
}

export const Counter: React.FC<CounterProps> = ({
    label,
    value,
    onIncrement,
    onDecrement,
    onColorChange,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [colorType, setColorType] = useState<'label' | 'value'>('label');

    const openColorPicker = (type: 'label' | 'value') => {
        setColorType(type);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}: {value}
            </Text>

            <View style={styles.counterControls}>
                <Button title="−" onPress={onDecrement} />
                <Button title="+" onPress={onIncrement} />
            </View>

            <View style={styles.colorControls}>
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
    container: {
        marginVertical: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    counterControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    colorControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});



