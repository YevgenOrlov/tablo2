import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TextInput, FlatList, Text } from 'react-native';
import { Counter } from './Counter';
import { sendData } from '../utils/bluetooth';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

const MainScreen = () => {
    const [leftScore, setLeftScore] = useState(0);
    const [rightScore, setRightScore] = useState(0);
    const [leftName, setLeftName] = useState('Ivan');
    const [rightName, setRightName] = useState('Oleg');

    const [leftColors, setLeftColors] = useState({ label: '#FF0000', value: '#00FF00' });
    const [rightColors, setRightColors] = useState({ label: '#0000FF', value: '#FFFF00' });

    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
    const [availableDevices, setAvailableDevices] = useState<BluetoothDevice[]>([]);

    useEffect(() => {
        scanAndConnect();
    }, []);

    const scanAndConnect = async () => {
        try {
            const bonded = await RNBluetoothClassic.getBondedDevices();
            console.log('🔍 Найдено устройств:', bonded);
            const hc05 = bonded.find((d) => d.name === 'HC-05');

            if (hc05) {
                const connected = await hc05.connect();
                if (connected) {
                    Alert.alert('Успех', `Подключено к ${hc05.name}`);
                    setConnectedDevice(hc05);
                } else {
                    Alert.alert('Ошибка', 'Не удалось подключиться к HC-05');
                }
            } else {
                Alert.alert('Ошибка', 'HC-05 не найден в спаренных устройствах');
                setAvailableDevices(bonded);
            }
        } catch (error) {
            console.error('Bluetooth scan error:', error);
            Alert.alert('Ошибка', 'Сканирование Bluetooth не удалось');
        }
    };

    const incrementLeft = () => setLeftScore((prev) => prev + 1);
    const decrementLeft = () => setLeftScore((prev) => Math.max(prev - 1, 0));
    const incrementRight = () => setRightScore((prev) => prev + 1);
    const decrementRight = () => setRightScore((prev) => Math.max(prev - 1, 0));

    const handleColorChange = (side: 'left' | 'right', type: 'label' | 'value', color: string) => {
        const cleanColor = color.replace('#', '');
        if (side === 'left') {
            setLeftColors((prev) => ({ ...prev, [type]: cleanColor }));
        } else {
            setRightColors((prev) => ({ ...prev, [type]: cleanColor }));
        }
    };

    const handleSend = () => {
        if (connectedDevice) {
            const data = [
                leftScore,
                leftName,
                leftColors.label,
                leftColors.value,
                rightScore,
                rightName,
                rightColors.label,
                rightColors.value,
            ].join('|');

            sendData(connectedDevice, data);
        } else {
            Alert.alert('Ошибка', 'Устройство не подключено!');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Имя левого игрока"
                value={leftName}
                onChangeText={setLeftName}
            />
            <Counter
                label="Левый счёт"
                value={leftScore}
                onIncrement={incrementLeft}
                onDecrement={decrementLeft}
                onColorChange={(type, color) => handleColorChange('left', type, color)}
            />

            <TextInput
                style={styles.input}
                placeholder="Имя правого игрока"
                value={rightName}
                onChangeText={setRightName}
            />
            <Counter
                label="Правый счёт"
                value={rightScore}
                onIncrement={incrementRight}
                onDecrement={decrementRight}
                onColorChange={(type, color) => handleColorChange('right', type, color)}
            />

            <View style={styles.sendSection}>
                <Button title="Отправить данные по Bluetooth" onPress={handleSend} />
            </View>

            {!connectedDevice && (
                <FlatList
                    data={availableDevices}
                    keyExtractor={(item) => item.address}
                    renderItem={({ item }) => (
                        <Text style={{ textAlign: 'center' }}>{item.name} ({item.address})</Text>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginVertical: 8,
    },
    sendSection: {
        marginTop: 30,
        alignItems: 'center',
    },
});

export default MainScreen;
