import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import {
    requestPermissions,
    getBondedDevices,
    connectToDevice,
    safeSendData  // заменили sendData на safeSendData
} from '../utils/bluetooth';

import type { BluetoothDevice } from 'react-native-bluetooth-classic';


const BluetoothManager = () => {
    const [devices, setDevices] = useState<BluetoothDevice[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);

    useEffect(() => {
        requestPermissions();
    }, []);

    const scanDevices = async () => {
        const bonded = await getBondedDevices();
        setDevices(bonded);
    };

    const handleConnect = async (device: any) => {
        const connected = await connectToDevice(device);
        if (connected) {
            setConnectedDevice(device);
        }
    };

    const handleSend = async () => {
        await safeSendData(connectedDevice, '1|0|0|0|0');
    };


    return (
        <View>
            <Button title="Сканировать устройства" onPress={scanDevices} />
            <FlatList
                data={devices}
                keyExtractor={item => item.address}
                renderItem={({ item }) => (
                    <Button title={item.name} onPress={() => handleConnect(item)} />
                )}
            />
            {connectedDevice && (
                <View>
                    <Text>Подключено к: {connectedDevice.name}</Text>
                    <Button title="Отправить данные" onPress={handleSend} />
                </View>
            )}
        </View>
    );
};

export default BluetoothManager;




