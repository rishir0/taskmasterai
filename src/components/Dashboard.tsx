import React from 'react';
import { Home, Settings, Palette, StickyNote, Calendar, Users, Globe, Zap, Cpu, Gem, User } from 'lucide-react';
import { Logo } from './Logo';

export function Dashboard() {
  return (
    <div className="container bg-gray-900 text-white h-screen w-full overflow-hidden">
      <div className="sidebar fixed top-0 left-0 h-full w-64 bg-[#1E1E1E] flex flex-col p-5 box-border gap-5">
        <div className="logo-container flex items-center mb-8">
          <Logo className="mr-2" />
        </div>
        
        <div className="menu flex flex-col gap-4 flex-grow">
          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Palette className="w-5 h-5" />
            <span>Theme</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <StickyNote className="w-5 h-5" />
            <span>Notes</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Calendar className="w-5 h-5" />
            <span>Calendar</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Users className="w-5 h-5" />
            <span>Friends</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Globe className="w-5 h-5" />
            <span>Community</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Zap className="w-5 h-5" />
            <span>Distraction Control</span>
          </div>

          <div className="menu-item flex items-center gap-2 cursor-pointer text-base">
            <Cpu className="w-5 h-5" />
            <span>AI Chat Bot</span>
          </div>

          <button className="upgrade-btn bg-gradient-to-r from-pink-500 to-pink-600 text-white border-none py-2 px-4 rounded-full cursor-pointer font-semibold flex items-center gap-2 whitespace-nowrap mt-4">
            <Gem className="w-5 h-5" />
            <span>Upgrade to Premium</span>
          </button>
        </div>
        
        <div className="user-profile mt-auto flex items-center gap-2 text-white cursor-pointer">
          <User className="w-5 h-5" />
          <span>User Name</span>
        </div>
      </div>
    </div>
  );
}
