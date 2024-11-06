import React from 'react';
import { ImageData } from '../types';

interface ImageEditorProps {
  image: ImageData;
  onUpdate: (adjustments: ImageData['adjustments']) => void;
}

export function ImageEditor({ image, onUpdate }: ImageEditorProps) {
  const handleAdjustment = (
    type: keyof ImageData['adjustments'],
    value: number
  ) => {
    onUpdate({
      ...image.adjustments,
      [type]: value,
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">Image Adjustments</h3>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brightness
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={image.adjustments.brightness}
            onChange={(e) =>
              handleAdjustment('brightness', parseInt(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contrast
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={image.adjustments.contrast}
            onChange={(e) =>
              handleAdjustment('contrast', parseInt(e.target.value))
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Saturation
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={image.adjustments.saturation}
            onChange={(e) =>
              handleAdjustment('saturation', parseInt(e.target.value))
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}