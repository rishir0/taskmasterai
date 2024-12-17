import React from 'react';
// import { Logo } from './Logo'; // Uncomment if you have a Logo component

export function Dashboard() {
  return (
    <div className="container">
      <button className="sidebar-toggle">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="sidebar">
        <div className="logo" onClick={() => window.location.href='/'}>
          {/* <Logo /> If you have a Logo component */}
          TaskMaster AI
        </div>
        
        <div className="menu-item" onClick={() => window.location.href='/dashboard'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9L12 2L21 9V20C21 20.5304
                    20.7893 21.0391 20.4142 21.4142C20.0391 
                    21.7893 19.5304 22 19 22H5C4.46957 22 
                    3.96086 21.7893 3.58579 21.4142C3.21071 
                    21.0391 3 20.5304 3 20V9Z"/>
            <path d="M9 22V12H15V22"/>
          </svg>
          Dashboard
        </div>

        <div className="menu-item" onClick={() => window.location.href='/account.html'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 12C15 13.6569 13.6569 15 
                     12 15C10.3431 15 9 13.6569 9 12C9 
                     10.3431 10.3431 9 12 9C13.6569 9 15 
                     10.3431 15 12Z"/>
            <path d="M12.9046 3.06005C12.6988 3 
                     12.4659 3 12 3C11.5341 3 11.3012 
                     3 11.0954 3.06005C10.7942 3.14794 
                     10.5281 3.32808 10.3346 3.57511 
                     ..."/>
          </svg>
          Settings
        </div>

        <div className="menu-item toggle-night-mode" onClick={() => document.body.classList.toggle('night-mode')}>
          <div className="theme-icon">
            <svg id="theme-icon" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 
                       6.31412L5.5 5.5M17.6859 
                       6.31412L18.5 5.5M6.31412 
                       17.69L5.5 18.5001M17.6859 
                       17.69L18.5 18.5001M21 
                       12H20M16 12C16 14.2091 14.2091 
                       16 12 16C9.79086 16 8 14.2091 8 
                       12C8 9.79086 9.79086 8 12 8C14.2091 
                       8 16 9.79086 16 12Z"/>
            </svg>
          </div>
          Theme
        </div>

        <div className="menu-item" onClick={() => window.location.href='/notes.html'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff">
            <path d="M20 14V7C20 5.34315 18.6569 
                     4 17 4H12M20 14L13.5 20M20 
                     14H15.5C14.3954 14 13.5 
                     14.8954 13.5 16V20M13.5 
                     20H7C5.34315 20 4 18.6569 
                     4 17V12"/>
            <path d="M7 4V7M7 10V7M7 7H4M7 
                     7H10"/>
          </svg>
          Notes
        </div>

        <div className="menu-item" onClick={() => window.location.href='/calendar.html'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff">
            <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 
                     12H13M16 12H18M6 15H8M11 
                     15H13M16 15H18M6 18H8M11 
                     18H13M16 18H18M6.2 21H17.8C18.9201 
                     21 19.4802 21 19.908 20.782C20.2843 
                     20.5903 20.5903 20.2843 20.782 
                     19.908C21 19.4802 21 18.9201 
                     21 17.8V8.2C21 7.07989 21 
                     6.51984 20.782 6.09202C20.5903 
                     5.71569 20.2843 5.40973 19.908 
                     5.21799C19.4802 5 18.9201 5 
                     17.8 5H6.2C5.0799 5 4.51984 5 
                     4.09202 5.21799C3.71569 5.40973 
                     3.40973 5.71569 3.21799 6.09202C3 
                     6.51984 3 7.07989 3 8.2V17.8C3 
                     18.9201 3 19.4802 3.21799 
                     19.908C3.40973 20.2843 3.71569 
                     20.5903 4.09202 20.782C4.51984 
                     21 5.07989 21 6.2 21Z"/>
          </svg>
          Calendar
        </div>

        <div className="menu-item" onClick={() => window.location.href='/friends.html'}>
          <svg viewBox="0 0 64 64" stroke="#ffffff" fill="none">
            <circle cx="29.22" cy="16.28" r="11.14"></circle>
            <path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,..."/>
            <circle cx="45.38" cy="46.92" r="11.94"></circle>
            <line x1="45.98" y1="39.8" x2="45.98" y2="53.8"></line>
            <line x1="38.98" y1="46.8" x2="52.98" y2="46.8"></line>
          </svg>
          Friends
        </div>

        <div className="menu-item" onClick={() => window.location.href='/coming-soon.html'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 164 164" width="74" height="74">
            <g transform="scale(2.75)"><path d="M11.63,37.02A20.1565..."/></g>
          </svg>
          Community
        </div>

        <div className="menu-item" onClick={() => window.location.href='/features.html'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          Distraction Control
        </div>

        <div className="menu-item" onClick={() => window.location.href='/workschedule.html'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98" fill="white" stroke="white">
            <path d="..."/>
          </svg>
          AI Chat Bot
        </div>

        <button className="upgrade-btn" onClick={() => window.location.href='/pricing.html'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8l10 14L22 8l-4-6H6L2 8z"/>
            <path d="M2 8h20"/>
            <path d="M12 2v20"/>
          </svg>
          Upgrade to Premium
        </button>

        <div className="user-profile" onClick={() => window.location.href='/account.html'}>
          <button className="account-button">
            <div className="user-avatar" id="smallProfilePictureContainer">
              {/* Default Avatar */}
              <svg id="defaultAvatar" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 ..."/>
              </svg>
            </div>
            <div id="username">Srinivas Bajin <span className="dev-tag">DEV</span></div>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="snowflakes"></div>
        <div className="dashboard-header">
          <h1>🌞 Good morning, <span id="displayName">Srinivas Bajin</span></h1>
          <p>"The way to get started is to quit talking and begin doing."</p>
        </div>

        {/* AI Summary Section */}
        <div id="ai-summary-section" className="header-section ai-assistant-section">
          <div className="ai-assistant-card">
            <h2>
              <div className="ai-generated-tag">
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" style={{width:'1.2em',height:'2em',verticalAlign:'middle'}}>
                  <path d="..."/>
                </svg>
                Your Smart Overview <span className="beta-tag">BETA</span> 
                <span style={{fontSize: '12px', color: '#777777', marginLeft: '10px'}}>
                  TaskMaster can make mistakes. Verify details.
                </span>
              </div>
            </h2>

            <div className="summary-section">
              <h3>👋 Welcome!</h3>
              <p>TaskMaster is ready to generate your Smart Overview. To get started, create a task, goal, project, or plan.</p>
            </div>
          </div>
        </div>

        {/* Productivity Section */}
        <div className="header-section productivity-section">
          <div className="productivity-stats">
            <h3>Your Productivity</h3>
            <p>✨ Nothing productive scheduled—why not get started? Create a task, goal, project, or plan to make the most of your time & stay productive! ✨</p>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="header-section deadlines-section">
          <div className="upcoming-deadlines">
            <h4>Upcoming Deadlines</h4>
            <ul id="deadlines-list">
              <li>No upcoming deadlines</li>
            </ul>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs">
          <li className="active"><a href="#tasks" className="tab-link">Tasks</a></li>
          <li><a href="#goals" className="tab-link">Goals</a></li>
          <li><a href="#projects" className="tab-link">Projects</a></li>
          <li><a href="#plans" className="tab-link">Plans</a></li>
        </ul>

        <div id="tasks-section" className="tab-content" style={{display: 'block'}}>
          <h2>Tasks</h2>
          <div className="goal-card">
            <div className="form-group">
              <input type="text" id="task-input" placeholder="Enter new task" />
              <button>Create Task</button>
              <input type="date" id="task-due-date" placeholder="Due date" />
            </div>
          </div>
          <div id="tasks-list"></div>
        </div>
      </div>

      {/* Timer Sidebar */}
      <div className="timer-sidebar">
        <div className="weather-section">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <h2 style={{margin:0}}>Today's Weather</h2>
            <span id="weather-emoji" style={{fontSize:'1.5rem'}}>☀️</span>
          </div>
          <p id="weather-info" style={{margin:'5px 0'}}>
            Lexington, South Carolina<br/>
            Sunny 🌞<br/>
            60.1°F (Feels like: 60.1°F) 🔥<br/>
            🌬 Wind: 5.6 mph<br/>
            💧 Humidity: 75%
          </p>
        </div>

        <div className="pomodoro-timer custom-timer">
          <div style={{display:'flex',alignItems:'center'}}>
            <h2 contentEditable={true} style={{flexGrow:1,margin:0}}>Pomodoro Timer</h2>
            <button id="add-timer">+</button>
          </div>
          <input type="text" id="timer" value="25:00" readOnly/>
          <div className="button-container">
            <button id="start">Start</button>
            <button id="pause">Pause</button>
            <button id="reset">Reset</button>
          </div>
        </div>

        <div id="custom-timers">
          <p>🎉 Looks like you have no current custom timers. To get started, just press the '+' button next to the Pomodoro timer and create your own! 🎉</p>
        </div>
      </div>
    </div>
  );
}
