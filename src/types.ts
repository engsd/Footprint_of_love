export interface ImageData {
  id: string;
  file: File;
  preview: string;
  tags: string[];
  category: string;
  title: string;
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  provider: 'wechat' | 'qq';
}

export interface ImageStore {
  images: ImageData[];
  addImage: (image: ImageData) => void;
  removeImage: (id: string) => void;
  updateImage: (id: string, data: Partial<ImageData>) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
  setCategory: (id: string, category: string) => void;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}