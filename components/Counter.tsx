// components/Counter.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ColorPickerModal from './ColorPickerModal';

type Props = {
    label: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onColorChange?: (type: 'label' | 'value', color: string) => void;
};

export const Counter: React.FC<Props> = ({
    label,
    value,
    onIncrement,
    onDecrement,
    onColorChange,
}) => {
    const [labelColor, setLabelColor] = useState('#000000');
    const [valueColor, setValueColor] = useState('#000000');

    const [labelPickerVisible, setLabelPickerVisible] = useState(false);
    const [valuePickerVisible, setValuePickerVisible] = useState(false);

    const handleLabelColorChange = (color: string) => {
        setLabelColor(color);
        onColorChange?.('label', color);
    };

    const handleValueColorChange = (color: string) => {
        setValueColor(color);
        onColorChange?.('value', color);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
            <Text style={[styles.value, { color: valueColor }]}>{value}</Text>

            <View style={styles.buttons}>
                <Button title="+" onPress={onIncrement} />
                <Button title="-" onPress={onDecrement} />
            </View>

            <View style={styles.buttons}>
                <Button title="Цвет имени" onPress={() => setLabelPickerVisible(true)} />
                <Button title="Цвет счёта" onPress={() => setValuePickerVisible(true)} />
            </View>

            <ColorPickerModal
                visible={labelPickerVisible}
                onClose={() => setLabelPickerVisible(false)}
                onColorSelected={handleLabelColorChange}
            />

            <ColorPickerModal
                visible={valuePickerVisible}
                onClose={() => setValuePickerVisible(false)}
                onColorSelected={handleValueColorChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { margin: 10, alignItems: 'center' },
    label: { fontSize: 18 },
    value: { fontSize: 32, marginVertical: 10 },
    buttons: { flexDirection: 'row', gap: 10, marginVertical: 5 },
});


