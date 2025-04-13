import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

type Props = {
    label: string;
    value: string;
    onChange: (text: string) => void;
};

export const NameInput: React.FC<Props> = ({ label, value, onChange }) => (
    <View style={styles.container}>
        <Text>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Введите имя"
        />
    </View>
);

const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    label: { fontSize: 16, marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
});
