import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  onTasksSnapshot,
  createTask,
  createGoal,
  createProject,
  createPlan,
  onGoalsSnapshot,
  onProjectsSnapshot,
  onPlansSnapshot,
  // onEventsSnapshot, etc. as needed
} from '../lib/dashboard-firebase';

// Example import for Logo component if you have one
// import { Logo } from './Logo'; 

export function Dashboard() {
  const { user } = useAuth();
  const [username, setUsername] = useState('Loading...');
  const [displayName, setDisplayName] = useState('Loading...');
  const [tasks, setTasks] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'goals' | 'projects' | 'plans'>('tasks');
  
  const [taskInput, setTaskInput] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  
  const [goalInput, setGoalInput] = useState('');
  const [goalDueDate, setGoalDueDate] = useState('');
  
  const [projectInput, setProjectInput] = useState('');
  const [projectDueDate, setProjectDueDate] = useState('');
  
  const [planInput, setPlanInput] = useState('');
  const [planDueDate, setPlanDueDate] = useState('');

  // States for AI summary & weather, productivity stats, etc.
  const [aiSections, setAiSections] = useState([
    { title: 'Loading...', content: 'Loading...' },
    { title: 'Loading...', content: 'Loading...' },
    { title: 'Loading...', content: 'Loading...' },
    { title: 'Loading...', content: 'Loading...' },
  ]);
  const [weatherInfo, setWeatherInfo] = useState('Loading your weather...');
  const [weatherEmoji, setWeatherEmoji] = useState('🌤️');

  // Example: load user info and display name
  useEffect(() => {
    if (user) {
      // Fetch user info from Firestore (use a function from dashboard-firebase if available)
      // For now, let's just set displayName = user.email
      setDisplayName(user.displayName || user.email || 'User');
      setUsername(user.displayName || user.email || 'User');
      
      // Subscribe to tasks
      const unsubTasks = onTasksSnapshot(user.uid, (fetchedTasks) => {
        setTasks(fetchedTasks);
      });
      
      const unsubGoals = onGoalsSnapshot(user.uid, (fetchedGoals) => {
        setGoals(fetchedGoals);
      });
      
      const unsubProjects = onProjectsSnapshot(user.uid, (fetchedProjects) => {
        setProjects(fetchedProjects);
      });
      
      const unsubPlans = onPlansSnapshot(user.uid, (fetchedPlans) => {
        setPlans(fetchedPlans);
      });
      
      return () => {
        unsubTasks();
        unsubGoals();
        unsubProjects();
        unsubPlans();
      };
    }
  }, [user]);

  const handleCreateTask = async () => {
    if (!user) return;
    await createTask(taskInput, taskDueDate ? new Date(taskDueDate) : null, user.uid);
    setTaskInput('');
    setTaskDueDate('');
  };

  const handleCreateGoal = async () => {
    if (!user) return;
    await createGoal(goalInput, goalDueDate ? new Date(goalDueDate) : null, user.uid);
    setGoalInput('');
    setGoalDueDate('');
  };

  const handleCreateProject = async () => {
    if (!user) return;
    await createProject(projectInput, projectDueDate ? new Date(projectDueDate) : null, user.uid);
    setProjectInput('');
    setProjectDueDate('');
  };

  const handleCreatePlan = async () => {
    if (!user) return;
    await createPlan(planInput, planDueDate ? new Date(planDueDate) : null, user.uid);
    setPlanInput('');
    setPlanDueDate('');
  };

  const openTab = (tabName: 'tasks' | 'goals' | 'projects' | 'plans') => {
    setActiveTab(tabName);
  };

  // Placeholder for toggling night mode
  const toggleNightMode = () => {
    document.body.classList.toggle('night-mode');
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Logo */}
        <div className="logo" onClick={() => window.location.href = '/'}>
          {/* If you have a Logo component */}
          {/* <Logo /> */}
          TaskMaster AI
        </div>

        <div className="menu-item" onClick={() => window.location.href='/dashboard'}>
          {/* Dashboard icon */}
          <svg /* ... */></svg>
          Dashboard
        </div>

        <div className="menu-item" onClick={() => window.location.href='/account.html'}>
          {/* Settings icon */}
          <svg /* ... */></svg>
          Settings
        </div>

        <div className="menu-item toggle-night-mode" onClick={toggleNightMode}>
          <div className="theme-icon">
            <svg id="theme-icon" /* ... */></svg>
          </div>
          Theme
        </div>

        <div className="menu-item" onClick={() => window.location.href='/notes.html'}>
          {/* Notes icon */}
          <svg /* ... */></svg>
          Notes
        </div>

        <div className="menu-item" onClick={() => window.location.href='/calendar.html'}>
          {/* Calendar icon */}
          <svg /* ... */></svg>
          Calendar
        </div>

        <div className="menu-item" onClick={() => window.location.href='/friends.html'}>
          {/* Friends icon */}
          <svg /* ... */></svg>
          Friends
        </div>

        <div className="menu-item" onClick={() => window.location.href='/coming-soon.html'}>
          {/* Community icon */}
          <svg /* ... */></svg>
          Community
        </div>

        <div className="menu-item" onClick={() => window.location.href='/features.html'}>
          {/* Distraction Control icon */}
          <svg /* ... */></svg>
          Distraction Control
        </div>

        <div className="menu-item" onClick={() => window.location.href='/workschedule.html'}>
          {/* AI Chat Bot icon */}
          <svg /* ... */></svg>
          AI Chat Bot
        </div>

        <button className="upgrade-btn" onClick={() => window.location.href='/pricing.html'}>
          <svg /* ... */></svg>
          Upgrade to Premium
        </button>

        <div className="user-profile" onClick={() => window.location.href='/account.html'}>
          <button className="account-button">
            <div className="user-avatar" id="smallProfilePictureContainer">
              {/* Profile picture logic could go here */}
            </div>
            <div id="username">{username}</div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Good morning, <span id="displayName">{displayName}</span></h1>
          <p>"The way to get started is to quit talking and begin doing."</p>
        </div>

        {/* AI Summary Section */}
        <div id="ai-summary-section" className="header-section ai-assistant-section">
          <div className="ai-assistant-card">
            <h2>
              <div className="ai-generated-tag">
                <svg className="icon" /* ... */></svg>
                Your Smart Overview <span className="beta-tag">BETA</span>
                <span style={{ fontSize: '12px', color: '#777777', marginLeft: '10px' }}>
                  TaskMaster can make mistakes. Verify details.
                </span>
              </div>
            </h2>

            {aiSections.map((section, idx) => (
              <div key={idx} className="summary-section">
                <h3>{section.title}</h3>
                <div className="section-content">{section.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity Section */}
        <div className="header-section productivity-section">
          <div className="productivity-stats">
            <h3>Your Productivity</h3>
            <p>✨ Nothing productive scheduled—why not get started?</p>
            {/* Replace with actual productivity data once available */}
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

        {/* Tabs for Tasks/Goals/Projects/Plans */}
        <ul className="nav nav-tabs">
          <li className={activeTab === 'tasks' ? 'active' : ''}>
            <a onClick={() => openTab('tasks')} className="tab-link">Tasks</a>
          </li>
          <li className={activeTab === 'goals' ? 'active' : ''}>
            <a onClick={() => openTab('goals')} className="tab-link">Goals</a>
          </li>
          <li className={activeTab === 'projects' ? 'active' : ''}>
            <a onClick={() => openTab('projects')} className="tab-link">Projects</a>
          </li>
          <li className={activeTab === 'plans' ? 'active' : ''}>
            <a onClick={() => openTab('plans')} className="tab-link">Plans</a>
          </li>
        </ul>

        {/* Tasks Section */}
        {activeTab === 'tasks' && (
          <div id="tasks-section" className="tab-content active">
            <h2>Tasks</h2>
            <div className="form-group">
              <input
                type="text"
                id="task-input"
                placeholder="Enter new task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <button onClick={handleCreateTask}>Create Task</button>
              <input
                type="date"
                id="task-due-date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </div>
            <div id="tasks-list">
              {tasks.map((task) => (
                <div key={task.id} className="task-item">
                  <span>{task.task}</span>
                  {/* Add edit/delete/complete buttons as needed */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals Section */}
        {activeTab === 'goals' && (
          <div id="goals-section" className="tab-content active">
            <h2>Goals</h2>
            <div className="form-group">
              <input
                type="text"
                id="goal-input"
                placeholder="Enter new goal"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
              />
              <button onClick={handleCreateGoal}>Create Goal</button>
              <input
                type="date"
                id="goal-due-date"
                value={goalDueDate}
                onChange={(e) => setGoalDueDate(e.target.value)}
              />
            </div>
            <div id="goals-list">
              {goals.map((goal) => (
                <div key={goal.id} className="goal-item">
                  <span>{goal.goal}</span>
                  {/* Add edit/delete/complete buttons */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <div id="projects-section" className="tab-content active">
            <h2>Projects</h2>
            <div className="form-group">
              <input
                type="text"
                id="project-input"
                placeholder="Enter new project"
                value={projectInput}
                onChange={(e) => setProjectInput(e.target.value)}
              />
              <button onClick={handleCreateProject}>Create Project</button>
              <input
                type="date"
                id="project-due-date"
                value={projectDueDate}
                onChange={(e) => setProjectDueDate(e.target.value)}
              />
            </div>
            <div id="projects-list">
              {projects.map((proj) => (
                <div key={proj.id} className="project-item">
                  <span>{proj.project}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plans Section */}
        {activeTab === 'plans' && (
          <div id="plans-section" className="tab-content active">
            <h2>Plans</h2>
            <div className="form-group">
              <input
                type="text"
                id="plan-input"
                placeholder="Enter new plan"
                value={planInput}
                onChange={(e) => setPlanInput(e.target.value)}
              />
              <button onClick={handleCreatePlan}>Create Plan</button>
              <input
                type="date"
                id="plan-due-date"
                value={planDueDate}
                onChange={(e) => setPlanDueDate(e.target.value)}
              />
            </div>
            <div id="plans-list">
              {plans.map((plan) => (
                <div key={plan.id} className="plan-item">
                  <span>{plan.plan}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Timer Sidebar */}
      <div className="timer-sidebar">
        <div className="weather-section">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0 }}>Today's Weather</h2>
            <span id="weather-emoji" style={{ fontSize: '1.5rem' }}>{weatherEmoji}</span>
          </div>
          <p id="weather-info" style={{ margin: '5px 0' }}>{weatherInfo}</p>
        </div>

        <div className="pomodoro-timer custom-timer">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 contentEditable={true} style={{ flexGrow: 1, margin: 0 }}>Pomodoro Timer</h2>
            <button id="add-timer">+</button>
          </div>
          <input type="text" id="timer" value="25:00" readOnly />
          <div className="button-container">
            <button id="start">Start</button>
            <button id="pause">Pause</button>
            <button id="reset">Reset</button>
          </div>
        </div>

        <div id="custom-timers">
          {/* Custom timers would be listed here */}
          <p>⏰ Looks like you have no current custom timers. To get started, just press the '+' button next to the Pomodoro timer and create your own! ⏰</p>
        </div>
      </div>
    </div>
  );
}
