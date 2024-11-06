import { create } from 'zustand';
import { ImageStore, ImageData } from '../types';

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImage: (image) =>
    set((state) => ({ images: [...state.images, image] })),
  removeImage: (id) =>
    set((state) => ({
      images: state.images.filter((img) => img.id !== id),
    })),
  updateImage: (id, data) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, ...data } : img
      ),
    })),
  addTag: (id, tag) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id
          ? { ...img, tags: [...new Set([...img.tags, tag])] }
          : img
      ),
    })),
  removeTag: (id, tag) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id
          ? { ...img, tags: img.tags.filter((t) => t !== tag) }
          : img
      ),
    })),
  setCategory: (id, category) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, category } : img
      ),
    })),
}));