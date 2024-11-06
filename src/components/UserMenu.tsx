import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function UserMenu() {
  const { user, setUser } = useAuthStore();

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full"
      />
      <span className="text-sm font-medium">{user.name}</span>
      <button
        onClick={handleLogout}
        className="p-2 hover:bg-gray-100 rounded-full"
        title="登出"
      >
        <LogOut className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}