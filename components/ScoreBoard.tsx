import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Counter } from './Counter'; // Подключаем компонент Counter для управления счётчиками

type Props = {
    leftScore: number;
    rightScore: number;
    leftName: string;
    rightName: string;
    onLeftIncrement: () => void;
    onLeftDecrement: () => void;
    onRightIncrement: () => void;
    onRightDecrement: () => void;
    onSendData: () => void;
};

export const ScoreBoard: React.FC<Props> = ({
    leftScore,
    rightScore,
    leftName,
    rightName,
    onLeftIncrement,
    onLeftDecrement,
    onRightIncrement,
    onRightDecrement,
    onSendData,
}) => (
    <View style={styles.container}>
        <Text style={styles.title}>Счёт бадминтона</Text>

        {/* Имена игроков */}
        <View style={styles.namesContainer}>
            <Text style={styles.playerName}>Игрок слева: {leftName}</Text>
            <Text style={styles.playerName}>Игрок справа: {rightName}</Text>
        </View>

        {/* Счётчики */}
        <Counter
            label="Счёт слева"
            value={leftScore}
            onIncrement={onLeftIncrement}
            onDecrement={onLeftDecrement}
        />
        <Counter
            label="Счёт справа"
            value={rightScore}
            onIncrement={onRightIncrement}
            onDecrement={onRightDecrement}
        />

        {/* Кнопка отправки данных по Bluetooth */}
        <Button title="Отправить данные по Bluetooth" onPress={onSendData} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    namesContainer: {
        marginBottom: 20,
    },
    playerName: {
        fontSize: 18,
        marginBottom: 10,
    },
});
