import React from 'react';
import { Sidebar } from './Sidebar';
import { TimerSidebar } from './TimerSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <TimerSidebar />
    </div>
  );
};
