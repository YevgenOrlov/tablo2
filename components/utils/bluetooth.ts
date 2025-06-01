// utils/bluetooth.ts
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { Alert } from 'react-native';

/**
 * Отправка данных на подключенное Bluetooth-устройство
 */
export const sendData = async (device: BluetoothDevice, data: string) => {
    try {
        await device.write(data + '\n'); // Добавим \n для совместимости с Arduino/ESP
        console.log('✅ Данные отправлены: ', data);
    } catch (error) {
        console.error('❌ Ошибка при отправке:', error);
        Alert.alert('Ошибка', 'Не удалось отправить данные через Bluetooth');
    }
};
