// components/ClassSlider.tsx
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, Text } from 'react-native';

export interface ClassSliderRef {
    getValue: () => number;
}

interface Props {
    value: number;
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
}

const ClassSlider = forwardRef<ClassSliderRef, Props>(
    ({ value, onValueChange, min = 0, max = 100 }, ref) => {
        const [val, setVal] = useState(value.toString());

        useImperativeHandle(ref, () => ({
            getValue: () => Number(val),
        }));

        const handleChange = (text: string) => {
            const num = parseInt(text, 10);
            if (!isNaN(num) && num >= min && num <= max) {
                setVal(text);
                onValueChange?.(num);
            }
        };

        return (
            <View>
                <Text>Value:</Text>
                <TextInput
                    keyboardType="numeric"
                    value={val}
                    onChangeText={handleChange}
                    style={{ borderWidth: 1, padding: 5, width: 100 }}
                />
            </View>
        );
    }
);

export default ClassSlider;




