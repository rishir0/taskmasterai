import React, { useState, useEffect } from 'react';
import { fetchTasks } from './dashboardfirebase'; // Import the function from your Firebase component
import './Dashboard.css'; // Import your external CSS file

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component mounts
    const getTasks = async () => {
      const tasksData = await fetchTasks(); // Call the fetchTasks function from Firebase component
      setTasks(tasksData);
    };

    getTasks();
  }, []);

  return (
    <div className="dashboard-container">
    <button class="sidebar-toggle">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
    <div class="container">
        <div class="sidebar">
            <div class="logo" onclick="window.location.href='index.html'">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 19.83 4.17 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM9.97 14.9L7.72 17.15C7.57 17.3 7.38 17.37 7.19 17.37C7 17.37 6.8 17.3 6.66 17.15L5.91 16.4C5.61 16.11 5.61 15.63 5.91 15.34C6.2 15.05 6.67 15.05 6.97 15.34L7.19 15.56L8.91 13.84C9.2 13.55 9.67 13.55 9.97 13.84C10.26 14.13 10.26 14.61 9.97 14.9ZM9.97 7.9L7.72 10.15C7.57 10.3 7.38 10.37 7.19 10.37C7 10.37 6.8 10.3 6.66 10.15L5.91 9.4C5.61 9.11 5.61 8.63 5.91 8.34C6.2 8.05 6.67 8.05 6.97 8.34L7.19 8.56L8.91 6.84C9.2 6.55 9.67 6.55 9.97 6.84C10.26 7.13 10.26 7.61 9.97 7.9ZM17.56 16.62H12.31C11.9 16.62 11.56 16.28 11.56 15.87C11.56 15.46 11.9 15.12 12.31 15.12H17.56C17.98 15.12 18.31 15.46 18.31 15.87C18.31 16.28 17.98 16.62 17.56 16.62ZM17.56 9.62H12.31C11.9 9.62 11.56 9.28 11.56 8.87C11.56 8.46 11.9 8.12 12.31 8.12H17.56C17.98 8.12 18.31 8.46 18.31 8.87C18.31 9.28 17.98 9.62 17.56 9.62Z" fill="currentColor"></path>
                    </g>
                </svg>
                TaskMaster AI
            </div>
            <div class="menu-item" onclick="window.location.href='dashboard.html'">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Dashboard
            </div>
             <div class="menu-item" onclick="window.location.href='account.html'">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                Settings
            </div>
            <div class="menu-item toggle-night-mode" onclick="toggleNightMode()">
                <div class="theme-icon">
                    <svg id="theme-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                Theme
            </div>
             <div class="menu-item" onclick="window.location.href='notes.html'">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 4V7M7 10V7M7 7H4M7 7H10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                Notes
            </div>
            <div class="menu-item" onclick="window.location.href='calendar.html'">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                Calendar
            </div>
            <div class="menu-item" onclick="window.location.href='friends.html'">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="4.672" stroke="#ffffff" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="29.22" cy="16.28" r="11.14"></circle><path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9"></path><circle cx="45.38" cy="46.92" r="11.94"></circle><line x1="45.98" y1="39.8" x2="45.98" y2="53.8"></line><line x1="38.98" y1="46.8" x2="52.98" y2="46.8"></line></g></svg>
                Friends
            </div>
            <div class="menu-item" onclick="window.location.href='coming-soon.html'">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164 164" x="0px" y="0px" fill="#ffffff" width="74" height="74" style="margin-right: 8px;">
    <g transform="scale(2.75)"> <!-- Scaling the actual SVG content -->
        <path d="M11.63,37.02A20.1565,20.1565,0,0,1,11.04,32.82H22.59A56.55887,56.55887,0,0,0,22.97,38.8,25.89175,25.89175,0,0,0,18.58,40.53,6.1486,6.1486,0,0,0,11.63,37.02ZM19.11,42.45a5.88844,5.88844,0,0,1-.3,2.67A9.91165,9.91165,0,0,1,22.5,50.7a20.04038,20.04038,0,0,0,4.83,1.75c-1.85-2.58-3.3-6.68005-4.09-11.67A22.112,22.112,0,0,0,19.11,42.45Zm8.22-30.9a20.9854,20.9854,0,0,0-11.78,7.44,18.31507,18.31507,0,0,0,7.69,4.23C24.03,18.23,25.48,14.13,27.33,11.55ZM22.97,25.2a21.16733,21.16733,0,0,1-8.56-4.62A20.757,20.757,0,0,0,11.06,30.82H22.59C22.63,28.86,22.76,26.98,22.97,25.2ZM32,24.45a31.61622,31.61622,0,0,0,6.82-.73c-2.701-17.05245-10.94371-17.03506-13.64,0A31.61622,31.61622,0,0,0,32,24.45Zm9.28-1.39a9.848,9.848,0,0,1,3.91-6.95,5.00891,5.00891,0,0,1-.17-.55,20.71311,20.71311,0,0,0-8.35-4.01c1.85,2.58,3.3,6.68,4.09,11.67C40.94,23.17,41.11,23.11,41.28,23.06Zm-2.2,2.64a34.10132,34.10132,0,0,1-14.16,0c-.18,1.61-.29,3.32-.33,5.12H39.41C39.37,29.02,39.26,27.31,39.08,25.7Zm2.33,5.12H52.94A20.53863,20.53863,0,0,0,52.37,26.96H44.24A3.00339,3.00339,0,0,1,41.45,25.07c-.14.04-.28.09-.42.13C41.24,26.98,41.37,28.86,41.41,30.82ZM24.92,38.3a34.10132,34.10132,0,0,1,14.16,0c.19-1.71.31-3.55.33-5.48H24.59C24.61,34.75,24.73,36.59,24.92,38.3ZM32,39.55a31.62006,31.62006,0,0,0-6.82.73c2.70094,17.05249,10.94373,17.0351,13.64,0A31.62006,31.62006,0,0,0,32,39.55Zm4.67,12.9a20.9854,20.9854,0,0,0,11.78-7.44,18.31512,18.31512,0,0,0-7.69-4.23C39.97,45.77,38.52,49.87,36.67,52.45ZM41.03,38.8a21.16726,21.16726,0,0,1,8.56,4.62,20.8109,20.8109,0,0,0,3.37-10.6H41.41A56.55887,56.55887,0,0,1,41.03,38.8ZM58.77,23.96a1.00291,1.00291,0,0,1-1,1H52.04c-2.17352.001-5.73834-.01069-7.8,0a.99286.99286,0,0,1-.89015-.56c-.52331-3.122,1.75543-6.38334,4.60017-7.57C45.431,14.26381,47.58273,9.77221,51,9.89A4.17084,4.17084,0,0,1,54.07,16.83,7.77635,7.77635,0,0,1,58.77,23.96ZM50.99991,16.2c2.95419.00217,2.72218-4.65995-.24991-4.29A2.15468,2.15468,0,0,0,50.99991,16.2ZM56.69,22.96c-1.14169-6.4101-10.38395-6.08342-11.36,0Zm-35.92,30a1.00291,1.00291,0,0,1-1,1c-1.58735.00006-6.43744,0-7.94,0H6.24a1.00291,1.00291,0,0,1-1-1,7.76949,7.76949,0,0,1,4.71-7.13,4.17685,4.17685,0,0,1,2.24992-6.87986c3.75273-.81649,6.53182,3.9936,3.95009,6.77988C18.77011,47.238,20.85191,49.76531,20.77,52.96ZM13,45.2c2.76954-.0062,2.8617-4.28654,0-4.31A2.15516,2.15516,0,0,0,13,45.2Zm5.69,6.76c-1.15159-6.29025-10.24749-6.25506-11.36,0Z"></path>
    </g>
</svg>

                Community
            </div>
            <div class="menu-item" onclick="window.location.href='features.html'">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                Distraction Control
            </div>
            <div class="menu-item" onclick="window.location.href='workschedule.html'">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98" fill="white" stroke="white" stroke-width="-2" stroke-linecap="round" stroke-linejoin="round">
 <path d="m90.137 60.492c-6.2344-1.7227-7.2422-2.7266-8.9609-8.9609-0.25-0.90234-1.0703-1.5273-2.0078-1.5273s-1.7578 0.625-2.0078 1.5273c-1.7227 6.2344-2.7266 7.2422-8.9609 8.9609-0.90234 0.25-1.5273 1.0703-1.5273 2.0078s0.625 1.7578 1.5273 2.0078c6.2344 1.7227 7.2422 2.7266 8.9609 8.9609 0.25 0.90234 1.0703 1.5273 2.0078 1.5273s1.7578-0.625 2.0078-1.5273c1.7227-6.2344 2.7266-7.2422 8.9609-8.9609 0.90234-0.25 1.5273-1.0703 1.5273-2.0078s-0.625-1.7578-1.5273-2.0078z"/>
 <path d="m72.918 14.582h-54.168c-5.7422 0-10.418 4.6719-10.418 10.418v35.418c0 5.7422 4.6719 10.418 10.418 10.418h10.418v12.5c0 0.80078 0.46094 1.5312 1.1797 1.8789 0.28906 0.13672 0.59766 0.20703 0.90234 0.20703 0.46484 0 0.92578-0.15625 1.3008-0.45703l17.637-14.129h21.641c-0.73828-1.1875-1.8633-1.5117-4.7461-2.3086-2.6992-0.74219-4.5859-3.2227-4.5859-6.0234 0-2.8008 1.8867-5.2773 4.5859-6.0234 3.1641-0.875 5.1797-2.8906 6.0547-6.0547 0.74219-2.6992 3.2227-4.5859 6.0234-4.5859 1.582 0 3.0469 0.61328 4.168 1.6211v-22.457c0-5.7422-4.6719-10.418-10.418-10.418zm-16.668 41.668h-33.332c-1.1484 0-2.082-0.93359-2.082-2.082 0-1.1484 0.93359-2.082 2.082-2.082h33.332c1.1484 0 2.082 0.93359 2.082 2.082 0 1.1484-0.93359 2.082-2.082 2.082zm12.5-12.5h-45.832c-1.1484 0-2.082-0.93359-2.082-2.082 0-1.1484 0.93359-2.082 2.082-2.082h45.832c1.1484 0 2.082 0.93359 2.082 2.082 0 1.1484-0.93359 2.082-2.082 2.082zm0-12.5h-45.832c-1.1484 0-2.082-0.93359-2.082-2.082 0-1.1484 0.93359-2.082 2.082-2.082h45.832c1.1484 0 2.082 0.93359 2.082 2.082 0 1.1484-0.93359 2.082-2.082 2.082z"/>
</svg>
    AI Chat Bot
</div>
            <button class="upgrade-btn" onclick="window.location.href='pricing.html'">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 8l10 14L22 8l-4-6H6L2 8z"/>
                    <path d="M2 8h20"/>
                    <path d="M12 2v20"/>
                  </svg>
                Upgrade to Premium
            </button>
<div class="user-profile" onclick="window.location.href='account.html'">
    <button class="account-button">
        <div class="user-avatar" id="smallProfilePictureContainer">
            <!-- SVG will be replaced with the profile picture -->
            <svg id="defaultAvatar" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C14.21 4 16 5.79 16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4ZM12 20C9.33 20 6.34 18.87 4.63 16.74C5.91 15.43 8.39 14.5 12 14.5C15.61 14.5 18.09 15.43 19.37 16.74C17.66 18.87 14.67 20 12 20Z" fill="currentColor"/>
            </svg>
        </div>
                <div id="username">Loading...</div>
                <div class="menu-dots">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
<div class="main-content">
    <div class="snowflakes">
        <!-- Snowflakes will be dynamically created here -->
    </div>
    <!-- Dashboard Header (left unchanged) -->
    <div class="dashboard-header">
        <h1>Loading..., <span id="displayName">Loading...</span></h1>
        <p>Loading...</p>
    </div>

<!-- AI Summary Section -->
<div id="ai-summary-section" class="header-section ai-assistant-section">
    <div class="ai-assistant-card">
        <h2>
            <div class="ai-generated-tag">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="-5.0 -10.0 110.0 135.0" style="width: 1.2em; height: 2em; vertical-align: middle;">
                    <path d="m74.773 57.645c-17.676 5.8398-23.562 11.727-29.402 29.402-0.48047 1.4531-2.5352 1.4531-3.0156 0-5.8398-17.676-11.727-23.562-29.402-29.402-1.4531-0.48047-1.4531-2.5352 0-3.0156 17.676-5.8398 23.562-11.727 29.402-29.402 0.48047-1.4531 2.5352-1.4531 3.0156 0 5.8398 17.676 11.727 23.562 29.402 29.402 1.4531 0.48047 1.4531 2.5352 0 3.0156z"/>
                    <path d="m87.594 28.617c-8.8359 2.918-11.781 5.8633-14.703 14.703-0.23828 0.72656-1.2656 0.72656-1.5078 0-2.918-8.8359-5.8633-11.781-14.703-14.703-0.72656-0.23828-0.72656-1.2656 0-1.5078 8.8359-2.918 11.781-5.8633 14.703-14.703 0.23828-0.72656 1.2656-0.72656 1.5078 0 2.918 8.8359 5.8633 11.781 14.703 14.703 0.72656 0.23828 0.72656 1.2656 0 1.5078z"/>
                </svg>
                Your Smart Overview <span class="beta-tag">BETA</span>   <span style="font-size: 12px; color: #777777; margin-left: 10px; display: inline-block; vertical-align: middle;">TaskMaster can make mistakes. Verify details.</span>
        </h2>

        <div class="summary-section">
            <h3>Loading...</h3>
            <p id="today-tasks-summary"> Loading...</p>
        </div>

        <div class="summary-section">
            <h3>Loading...</h3>
            <p id="upcoming-deadlines-summary">Loading...</p>
        </div>

        <div class="summary-section">
            <h3>Loading...</h3>
            <p id="priority-tasks-summary">Loading...</p>
        </div>

        <div class="summary-section">
            <h3>Loading...</h3>
            <p id="completed-tasks-summary">Loading...</p>
        </div>
    </div>
</div>





    <!-- Today's Productivity Section -->
    <div class="header-section productivity-section">
        <div class="productivity-stats">
            <h3>Your Productivity</h3>

            <!-- Tasks Completed with Progress Bar -->
            <p>Loading... <span id="tasks-completed">Loading...</span> / Loading...</p>
            <div class="progress-bar">
                <div id="tasks-progress" class="progress-fill" style="width: 0%;"></div>
            </div>

            <!-- Pomodoros Completed with Progress Bar -->
            <p>Loading... <span id="pomodoros-completed">Loading...</span> / Loading...</p>
            <div class="progress-bar">
                <div id="pomodoro-progress" class="progress-fill" style="width: 0%;"></div>
            </div>

            <!-- Goals Achieved with Progress Bar -->
            <p>Loading... <span id="goals-achieved">Loading...</span> / Loading...</p>
            <div class="progress-bar">
                <div id="goals-progress" class="progress-fill" style="width: 0%;"></div>
            </div>
        </div>
    </div>

    <!-- Upcoming Deadlines Section -->
    <div class="header-section deadlines-section">
        <div class="upcoming-deadlines">
            <h4>Upcoming Deadlines</h4>
            <ul id="deadlines-list">
                <li>Loading...</li>
            </ul>
        </div>
    </div>



    <!-- Tab Navigation for Tasks, Goals, Projects, Plans -->
    <ul class="nav nav-tabs">
        <li class="active"><a href="#tasks" class="tab-link" onclick="openTab(event, 'tasks-section')">Tasks</a></li>
        <li><a href="#goals" class="tab-link" onclick="openTab(event, 'goals-section')">Goals</a></li>
        <li><a href="#projects" class="tab-link" onclick="openTab(event, 'projects-section')">Projects</a></li>
        <li><a href="#plans" class="tab-link" onclick="openTab(event, 'plans-section')">Plans</a></li>
    </ul>

    <!-- Content for Tabs -->
    <div id="tasks-section" class="tab-content">
        <div class="tasks-section collapsible">
            <h2>Tasks</h2>
            <div class="goal-card">
                <div class="form-group">
                    <input type="text" id="task-input" placeholder="Enter new task">
                    <button onclick="createTask()">Create Task</button>
                    <input type="date" id="task-due-date" placeholder="Due date">
                </div>
            </div>
            <div id="tasks-list"></div>
        </div>
    </div>

    <div id="goals-section" class="tab-content" style="display: none;">
        <div class="goals-section collapsible">
            <h2>Goals</h2>
            <div class="goal-card">
                <div class="form-group">
                    <input type="text" id="goal-input" placeholder="Enter new goal">
                    <button onclick="createGoal()">Create Goal</button>
                    <input type="date" id="goal-due-date" placeholder="Due date">
                </div>
            </div>
            <div id="goals-list"></div>
        </div>
    </div>

    <div id="projects-section" class="tab-content" style="display: none;">
        <div class="projects-section collapsible">
            <h2>Projects</h2>
            <div class="goal-card">
                <div class="form-group">
                    <input type="text" id="project-input" placeholder="Enter new project">
                    <button onclick="createProject()">Create Project</button>
                    <input type="date" id="project-due-date" placeholder="Due date">
                </div>
            </div>
            <div id="projects-list"></div>
        </div>
    </div>

    <div id="plans-section" class="tab-content" style="display: none;">
        <div class="plans-section collapsible">
            <h2>Plans</h2>
            <div class="goal-card">
                <div class="form-group">
                    <input type="text" id="plan-input" placeholder="Enter new plan">
                    <button onclick="createPlan()">Create Plan</button>
                    <input type="date" id="plan-due-date" placeholder="Due date">
                </div>
            </div>
            <div id="plans-list"></div>
        </div>
    </div>
</div>





<!-- Timer Sidebar -->
<div class="timer-sidebar">

    <!-- Weather Section -->
    <div class="weather-section">
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <h2 style="margin: 0;">Today's Weather</h2>
            <span id="weather-emoji" style="font-size: 1.5rem;">🌤️</span>
        </div>
        <p id="weather-info" style="margin: 5px 0;">Loading your weather...</p>
    </div>

    <!-- Pomodoro Timer Section -->
    <div class="pomodoro-timer custom-timer">
        <div style="display: flex; align-items: center;">
            <h2 contenteditable="true" style="flex-grow: 1; margin: 0;">Pomodoro Timer</h2>
            <button id="add-timer">+</button>
        </div>
        <input type="text" id="timer" value="25:00" readonly>
        <div class="button-container">
            <button id="start">Start</button>
            <button id="pause">Pause</button>
            <button id="reset">Reset</button>
        </div>
    </div>

    <div id="custom-timers"></div>
</div>



<!-- Edit Modal -->
<div id="edit-modal" class="edit-modal">
    <div class="edit-modal-content">
        <span class="close" onclick="closeEditModal()">&times;</span>
        <h2>Edit <span id="edit-item-type"></span></h2>
        <input type="text" id="edit-input" placeholder="Enter new value">
        
        <!-- Date input for editing the due date -->
        <label for="edit-date">Edit Due Date:</label>
        <input type="date" id="edit-date" placeholder="Select new date">
        
        <button onclick="saveEdit()">Save</button>
    </div>
</div>
  );
}

export default Dashboard;
