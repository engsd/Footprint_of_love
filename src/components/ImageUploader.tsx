import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useImageStore } from '../store/imageStore';

export function ImageUploader() {
  const addImage = useImageStore((state) => state.addImage);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          addImage({
            id: crypto.randomUUID(),
            file,
            preview: reader.result as string,
            tags: [],
            category: 'uncategorized',
            title: file.name,
            adjustments: {
              brightness: 100,
              contrast: 100,
              saturation: 100,
            },
          });
        };
        reader.readAsDataURL(file);
      });
    },
    [addImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? 'Drop the images here...'
          : 'Drag & drop images here, or click to select files'}
      </p>
    </div>
  );
}