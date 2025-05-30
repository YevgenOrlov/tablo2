// App.tsx
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Counter from './components/Counter';
import BluetoothManager from './components/BluetoothManager';
import ColorPickerModal from './components/ColorPickerModal';

export default function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('#FFFFFF');
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <Counter
        label="Счёт"
        value={count}
        onIncrement={() => setCount(count + 1)}
        onDecrement={() => setCount(count > 0 ? count - 1 : 0)}
        onColorChange={(type, newColor) => {
          setColor(newColor);
          setModalVisible(true);
        }}
      />
      <BluetoothManager dataToSend={`${count}|${color}`} />
      <ColorPickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPick={(pickedColor) => {
          setColor(pickedColor);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}





