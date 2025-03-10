import React from 'react';
import Slider from '@mui/material/Slider';

interface MySliderProps {
    value: number | number[];
  handleSliderChange: (event: Event, value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string | undefined;
}

const MySlider: React.FC<MySliderProps> = ({
    value,
  handleSliderChange,
  min = 0,
  max = 500000,
  step = 5000,
    className,
}) => {
  return (
    <Slider
      value={value}
      onChange={handleSliderChange}
      className={`[&_span.MuiSlider-thumb]:w-4 [&_span.MuiSlider-thumb]:h-4 [&_span.MuiSlider-thumb]:bg-[#1AA683] [&_span.MuiSlider-thumb]:rounded-[50%] [&_span.MuiSlider-thumb]:border-[2px] [&_span.MuiSlider-thumb]:border-white
                  [&_span.MuiSlider-track]:bg-[#1AA683] [&_span.MuiSlider-track]:border-none
                  [&_span.MuiSlider-rail]:bg-[#1AA683] ${className}`}
      min={min}
      max={max}
      step={step}
    />
  );
};

export default MySlider;
