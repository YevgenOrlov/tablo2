import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

type Props = {
    label: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onColorChange?: (type: 'label' | 'value', color: string) => void; // для передачи наружу
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

    const handleLabelColorSelected = (color: string) => {
        setLabelColor(color);
        setLabelPickerVisible(false);
        onColorChange?.('label', color);
    };

    const handleValueColorSelected = (color: string) => {
        setValueColor(color);
        setValuePickerVisible(false);
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

            {/* Модальное окно выбора цвета имени */}
            <Modal visible={labelPickerVisible} animationType="slide">
                <View style={styles.modal}>
                    <ColorPicker
                        onColorSelected={handleLabelColorSelected}
                        style={{ flex: 1 }}
                    />
                    <Button title="Закрыть" onPress={() => setLabelPickerVisible(false)} />
                </View>
            </Modal>

            {/* Модальное окно выбора цвета значения */}
            <Modal visible={valuePickerVisible} animationType="slide">
                <View style={styles.modal}>
                    <ColorPicker
                        onColorSelected={handleValueColorSelected}
                        style={{ flex: 1 }}
                    />
                    <Button title="Закрыть" onPress={() => setValuePickerVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { margin: 10, alignItems: 'center' },
    label: { fontSize: 18 },
    value: { fontSize: 32, marginVertical: 10 },
    buttons: { flexDirection: 'row', gap: 10, marginVertical: 5 },
    modal: { flex: 1, padding: 20 },
});

