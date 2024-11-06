import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageGrid } from './components/ImageGrid';
import { ImageEditor } from './components/ImageEditor';
import { LoginModal } from './components/LoginModal';
import { UserMenu } from './components/UserMenu';
import { useImageStore } from './store/imageStore';
import { useAuthStore } from './store/authStore';
import { ImageData } from './types';
import { Search, Image as ImageIcon, User as UserIcon } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const updateImage = useImageStore((state) => state.updateImage);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleImageUpdate = (id: string, adjustments: ImageData['adjustments']) => {
    updateImage(id, { adjustments });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-blue-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                Image Manager
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索图片..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isAuthenticated ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-8">
                <ImageUploader />
              </div>
              <ImageGrid />
            </div>
            <div className="lg:col-span-1">
              {selectedImage && (
                <ImageEditor
                  image={selectedImage}
                  onUpdate={(adjustments) =>
                    handleImageUpdate(selectedImage.id, adjustments)
                  }
                />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              请登录以管理您的图片
            </h2>
            <p className="text-gray-600 mb-8">
              登录后即可上传、编辑和分享您的图片
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              立即登录
            </button>
          </div>
        )}
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

export default App;