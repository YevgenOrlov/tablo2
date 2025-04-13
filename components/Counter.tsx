import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
    label: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

export const Counter: React.FC<Props> = ({ label, value, onIncrement, onDecrement }) => (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        <View style={styles.buttons}>
            <Button title="+" onPress={onIncrement} />
            <Button title="-" onPress={onDecrement} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { margin: 10, alignItems: 'center' },
    label: { fontSize: 18 },
    value: { fontSize: 32, marginVertical: 10 },
    buttons: { flexDirection: 'row', gap: 10 },
});
