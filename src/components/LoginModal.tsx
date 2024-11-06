import React from 'react';
import { MessageSquare, MessagesSquare } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = (provider: 'wechat' | 'qq') => {
    // Simulate social login - In production, implement actual OAuth flow
    const mockUser = {
      id: crypto.randomUUID(),
      name: `User_${Math.random().toString(36).substr(2, 9)}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      provider,
    };
    setUser(mockUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">登录</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('wechat')}
            className="w-full flex items-center justify-center gap-3 bg-[#07C160] text-white py-3 rounded-lg hover:bg-[#06b058] transition-colors"
          >
            <MessagesSquare className="w-6 h-6" />
            <span>微信登录</span>
          </button>
          <button
            onClick={() => handleLogin('qq')}
            className="w-full flex items-center justify-center gap-3 bg-[#12B7F5] text-white py-3 rounded-lg hover:bg-[#10a7e0] transition-colors"
          >
            <MessageSquare className="w-6 h-6" />
            <span>QQ登录</span>
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full text-gray-600 hover:text-gray-800"
        >
          取消
        </button>
      </div>
    </div>
  );
}