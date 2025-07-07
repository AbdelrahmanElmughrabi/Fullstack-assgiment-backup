
import React from 'react';

type ColorOption = 'yellow' | 'rose' | 'white';

interface ColorPickerProps {
  selectedColor: ColorOption;
  onColorChange: (color: ColorOption) => void;
  className?: string;
}

const ColorPicker = ({ selectedColor, onColorChange, className = '' }: ColorPickerProps) => {
  const colors: { value: ColorOption; name: string; bgColor: string; ringColor: string }[] = [
    { value: 'yellow', name: 'Yellow Gold', bgColor: 'bg-yellow-400', ringColor: 'ring-yellow-400' },
    { value: 'rose', name: 'Rose Gold', bgColor: 'bg-rose-300', ringColor: 'ring-rose-300' },
    { value: 'white', name: 'White Gold', bgColor: 'bg-gray-200', ringColor: 'ring-gray-300' },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-light text-gray-600 tracking-wide">Color:</span>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              w-7 h-7 rounded-full transition-all duration-300 transform hover:scale-110
              ${color.bgColor}
              ${selectedColor === color.value 
                ? `ring-2 ${color.ringColor} ring-offset-2 scale-110` 
                : 'hover:ring-2 hover:ring-gray-200 hover:ring-offset-1'
              }
            `}
            title={color.name}
            aria-label={`Select ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
