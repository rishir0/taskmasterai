import React from 'react';
import { Home, Settings, Palette, StickyNote, Calendar, Users, Globe, Zap, Cpu, Gem, User } from 'lucide-react';
// Import your Logo component
import { Logo } from './Logo';

export function Dashboard() {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <Logo style={styles.logoIcon} />
        </div>
        
        <div style={styles.menu}>
          <div style={styles.menuItem}>
            <Home style={styles.icon} />
            <span>Dashboard</span>
          </div>

          <div style={styles.menuItem}>
            <Settings style={styles.icon} />
            <span>Settings</span>
          </div>

          <div style={styles.menuItem}>
            <Palette style={styles.icon} />
            <span>Theme</span>
          </div>

          <div style={styles.menuItem}>
            <StickyNote style={styles.icon} />
            <span>Notes</span>
          </div>

          <div style={styles.menuItem}>
            <Calendar style={styles.icon} />
            <span>Calendar</span>
          </div>

          <div style={styles.menuItem}>
            <Users style={styles.icon} />
            <span>Friends</span>
          </div>

          <div style={styles.menuItem}>
            <Globe style={styles.icon} />
            <span>Community</span>
          </div>

          <div style={styles.menuItem}>
            <Zap style={styles.icon} />
            <span>Distraction Control</span>
          </div>

          <div style={styles.menuItem}>
            <Cpu style={styles.icon} />
            <span>AI Chat Bot</span>
          </div>
        </div>

        <button style={styles.upgradeBtn}>
          <Gem style={styles.icon} />
          <span>Upgrade to Premium</span>
        </button>
        
        <div style={styles.userProfile}>
          <User style={styles.icon} />
          <span>User Name</span>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#121212', 
    fontFamily: 'Poppins, sans-serif',
    color: '#F8F9FA',
  },
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
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
