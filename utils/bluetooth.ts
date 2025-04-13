// utils/bluetooth.ts
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import { Alert } from 'react-native';

export const requestPermissions = async (): Promise<void> => {
    const { PermissionsAndroid } = require('react-native');
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
};

export const getBondedDevices = async (): Promise<BluetoothDevice[]> => {
    return await RNBluetoothClassic.getBondedDevices();
};

export const connectToDevice = async (device: BluetoothDevice): Promise<boolean> => {
    return await device.connect();
};

export const sendData = async (device: BluetoothDevice, data: string): Promise<void> => {
    const isConnected = await device.isConnected();
    if (isConnected) {
        await device.write(data);
    } else {
        throw new Error('Device is not connected');
    }
};
export const safeSendData = async (
    device: BluetoothDevice | null,
    data: string
): Promise<void> => {
    if (!device) {
        Alert.alert('Ошибка', 'Устройство не подключено');
        return;
    }

    try {
        const isConnected = await device.isConnected();
        if (!isConnected) {
            Alert.alert('Ошибка', 'Устройство не подключено по Bluetooth');
            return;
        }

        await device.write(data);
        console.log('✅ Данные отправлены:', data);
    } catch (error) {
        console.error('❌ Ошибка при отправке данных:', error);
        Alert.alert('Ошибка', 'Не удалось отправить данные');
    }
};