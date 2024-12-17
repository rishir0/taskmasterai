import React from 'react';
import { 
  Home, Settings, Palette, StickyNote, Calendar, Users, 
  Globe, Zap, Cpu, Gem, User 
} from 'lucide-react';
import { Logo } from './Logo';

export function Dashboard() {
  return (
    <div className="container bg-gray-900 text-white h-screen w-full overflow-hidden">
      <div className="sidebar fixed top-0 left-0 h-full w-64 bg-[#1E1E1E] flex flex-col p-5 box-border gap-5">
        
        {/* Logo Container */}
        <div className="logo-container flex items-center mb-8"> {/* Restored mb-8 */}
          <Logo className="mr-2" />
        </div>
        
        {/* Menu Items */}
        <div className="menu flex flex-col gap-4 flex-grow">
          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Palette className="w-5 h-5" />
            <span>Theme</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <StickyNote className="w-5 h-5" />
            <span>Notes</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Users className="w-5 h-5" />
            <span>Friends</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Globe className="w-5 h-5" />
            <span>Community</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Zap className="w-5 h-5" />
            <span>Distraction Control</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base hover:bg-gray-800 p-2 rounded">
            <Cpu className="w-5 h-5" />
            <span>AI Chat Bot</span>
          </div>

          <button className="upgrade-btn bg-gradient-to-r from-pink-500 to-pink-600 text-white border-none py-2 px-4 rounded-full cursor-pointer font-semibold flex items-center gap-2 whitespace-nowrap mt-4 hover:from-pink-600 hover:to-pink-700 transition-colors">
            <Gem className="w-5 h-5" />
            <span>Upgrade to Premium</span>
          </button>
        </div>
        
        {/* User Profile */}
        <div className="user-profile mt-auto flex items-center gap-2 text-white cursor-pointer p-2 hover:bg-gray-800 rounded">
          {/* Circular Container for User Icon */}
          <div className="icon-container w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <span>User Name</span>
        </div>
      </div>
    </div>
  );
}
