import React from 'react';
import { useImageStore } from '../store/imageStore';
import { Share2, Tag, Trash2 } from 'lucide-react';

export function ImageGrid() {
  const images = useImageStore((state) => state.images);
  const removeImage = useImageStore((state) => state.removeImage);

  const handleShare = async (imageUrl: string) => {
    try {
      await navigator.share({
        title: 'Share Image',
        text: 'Check out this image!',
        url: imageUrl,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={image.preview}
            alt={image.title}
            className="w-full h-48 object-cover"
            style={{
              filter: `brightness(${image.adjustments.brightness}%) contrast(${image.adjustments.contrast}%) saturate(${image.adjustments.saturation}%)`,
            }}
          />
          <div className="p-4">
            <h3 className="font-semibold text-gray-800">{image.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {image.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-2">
              <button
                onClick={() => handleShare(image.preview)}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeImage(image.id)}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}