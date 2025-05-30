// components/BluetoothManager.tsx
import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

interface Props {
    dataToSend: string;
}

const BluetoothManager = ({ dataToSend }: Props) => {
    const sendViaBluetooth = () => {
        // Псевдокод отправки
        Alert.alert('Отправка по Bluetooth', `Данные: ${dataToSend}`);
    };

    return (
        <View>
            <Text>Bluetooth Manager</Text>
            <Button title="Send" onPress={sendViaBluetooth} />
        </View>
    );
};

export default BluetoothManager;





