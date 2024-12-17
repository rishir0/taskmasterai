import React from 'react';
import { Home, Settings, Palette, StickyNote, Calendar, Users, Globe, Zap, Cpu, Gem, User } from 'lucide-react';
// Import your Logo component
import { Logo } from './Logo';

export function Dashboard() {
  return (
    <div className="container">
      <div className="sidebar" style={styles.sidebar}>
        <div className="logo-container" style={styles.logoContainer}>
          <Logo style={styles.logoIcon} />
          <span style={styles.logoText}>TaskMaster AI</span>
        </div>
        
        <div className="menu" style={styles.menu}>
          <div className="menu-item" style={styles.menuItem}>
            <Home style={styles.icon} />
            <span>Dashboard</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <Settings style={styles.icon} />
            <span>Settings</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <Palette style={styles.icon} />
            <span>Theme</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <StickyNote style={styles.icon} />
            <span>Notes</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <Calendar style={styles.icon} />
            <span>Calendar</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <Users style={styles.icon} />
            <span>Friends</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <Globe style={styles.icon} />
            <span>Community</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <Zap style={styles.icon} />
            <span>Distraction Control</span>
          </div>

          <div className="menu-item" style={styles.menuItem}>
            <Cpu style={styles.icon} />
            <span>AI Chat Bot</span>
          </div>
        </div>

        <button className="upgrade-btn" style={styles.upgradeBtn}>
          <Gem style={styles.icon} />
          <span>Upgrade to Premium</span>
        </button>
        
        <div className="user-profile" style={styles.userProfile}>
          <User style={styles.icon} />
          <span>User Name</span>
        </div>
      </div>
    </div>
  );
}

// Inline styles for simplicity; adapt as needed
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#121212', 
    fontFamily: 'Poppins, sans-serif',
    color: '#F8F9FA',
  },
  sidebar: {
    width: '250px',
    background: '#1E1E1E',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
    gap: '20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
  },
  logoIcon: {
    marginRight: '10px',
  },
  logoText: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#6C63FF',
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    flexGrow: 1,
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#F8F9FA',
    gap: '10px',
  },
  icon: {
    width: '20px',
    height: '20px',
  },
  upgradeBtn: {
    background: 'linear-gradient(45deg, #F50057, #FF1493)',
    color: '#F8F9FA',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '50px',
    cursor: 'pointer',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userProfile: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#F8F9FA',
    cursor: 'pointer',
  },
};
