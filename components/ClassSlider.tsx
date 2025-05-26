// components/ClassSlider.tsx
// components/ClassSlider.tsx
import React from 'react';
import Slider from '@react-native-community/slider';

const ClassSlider = React.forwardRef((props: any, ref: any) => {
    return <Slider ref={ref} {...props} />;
});

export default ClassSlider;


