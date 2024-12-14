import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Icons } from '../utils/Icons';

export const Sidebar: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="sidebar">
      <div className="logo">
        {Icons.logo}
        TaskMaster AI
      </div>
      
      <Link to="/" className="menu-item">
        {Icons.dashboard}
        Dashboard
      </Link>

      <Link to="/account" className="menu-item">
        {Icons.settings}
        Settings
      </Link>

      {/* Add other menu items */}
      
      <button className="upgrade-btn">
        {Icons.upgrade}
        Upgrade to Premium
      </button>

      <div className="user-profile">
        <div className="user-avatar">
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt="Profile" />
          ) : Icons.defaultAvatar}
        </div>
        <span>{currentUser?.displayName || currentUser?.email}</span>
      </div>
    </div>
  );
};
