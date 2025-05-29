import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Counter } from './components/Counter';
import {
  requestPermissions,
  getBondedDevices,
  connectToDevice,
  safeSendData,
} from './utils/bluetooth';
import type { BluetoothDevice } from 'react-native-bluetooth-classic';

export default function App() {
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const scanDevices = async () => {
    const bonded = await getBondedDevices();
    if (bonded.length > 0) {
      await connectToDevice(bonded[0]);
      setConnectedDevice(bonded[0]);
    } else {
      alert('Нет сопряжённых Bluetooth-устройств');
    }
  };

  const sendDataToBluetooth = async () => {
    if (connectedDevice) {
      const payload = `${leftScore}|0|${rightScore}|0|0`;
      console.log('Отправка:', payload);
      await safeSendData(connectedDevice, payload + '\n');
    } else {
      alert('Bluetooth-устройство не подключено!');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Сканировать устройства" onPress={scanDevices} />

      {connectedDevice && (
        <Text style={styles.connectedText}>
          Подключено к: {connectedDevice.name}
        </Text>
      )}

      <Counter
        label="Счёт слева"
        value={leftScore}
        onIncrement={() => setLeftScore(prev => prev + 1)}
        onDecrement={() => setLeftScore(prev => Math.max(0, prev - 1))}
      />

      <Counter
        label="Счёт справа"
        value={rightScore}
        onIncrement={() => setRightScore(prev => prev + 1)}
        onDecrement={() => setRightScore(prev => Math.max(0, prev - 1))}
      />

      <Button title="Отправить по Bluetooth" onPress={sendDataToBluetooth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  connectedText: { textAlign: 'center', marginVertical: 10, fontSize: 16 },
});



