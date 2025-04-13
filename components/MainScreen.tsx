import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Counter } from './Counter';
import { sendData } from '../utils/bluetooth';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

const MainScreen = () => {
    const [leftScore, setLeftScore] = useState(0);
    const [rightScore, setRightScore] = useState(0);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null); // Состояние для подключённого устройства

    const incrementLeft = () => setLeftScore(prev => prev + 1);
    const decrementLeft = () => setLeftScore(prev => Math.max(prev - 1, 0));

    const incrementRight = () => setRightScore(prev => prev + 1);
    const decrementRight = () => setRightScore(prev => Math.max(prev - 1, 0));

    const handleSend = () => {
        if (connectedDevice) {
            const data = `${leftScore}|0|0|${rightScore}|0`; // Пример формата
            sendData(connectedDevice, data); // Отправляем данные только если устройство подключено
        } else {
            alert('Устройство не подключено!');
        }
    };

    return (
        <View style={styles.container}>
            <Counter label="Левый счёт" value={leftScore} onIncrement={incrementLeft} onDecrement={decrementLeft} />
            <Counter label="Правый счёт" value={rightScore} onIncrement={incrementRight} onDecrement={decrementRight} />

            <View style={styles.sendSection}>
                <Button title="Отправить данные по Bluetooth" onPress={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    sendSection: {
        marginTop: 30,
        alignItems: 'center',
    },
});

export default MainScreen;
