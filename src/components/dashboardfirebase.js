// dashboardfirebase.js

// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration (same as in your old script)
const firebaseConfig = {
  apiKey: "AIzaSyDaMAlQRMXiDsZ4P0b06P18id3y5xBiZ1k",
  authDomain: "deepworkai-c3419.firebaseapp.com",
  projectId: "deepworkai-c3419",
  storageBucket: "deepworkai-c3419.appspot.com",
  messagingSenderId: "367439182644",
  appId: "1:367439182644:web:304216430df97eff68c361"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore
const auth = getAuth(app);  // Initialize Auth

// Function to fetch tasks from Firestore
export const fetchTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));  // Get tasks from Firestore
    const tasks = querySnapshot.docs.map(doc => doc.data());
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// You can add other Firebase functions like authentication, user updates, etc. here.
let inactivityTimeout;
let isUserOffline = false;

function setUserOnlineStatus(status) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const currentUserUID = currentUser.uid;
        
        db.collection('users').doc(currentUserUID).update({
            online: status
        }).then(() => {
            
            isUserOffline = !status; // Update isUserOffline based on the new status
        }).catch((error) => {
            console.error('Error updating online status: ', error);
        });
    } else {
        console.error('No current user is logged in.'); // Log if currentUser is null
    }
}

function updateUserStatusOnInteraction() {
    if (isUserOffline) {
        setUserOnlineStatus(true); // Set status to true if user is offline
    }
    clearTimeout(inactivityTimeout); // Clear previous timeout
    inactivityTimeout = setTimeout(() => {
        setUserOnlineStatus(false); // Set status to false after 2 minutes of inactivity
    }, 120000); // 2 minutes 
}

// Bind the interaction function to all necessary events
window.addEventListener('click', updateUserStatusOnInteraction);
window.addEventListener('keydown', updateUserStatusOnInteraction);
window.addEventListener('scroll', updateUserStatusOnInteraction);

// Initialize user's online status to true when the page loads
function initializeUserStatus() {
    if (firebase.auth().currentUser) {
        setUserOnlineStatus(true); // Set status to true when the page loads or reloads
        updateUserStatusOnInteraction(); // Set up inactivity timeout
    }
}


// Update status to offline when the page is unloaded
window.addEventListener('beforeunload', () => {
    if (firebase.auth().currentUser) {
        setUserOnlineStatus(true); // Set status to false when the user leaves
    }
});


document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // Update the UI with the user's display name
            const username = user.displayName || user.email;
            document.getElementById('username').textContent = username;
            document.getElementById('displayName').textContent = username;

            // Set Firestore online status to true and update last seen
            db.collection('users').doc(user.uid).set({
                online: true,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true }).then(() => {
                console.log('User online status updated to true');
            }).catch((error) => {
                console.error('Error updating online status:', error);
            });

            // Keep the user online even when switching tabs except for specific pages
            document.addEventListener('visibilitychange', function() {
                const excludedPages = [
                    'https://www.taskmaster.one/account', 
                    'https://www.taskmaster.one/notes', 
                    'https://www.taskmaster.one/calendar', 
                    'https://www.taskmaster.one/friends', 
                    'https://www.taskmaster.one/dashboard', 
                    'https://www.taskmaster.one/features', 
                    'https://www.taskmaster.one/workschedule', 
                    'https://www.taskmaster.one/metrics'
                ];

                // Check if the current page URL is in the list of excluded pages
                const currentPage = window.location.pathname.split('/').pop();
                
                if (document.visibilityState === 'visible' && !excludedPages.includes(currentPage)) {
                    db.collection('users').doc(user.uid).set({
                        online: true,
                        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
                    }, { merge: true }).then(() => {
                        console.log('User came back online');
                    });
                }
            });

            // Load other app-specific data
            loadTasks();
            loadProjects();
            loadGoals();
            loadPlans();

            // Display greeting after user information is loaded
            displayGreeting(username); // Pass the username to the greeting function
        } else {
            // No user is signed in, redirect to login page
            window.location.href = "login.html";
        }
    });
});

function updateDisplayNameIfAnonymous() {
    const user = firebase.auth().currentUser;

    if (user) {
        // Fetch user data from Firestore
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    const displayName = user.displayName;
                    const firstName = userData.firstName;
                    const lastName = userData.lastName;

                    // Check if displayName is "Anonymous"
                    if (displayName === "Anonymous" && firstName && lastName) {
                        // Update the displayName to "FirstName LastName"
                        const newDisplayName = `${firstName} ${lastName}`;

                        user.updateProfile({
                            displayName: newDisplayName
                        }).then(function() {
                            // Update the Firestore document with the new displayName
                            return db.collection('users').doc(user.uid).update({
                                displayName: newDisplayName
                            });
                        }).then(function() {
                            console.log("Display name updated successfully!");
                        }).catch(function(error) {
                            console.error("Error updating display name:", error);
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }
}


document.addEventListener('DOMContentLoaded', function() {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            const devEmails = ['srinibaj10@gmail.com', 'fugegate@gmail.com', 'draco77654@gmail.com', 'bajinsrinivasr@lexington1.net', 'achallapureddy@gmail.com'];

            // Fetch the current user's data from Firestore
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        const userEmail = user.email;
                        const isDev = devEmails.includes(userEmail);
                        let displayName = user.displayName || user.email;

                        // Create the updated display name with "DEV" or "BASIC" tag if necessary
                        let newDisplayName = displayName;
                        let shouldUpdateFirestore = false;

                        if (isDev && !displayName.includes('<span class="dev-tag">DEV</span>')) {
                            newDisplayName += ' <span class="dev-tag">DEV</span>';
                            shouldUpdateFirestore = true;  // Mark to update Firestore
                        } else if (!isDev && !displayName.includes('<span class="basic-tag">Basic</span>')) {
                            newDisplayName += ' <span class="basic-tag">Basic</span>';
                        }

                        // Update the UI with the user's display name (safely with innerHTML)
                        document.getElementById('username').innerHTML = newDisplayName;

                        // Optionally update the Firestore document if the "DEV" tag was added or updated
                        if (shouldUpdateFirestore) {
                            return db.collection('users').doc(user.uid).update({
                                displayName: newDisplayName
                            }).then(() => {
                                console.log("Display name updated to include 'DEV' tag successfully!");
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    });
});



 
let timer;
let isRunning = false;
let timeLeft = 1500; // 25 min as default
const sound = new Audio('https://firebasestorage.googleapis.com/v0/b/deepworkai-c3419.appspot.com/o/ios-17-ringtone-tilt-gg8jzmiv_pUhS32fz.mp3?alt=media&token=a0a522e0-8a49-408a-9dfe-17e41d3bc801');
sound.loop = true;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const addButton = document.getElementById('add-timer');
const customTimersDiv = document.getElementById('custom-timers');
let customTimerCount = 0; // Track the number of custom timers

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            sound.play();  // Play the sound when the timer ends
        }
    }, 1000);
}


function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 1500; // Reset to 25 minutes
    updateDisplay();
    sound.pause();  // Stop the sound
    sound.currentTime = 0;  // Reset the sound to the beginning
}


function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.value = `${hours}:${minutes}:${seconds}`;
}

// Utility function to format time
function formatTime(seconds) { 
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}

// Add a custom timer from Firestore (to load on page reload)
function addCustomTimerFromFirestore(timerId, name, time) {
    const customTimerDiv = document.createElement('div');
    customTimerDiv.classList.add('custom-timer');

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';

    const title = document.createElement('h2');
    title.contentEditable = true;
    title.innerText = name;
    title.style.flexGrow = '1';
    title.style.margin = '0';

    const removeButton = document.createElement('button');
    removeButton.innerText = '-';
    removeButton.classList.add('remove-timer');

    header.appendChild(title);
    header.appendChild(removeButton);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = formatTime(time);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const startButton = document.createElement('button');
    startButton.innerText = 'Start';
    startButton.classList.add('start');

    const pauseButton = document.createElement('button');
    pauseButton.innerText = 'Pause';
    pauseButton.classList.add('pause');

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset';
    resetButton.classList.add('reset');

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.classList.add('save');

    customTimerDiv.appendChild(header);
    customTimerDiv.appendChild(input);
    customTimerDiv.appendChild(buttonContainer);
    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(pauseButton);
    buttonContainer.appendChild(resetButton);
    buttonContainer.appendChild(saveButton);

    customTimersDiv.appendChild(customTimerDiv);
    customTimerCount++;

    let customTimeLeft = time;  // Initialize with the time loaded from Firestore
    let customTimer;
    let isCustomRunning = false;

function startCustomTimer() {
    if (isCustomRunning) return;
    isCustomRunning = true;
    customTimer = setInterval(() => {
        customTimeLeft--;
        updateCustomDisplay();
        if (customTimeLeft <= 0) {
            clearInterval(customTimer);
            isCustomRunning = false;
            sound.play();  // Play the sound when the custom timer ends
        }
    }, 1000);
}


    function pauseCustomTimer() {
        clearInterval(customTimer);
        isCustomRunning = false;
    }

function resetCustomTimer() {
    clearInterval(customTimer);
    isCustomRunning = false;
    customTimeLeft = time;  // Reset to the original time from Firestore
    updateCustomDisplay();
    sound.pause();  // Stop the sound
    sound.currentTime = 0;  // Reset the sound to the beginning
}


    function saveCustomTimerTime() {
        if (validateAndParseInput()) {
            updateCustomTimerInFirestore(timerId, title.innerText, customTimeLeft);
        }
    }

    function updateCustomDisplay() {
        const hours = Math.floor(customTimeLeft / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((customTimeLeft % 3600) / 60).toString().padStart(2, '0');
        const seconds = (customTimeLeft % 60).toString().padStart(2, '0');
        input.value = `${hours}:${minutes}:${seconds}`;
    }

    function removeCustomTimer() {
        customTimersDiv.removeChild(customTimerDiv);
        deleteCustomTimerFromFirestore(timerId);
        customTimerCount--; // Decrement the custom timer count when a timer is removed
    }

    function editCustomTimer() {
        input.readOnly = !input.readOnly;
        if (!input.readOnly) {
            input.focus();
        } else {
            if (validateAndParseInput()) {
                updateCustomTimerInFirestore(timerId, title.innerText, customTimeLeft);
            }
        }
    }

    function validateAndParseInput() {
        const timeParts = input.value.split(':');
        if (timeParts.length !== 3) {
            alert('Invalid time format. Please use hh:mm:ss.');
            return false;
        }
        const [newHours, newMinutes, newSeconds] = timeParts.map(Number);
        if (isNaN(newHours) || isNaN(newMinutes) || isNaN(newSeconds) || newHours < 0 || newMinutes < 0 || newMinutes >= 60 || newSeconds < 0 || newSeconds >= 60) {
            alert('Invalid time values. Please ensure hours, minutes, and seconds are valid numbers, and minutes/seconds are less than 60.');
            return false;
        }
        customTimeLeft = (newHours * 3600) + (newMinutes * 60) + newSeconds;
        updateCustomDisplay();
        return true;
    }

    startButton.addEventListener('click', startCustomTimer);
    pauseButton.addEventListener('click', pauseCustomTimer);
    resetButton.addEventListener('click', resetCustomTimer);
    saveButton.addEventListener('click', saveCustomTimerTime);
    removeButton.addEventListener('click', removeCustomTimer);
    input.addEventListener('dblclick', editCustomTimer);
    title.addEventListener('blur', () => {
        updateCustomTimerInFirestore(timerId, title.innerText, customTimeLeft);
    });
}


 // Listen for real-time updates to custom timers
function loadCustomTimers() {
    const userId = firebase.auth().currentUser.uid;
    const customTimersContainer = document.getElementById('custom-timers');
    const defaultMessage = document.getElementById('default-message');

    db.collection('timers')
        .where('userId', '==', userId)
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
            if (!snapshot.empty) {
                // Remove default message if timers exist
                if (defaultMessage) {
                    defaultMessage.remove();
                }

                // Clear and update custom timers
                customTimersContainer.innerHTML = ''; 
                snapshot.forEach(doc => {
                    const timer = doc.data();
                    addCustomTimerFromFirestore(doc.id, timer.name, timer.time);
                });
            } else {
                // Show default message if no timers exist
                customTimersContainer.innerHTML = `
                    <p id="default-message" style="text-align: center; color: gray;">
                        ⏰ Looks like you have no current custom timers. To get started, just press the '+' button next to the Pomodoro timer and create your own! ⏰
                    </p>
                `;
            }
        }, error => {
            console.error('Error listening to custom timers:', error);
        });
}


// Save the custom timer to Firestore
function saveCustomTimerToFirestore(name, time) {
    const userId = firebase.auth().currentUser.uid;
    return db.collection('timers').add({
        name: name,
        time: time,
        userId: userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
        console.log('Custom timer saved with ID:', docRef.id);
        return docRef.id;
    }).catch((error) => {
        console.error('Error saving custom timer:', error);
    });
}

// Update the custom timer in Firestore
function updateCustomTimerInFirestore(timerId, name, time) {
    db.collection('timers').doc(timerId).update({
        name: name,
        time: time,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log('Custom timer updated');
    }).catch((error) => {
        console.error('Error updating custom timer:', error);
    });
}

// Delete the custom timer from Firestore
function deleteCustomTimerFromFirestore(timerId) {
    db.collection('timers').doc(timerId).delete().then(() => {
        console.log('Custom timer deleted');
    }).catch((error) => {
        console.error('Error deleting custom timer:', error);
    });
}


// Get the modal
const modal = document.getElementById('custom-alert-modal');
const alertMessage = document.getElementById('alert-message');
const span = document.getElementsByClassName('close')[0];

// Function to show the modal with a custom message
function showAlert(message) {
  alertMessage.textContent = message;
  modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners for main timer controls
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
addButton.addEventListener('click', () => {
  const name = `Custom Timer`;
  const time = 3600; // Default to 1 hour for new custom timers

  saveCustomTimerToFirestore(name, time).then((timerId) => {
    addCustomTimerFromFirestore(timerId, name, time);
  });
});

// Load existing custom timers on page load
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    loadCustomTimers();
  }
});



// Function to create a button container
function createButtonContainer() {
    const container = document.createElement('div');
    container.className = 'button-container';
    return container;
}

// Functions to create new tasks, projects, goals, and plans
function createTask() {
    const taskInput = document.getElementById('task-input');
    const taskDueDate = document.getElementById('task-due-date');
    const task = taskInput.value.trim();
    let dueDate = taskDueDate.value ? new Date(taskDueDate.value) : null;

    if (task) { // Allow task creation without a due date
        if (dueDate) {
            // Correct timezone offset issue and add one day
            dueDate.setHours(0, 0, 0, 0); // Normalize time to midnight
            dueDate.setDate(dueDate.getDate() + 1); // Increment due date by one day
        }

        db.collection('tasks').add({
            task: task,
            dueDate: dueDate, // Store the due date if provided
            userId: firebase.auth().currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(docRef => {
            console.log('Task created:', task);
            if (dueDate) {
                createTaskEvent(docRef.id, task, dueDate); // Create the event if due date exists
            }
        }).catch((error) => {
            console.error('Error creating task:', error);
        });

        taskInput.value = '';
        taskDueDate.value = ''; // Clear the date input after task creation
    }
}


async function createTaskEvent(taskId, taskTitle, dueDate) {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error("No user is signed in");
        return;
    }

    const taskEvent = {
        title: taskTitle,
        description: "task converted to event", // Description as requested
        day: dueDate.getDate(),
        month: dueDate.getMonth(),
        year: dueDate.getFullYear(),
        uid: user.uid,
        linkedTaskId: taskId, // Link task to event
        startTime: "", // No default start time
        endTime: "" // No default end time
    };

    try {
        await db.collection('events').add(taskEvent);
        console.log('Task event created:', taskEvent);
    } catch (error) {
        console.error('Error creating task event:', error);
    }
}

function correctDate(date) {
    const offset = date.getTimezoneOffset() * 60000; // Get timezone offset in milliseconds
    return new Date(date.getTime() - offset); // Adjust date to UTC
}

function createProject() {
    const projectInput = document.getElementById('project-input');
    const projectDueDate = document.getElementById('project-due-date'); // Assume there's a due date input for projects
    const project = projectInput.value.trim();
    let dueDate = projectDueDate.value ? new Date(projectDueDate.value) : null;

    if (project) {
        if (dueDate) {
            dueDate.setHours(0, 0, 0, 0); // Normalize to midnight
            dueDate.setDate(dueDate.getDate() + 1); // Increment by one day
        }

        db.collection('projects').add({
            project: project,
            dueDate: dueDate, // Store the due date if provided
            userId: firebase.auth().currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(docRef => {
            console.log('Project created:', project);
            if (dueDate) {
                createProjectEvent(docRef.id, project, dueDate); // Create event if due date exists
            }
        }).catch((error) => {
            console.error('Error creating project:', error);
        });

        projectInput.value = '';
        projectDueDate.value = ''; // Clear date input
    }
}

async function createProjectEvent(projectId, projectTitle, dueDate) {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error("No user is signed in");
        return;
    }

    const projectEvent = {
        title: projectTitle,
        description: "project converted to event",
        day: dueDate.getDate(),
        month: dueDate.getMonth(),
        year: dueDate.getFullYear(),
        uid: user.uid,
        linkedProjectId: projectId, // Link project to event
        startTime: "",
        endTime: ""
    };

    try {
        await db.collection('events').add(projectEvent);
        console.log('Project event created:', projectEvent);
    } catch (error) {
        console.error('Error creating project event:', error);
    }
}

function createGoal() {
    const goalInput = document.getElementById('goal-input');
    const goalDueDate = document.getElementById('goal-due-date'); // Assume there's a due date input for goals
    const goal = goalInput.value.trim();
    let dueDate = goalDueDate.value ? new Date(goalDueDate.value) : null;

    if (goal) {
        if (dueDate) {
            dueDate.setHours(0, 0, 0, 0); // Normalize to midnight
            dueDate.setDate(dueDate.getDate() + 1); // Increment by one day
        }

        db.collection('goals').add({
            goal: goal,
            dueDate: dueDate, // Store the due date if provided
            userId: firebase.auth().currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(docRef => {
            console.log('Goal created:', goal);
            if (dueDate) {
                createGoalEvent(docRef.id, goal, dueDate); // Create event if due date exists
            }
        }).catch((error) => {
            console.error('Error creating goal:', error);
        });

        goalInput.value = '';
        goalDueDate.value = ''; // Clear date input
    }
}

async function createGoalEvent(goalId, goalTitle, dueDate) {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error("No user is signed in");
        return;
    }

    const goalEvent = {
        title: goalTitle,
        description: "goal converted to event",
        day: dueDate.getDate(),
        month: dueDate.getMonth(),
        year: dueDate.getFullYear(),
        uid: user.uid,
        linkedGoalId: goalId, // Link goal to event
        startTime: "",
        endTime: ""
    };

    try {
        await db.collection('events').add(goalEvent);
        console.log('Goal event created:', goalEvent);
    } catch (error) {
        console.error('Error creating goal event:', error);
    }
}

function createPlan() {
    const planInput = document.getElementById('plan-input');
    const planDueDate = document.getElementById('plan-due-date'); // Assume there's a due date input for plans
    const plan = planInput.value.trim();
    let dueDate = planDueDate.value ? new Date(planDueDate.value) : null;

    if (plan) {
        if (dueDate) {
            dueDate.setHours(0, 0, 0, 0); // Normalize to midnight
            dueDate.setDate(dueDate.getDate() + 1); // Increment by one day
        }

        db.collection('plans').add({
            plan: plan,
            dueDate: dueDate, // Store the due date if provided
            userId: firebase.auth().currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(docRef => {
            console.log('Plan created:', plan);
            if (dueDate) {
                createPlanEvent(docRef.id, plan, dueDate); // Create event if due date exists
            }
        }).catch((error) => {
            console.error('Error creating plan:', error);
        });

        planInput.value = '';
        planDueDate.value = ''; // Clear date input
    }
}

async function createPlanEvent(planId, planTitle, dueDate) {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.error("No user is signed in");
        return;
    }

    const planEvent = {
        title: planTitle,
        description: "plan converted to event",
        day: dueDate.getDate(),
        month: dueDate.getMonth(),
        year: dueDate.getFullYear(),
        uid: user.uid,
        linkedPlanId: planId, // Link plan to event
        startTime: "",
        endTime: ""
    };

    try {
        await db.collection('events').add(planEvent);
        console.log('Plan event created:', planEvent);
    } catch (error) {
        console.error('Error creating plan event:', error);
    }
}


function loadTasks() {
    db.collection('tasks')
        .where('userId', '==', firebase.auth().currentUser.uid)
        .orderBy('dueDate')
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
            const tasksList = document.getElementById('tasks-list');
            tasksList.innerHTML = '';

            const tasksWithDate = [];
            const tasksWithoutDate = [];

            snapshot.forEach(doc => {
                const task = doc.data();
                if (task.dueDate) {
                    tasksWithDate.push({ id: doc.id, task });
                } else {
                    tasksWithoutDate.push({ id: doc.id, task });
                }
            });

            const sortedTasks = [...tasksWithoutDate, ...tasksWithDate];

            sortedTasks.forEach(({ id, task }) => {
                const taskDiv = document.createElement('div');
                taskDiv.className = 'task-item';

                if (task.dueDate) {
                    const dueDate = task.dueDate.toDate();
                    const today = new Date();
                    if (dueDate < today) {
                        taskDiv.style.backgroundColor = 'var(--primary-color)';
                    }

                    const dueDateText = document.createElement('span');
                    dueDateText.textContent = ` (Due: ${dueDate.toLocaleDateString()})`;
                    dueDateText.style.marginLeft = '100px';
                    dueDateText.style.color = '#c9302c';
                    dueDateText.style.fontWeight = 'bold';
                    dueDateText.style.padding = '5px 10px';
                    dueDateText.style.borderRadius = '8px';
                    dueDateText.style.display = 'inline-block';
                    taskDiv.appendChild(dueDateText);
                }

                const taskText = document.createElement('span');
                taskText.textContent = task.task;
                taskDiv.insertBefore(taskText, taskDiv.firstChild);

                const buttonContainer = createButtonContainer();
                buttonContainer.appendChild(createEditButton(id, 'task', task.task));
                buttonContainer.appendChild(createDeleteButton(id, 'task'));

                if (task.completed) {
                    const checkmark = createCheckmark();
                    buttonContainer.appendChild(checkmark);
                } else {
                    const completeButton = createCompleteButton(id, 'tasks', buttonContainer);
                    buttonContainer.appendChild(completeButton);
                }

                taskDiv.appendChild(buttonContainer);
                tasksList.appendChild(taskDiv);
            });
        });
}






function loadProjects() {
    db.collection('projects')
        .where('userId', '==', firebase.auth().currentUser.uid)
        .orderBy('dueDate')
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = '';

            const projectsWithDate = [];
            const projectsWithoutDate = [];

            snapshot.forEach(doc => {
                const project = doc.data();
                if (project.dueDate) {
                    projectsWithDate.push({ id: doc.id, project });
                } else {
                    projectsWithoutDate.push({ id: doc.id, project });
                }
            });

            const sortedProjects = [...projectsWithoutDate, ...projectsWithDate];

            sortedProjects.forEach(({ id, project }) => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-item';

                if (project.dueDate) {
                    const dueDate = project.dueDate.toDate();
                    const today = new Date();

                    if (dueDate < today) {
                        projectDiv.style.backgroundColor = 'var(--primary-color)';
                    }

                    const dueDateText = document.createElement('span');
                    dueDateText.textContent = ` (Due: ${dueDate.toLocaleDateString()})`;
                    dueDateText.style.marginLeft = '100px';
                    dueDateText.style.color = '#c9302c';
                    dueDateText.style.fontWeight = 'bold';
                    dueDateText.style.padding = '5px 10px';
                    dueDateText.style.borderRadius = '8px';
                    dueDateText.style.display = 'inline-block';
                    projectDiv.appendChild(dueDateText);
                }

                const projectText = document.createElement('span');
                projectText.textContent = project.project;
                projectDiv.insertBefore(projectText, projectDiv.firstChild);

                const buttonContainer = createButtonContainer();
                buttonContainer.appendChild(createEditButton(id, 'project', project.project));
                buttonContainer.appendChild(createDeleteButton(id, 'project'));

                if (project.completed) {
                    // Show green checkmark if the project is already completed
                    const checkmark = createCheckmark();
                    buttonContainer.appendChild(checkmark);
                } else {
                    // Add "Mark as Complete" button if not completed
                    const completeButton = createCompleteButton(id, 'projects', buttonContainer);
                    buttonContainer.appendChild(completeButton);
                }

                projectDiv.appendChild(buttonContainer);
                projectsList.appendChild(projectDiv);
            });
        });
}


function loadGoals() {
    db.collection('goals')
        .where('userId', '==', firebase.auth().currentUser.uid)
        .orderBy('dueDate')
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
            const goalsList = document.getElementById('goals-list');
            goalsList.innerHTML = '';

            const goalsWithDate = [];
            const goalsWithoutDate = [];

            snapshot.forEach(doc => {
                const goal = doc.data();
                if (goal.dueDate) {
                    goalsWithDate.push({ id: doc.id, goal });
                } else {
                    goalsWithoutDate.push({ id: doc.id, goal });
                }
            });

            const sortedGoals = [...goalsWithoutDate, ...goalsWithDate];

            sortedGoals.forEach(({ id, goal }) => {
                const goalDiv = document.createElement('div');
                goalDiv.className = 'goal-item';

                if (goal.dueDate) {
                    const dueDate = goal.dueDate.toDate();
                    const today = new Date();

                    if (dueDate < today) {
                        goalDiv.style.backgroundColor = 'var(--primary-color)';
                    }

                    const dueDateText = document.createElement('span');
                    dueDateText.textContent = ` (Due: ${dueDate.toLocaleDateString()})`;
                    dueDateText.style.marginLeft = '100px';
                    dueDateText.style.color = '#c9302c';
                    dueDateText.style.fontWeight = 'bold';
                    dueDateText.style.padding = '5px 10px';
                    dueDateText.style.borderRadius = '8px';
                    dueDateText.style.display = 'inline-block';
                    goalDiv.appendChild(dueDateText);
                }

                const goalText = document.createElement('span');
                goalText.textContent = goal.goal;
                goalDiv.insertBefore(goalText, goalDiv.firstChild);

                const buttonContainer = createButtonContainer();
                buttonContainer.appendChild(createEditButton(id, 'goal', goal.goal));
                buttonContainer.appendChild(createDeleteButton(id, 'goal'));

                if (goal.completed) {
                    const checkmark = createCheckmark();
                    buttonContainer.appendChild(checkmark);
                } else {
                    const completeButton = createCompleteButton(id, 'goals', buttonContainer);
                    buttonContainer.appendChild(completeButton);
                }

                goalDiv.appendChild(buttonContainer);
                goalsList.appendChild(goalDiv);
            });
        });
}



function loadPlans() {
    db.collection('plans')
        .where('userId', '==', firebase.auth().currentUser.uid)
        .orderBy('dueDate')
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
            const plansList = document.getElementById('plans-list');
            plansList.innerHTML = '';

            const plansWithDate = [];
            const plansWithoutDate = [];

            snapshot.forEach(doc => {
                const plan = doc.data();
                if (plan.dueDate) {
                    plansWithDate.push({ id: doc.id, plan });
                } else {
                    plansWithoutDate.push({ id: doc.id, plan });
                }
            });

            const sortedPlans = [...plansWithoutDate, ...plansWithDate];

            sortedPlans.forEach(({ id, plan }) => {
                const planDiv = document.createElement('div');
                planDiv.className = 'plan-item';

                if (plan.dueDate) {
                    const dueDate = plan.dueDate.toDate();
                    const today = new Date();

                    if (dueDate < today) {
                        planDiv.style.backgroundColor = 'var(--primary-color)';
                    }

                    const dueDateText = document.createElement('span');
                    dueDateText.textContent = ` (Due: ${dueDate.toLocaleDateString()})`;
                    dueDateText.style.marginLeft = '100px';
                    dueDateText.style.color = '#c9302c';
                    dueDateText.style.fontWeight = 'bold';
                    dueDateText.style.padding = '5px 10px';
                    dueDateText.style.borderRadius = '8px';
                    dueDateText.style.display = 'inline-block';
                    planDiv.appendChild(dueDateText);
                }

                const planText = document.createElement('span');
                planText.textContent = plan.plan;
                planDiv.insertBefore(planText, planDiv.firstChild);

                const buttonContainer = createButtonContainer();
                buttonContainer.appendChild(createEditButton(id, 'plan', plan.plan));
                buttonContainer.appendChild(createDeleteButton(id, 'plan'));

                if (plan.completed) {
                    // Show green checkmark if the plan is already completed
                    const checkmark = createCheckmark();
                    buttonContainer.appendChild(checkmark);
                } else {
                    // Add "Mark as Complete" button if not completed
                    const completeButton = createCompleteButton(id, 'plans', buttonContainer);
                    buttonContainer.appendChild(completeButton);
                }

                planDiv.appendChild(buttonContainer);
                plansList.appendChild(planDiv);
            });
        });
}


// Unified function to create the "Mark as Complete" button for both tasks and goals
function createCompleteButton(id, collectionName, buttonContainer) {
    const completeButton = document.createElement('button');
    completeButton.className = 'complete-button';
    completeButton.textContent = 'Mark as Complete';

    completeButton.addEventListener('click', () => {
        db.collection(collectionName).doc(id).update({
            completed: true
        }).then(() => {
            console.log(`${collectionName.slice(0, -1)} ${id} marked as completed.`);
            buttonContainer.removeChild(completeButton);
            const checkmark = createCheckmark();
            buttonContainer.appendChild(checkmark);
        }).catch(error => {
            console.error(`Error marking ${collectionName.slice(0, -1)} as complete: `, error);
        });
    });

    return completeButton;
}

// Function to create a green checkmark element
function createCheckmark() {
    const checkmark = document.createElement('span');
    checkmark.textContent = '✔'; // Green checkmark character
    checkmark.style.color = 'green';
    checkmark.style.fontSize = '16px';
    checkmark.style.fontWeight = 'bold';
    checkmark.style.marginLeft = '10px';
    return checkmark;
}

// Functions to create Edit and Delete buttons
function createEditButton(id, type, currentValue) {
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.onclick = () => openEditModal(id, type, currentValue);
    return button;
}


function createDeleteButton(id, type) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = async () => {
        if (type === 'task') {
            try {
                // Delete the task first
                await deleteItem(id, type);

                // Now find and delete the linked event
                const eventsSnapshot = await db.collection('events')
                    .where('linkedTaskId', '==', id)
                    .get();

                if (!eventsSnapshot.empty) {
                    eventsSnapshot.forEach(async (eventDoc) => {
                        await db.collection('events').doc(eventDoc.id).delete();
                        console.log(`Deleted linked event with ID: ${eventDoc.id}`);
                    });
                } else {
                    console.log('No linked event found for this task.');
                }
            } catch (error) {
                console.error('Error deleting task or linked event:', error);
            }
        } else {
            deleteItem(id, type); // For non-task items, just delete them normally
        }
    };
    return button;
}


// Function to open the edit modal and populate it with the current value
function openEditModal(id, type, currentValue) {
    const modal = document.getElementById('edit-modal');
    const itemTypeSpan = document.getElementById('edit-item-type');
    const editInput = document.getElementById('edit-input');
    
    if (modal && itemTypeSpan && editInput) {
        itemTypeSpan.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        editInput.value = currentValue || '';  // Default to an empty string if currentValue is undefined
        
        modal.style.display = 'block';
        
        // Store the item ID and type for later use
        window.currentEdit = { id, type };
    } else {
        console.error('Edit modal elements not found.');
    }
}


// Function to close the edit modal
function closeEditModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to save the edited value
function saveEdit() {
    const editInput = document.getElementById('edit-input');
    const editDateInput = document.getElementById('edit-date'); // New date input
    if (editInput && window.currentEdit) {
        const { id, type } = window.currentEdit;
        const newValue = editInput.value.trim();
        const newDueDate = editDateInput.value ? new Date(editDateInput.value) : null;

        // Prepare the update object
        const updateData = {
            [type]: newValue || null // Update the main value
        };

        // If a new due date is provided, add it to the update object
        if (newDueDate) {
            newDueDate.setHours(0, 0, 0, 0); // Normalize time to midnight
            newDueDate.setDate(newDueDate.getDate() + 1); // Increment due date by one day
            updateData.dueDate = newDueDate; // Assuming the dueDate field exists in your Firestore
        }

        // Update the document in Firestore
        db.collection(type + 's').doc(id).update(updateData)
            .then(() => {
                console.log(`${type} updated:`, newValue);
                closeEditModal(); // Close the modal after saving
            })
            .catch((error) => {
                console.error(`Error updating ${type}:`, error);
            });
    } else {
        console.error('Edit input or current edit information not found.');
    }
}



// Function to delete an item
function deleteItem(id, type) {
    db.collection(type + 's').doc(id).delete().then(() => {
        console.log(`${type} deleted:`, id);
    }).catch((error) => {
        console.error(`Error deleting ${type}:`, error);
    });
}

// Listen for authentication state changes to load tasks, projects, goals, and plans
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        loadTasks();
        loadProjects();
        loadGoals();
        loadPlans();
    }
});

    
 // Auth state observer
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const userRef = db.collection('users').doc(user.uid);

      userRef.get().then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          if (!userData.splashScreenShown) {
            // Show splash screen
            showSplashScreen();

            // Update Firestore to set splashScreenShown to true
            userRef.update({
              splashScreenShown: true
            });
          }
        } else {
          // If user document does not exist, create it
          userRef.set({
            splashScreenShown: true
          });
          showSplashScreen();
        }
      });
    }
  });

    // Sign up a new user
function signUp(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // New user created
      const user = userCredential.user;
      const additionalUserInfo = userCredential.additionalUserInfo;

      if (additionalUserInfo.isNewUser) {
        // User is new, set splashScreenShown to false in Firestore
        db.collection('users').doc(user.uid).set({
          splashScreenShown: false
        });
      }
    })
    .catch((error) => {
      console.error('Error signing up:', error);
    });
}


  function showSplashScreen() {
  // Hide the main dashboard content
  document.getElementById('mainDashboardContent').style.display = 'none';

  fetch('splashscreen.html')
    .then(response => response.text())
    .then(data => {
      const splashScreenDiv = document.createElement('div');
      splashScreenDiv.id = 'splashScreen';
      splashScreenDiv.style.position = 'fixed';
      splashScreenDiv.style.top = '0';
      splashScreenDiv.style.left = '0';
      splashScreenDiv.style.width = '100%';
      splashScreenDiv.style.height = '100%';
      splashScreenDiv.style.background = '#000';
      splashScreenDiv.style.zIndex = '10000';
      splashScreenDiv.style.display = 'flex';
      splashScreenDiv.style.alignItems = 'center';
      splashScreenDiv.style.justifyContent = 'center';

      splashScreenDiv.innerHTML = data;
      document.body.appendChild(splashScreenDiv);

      // Remove splash screen after a delay
      setTimeout(() => {
        document.body.removeChild(splashScreenDiv);
        // Show the main dashboard content again
        document.getElementById('mainDashboardContent').style.display = 'block';
      }, 3000); // Adjust the delay as needed
    })
    .catch(error => console.error('Error loading splash screen:', error));
}

    </script>

<script>
    function toggleNightMode() {
        document.body.classList.toggle('night-mode');
        // Save the user's preference in localStorage
        if (document.body.classList.contains('night-mode')) {
            localStorage.setItem('nightMode', 'enabled');
        } else {
            localStorage.setItem('nightMode', 'disabled');
        }
    }

    // Check localStorage to see if night mode was enabled previously
    document.addEventListener('DOMContentLoaded', (event) => {
        if (localStorage.getItem('nightMode') === 'enabled') {
            document.body.classList.add('night-mode');
        }
    });

    document.getElementById('toggleNightMode').addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
});

    
</script>


<script>
    async function toggleNightMode() {
        document.body.classList.toggle('night-mode');
        const isNightMode = document.body.classList.contains('night-mode');

        // Update localStorage
        localStorage.setItem('nightMode', isNightMode ? 'enabled' : 'disabled');

        // Save the theme preference to Firestore
            try {
                const user = firebase.auth().currentUser;
                if (user) {
                    const userId = user.uid;
                    await db.collection('users').doc(userId).set({
                        nightMode: isNightMode ? 'enabled' : 'disabled'
                    }, { merge: true });
                } else {
                    console.error('No user is signed in');
                }
            } catch (error) {
                console.error('Error updating Firestore:', error);
            }

            // Update theme icon
            updateThemeIcon(isNightMode ? 'moon' : 'sun');
        }
    function updateThemeIcon(state) {
        const themeIcon = document.getElementById('theme-icon');
        const themeContainer = document.querySelector('.theme-icon');

        // Animation effect
        themeContainer.classList.add('active');

        setTimeout(() => {
            if (state === 'moon') {
                themeIcon.innerHTML = `<path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>`;
                themeIcon.dataset.state = 'sun';
            } else {
                themeIcon.innerHTML = `<path d="M14.5739 1.11056L13.7826 2.69316C13.7632 2.73186 13.7319 2.76325 13.6932 2.7826L12.1106 3.5739C11.9631 3.64761 11.9631 3.85797 12.1106 3.93167L13.6932 4.72297C13.7319 4.74233 13.7632 4.77371 13.7826 4.81241L14.5739 6.39502C14.6476 6.54243 14.858 6.54243 14.9317 6.39502L15.723 4.81241C15.7423 4.77371 15.7737 4.74232 15.8124 4.72297L17.395 3.93167C17.5424 3.85797 17.5424 3.64761 17.395 3.5739L15.8124 2.7826C15.7737 2.76325 15.7423 2.73186 15.723 2.69316L14.9317 1.11056C14.858 0.963147 14.6476 0.963148 14.5739 1.11056Z" fill="#FFFFFF"></path> <path d="M19.2419 5.07223L18.4633 7.40815C18.4434 7.46787 18.3965 7.51474 18.3368 7.53464L16.0009 8.31328C15.8185 8.37406 15.8185 8.63198 16.0009 8.69276L18.3368 9.4714C18.3965 9.4913 18.4434 9.53817 18.4633 9.59789L19.2419 11.9338C19.3027 12.1161 19.5606 12.1161 19.6214 11.9338L20.4 9.59789C20.42 9.53817 20.4668 9.4913 20.5265 9.4714L22.8625 8.69276C23.0448 8.63198 23.0448 8.37406 22.8625 8.31328L20.5265 7.53464C20.4668 7.51474 20.42 7.46787 20.4 7.40815L19.6214 5.07223C19.5606 4.88989 19.3027 4.88989 19.2419 5.07223Z" fill="#FFFFFF"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4075 13.6642C13.2348 16.4915 17.6517 16.7363 20.6641 14.3703C20.7014 14.341 20.7385 14.3113 20.7754 14.2812C20.9148 14.1674 21.051 14.0479 21.1837 13.9226C21.2376 13.8718 21.2909 13.8201 21.3436 13.7674C21.8557 13.2552 22.9064 13.5578 22.7517 14.2653C22.6983 14.5098 22.6365 14.7517 22.5667 14.9905C22.5253 15.1321 22.4811 15.2727 22.4341 15.4122C22.4213 15.4502 22.4082 15.4883 22.395 15.5262C20.8977 19.8142 16.7886 23.0003 12 23.0003C5.92487 23.0003 1 18.0754 1 12.0003C1 7.13315 4.29086 2.98258 8.66889 1.54252L8.72248 1.52504C8.8185 1.49401 8.91503 1.46428 9.01205 1.43587C9.26959 1.36046 9.5306 1.29438 9.79466 1.23801C10.5379 1.07934 10.8418 2.19074 10.3043 2.72815C10.251 2.78147 10.1987 2.83539 10.1473 2.88989C10.0456 2.99777 9.94766 3.10794 9.8535 3.22023C9.83286 3.24485 9.8124 3.26957 9.79212 3.29439C7.32966 6.30844 7.54457 10.8012 10.4075 13.6642ZM8.99331 15.0784C11.7248 17.8099 15.6724 18.6299 19.0872 17.4693C17.4281 19.6024 14.85 21.0003 12 21.0003C7.02944 21.0003 3 16.9709 3 12.0003C3 9.09163 4.45653 6.47161 6.66058 4.81846C5.41569 8.27071 6.2174 12.3025 8.99331 15.0784Z" fill="#FFFFFF"></path>`;
                themeIcon.dataset.state = 'moon';
            }
            themeContainer.classList.remove('active');
        }, 500); // Duration matches the CSS animation duration
    }

        // Check Firestore for night mode preference
        document.addEventListener('DOMContentLoaded', async (event) => {
            try {
                firebase.auth().onAuthStateChanged(async (user) => {
                    if (user) {
                        const userId = user.uid;
                        try {
                            const doc = await db.collection('users').doc(userId).get();
                            const nightMode = doc.exists ? doc.data().nightMode : null;
                            if (nightMode === 'enabled') {
                                document.body.classList.add('night-mode');
                                updateThemeIcon('moon');
                            } else {
                                updateThemeIcon('sun');
                            }
                        } catch (error) {
                            console.error('Error fetching Firestore document:', error);
                        }

                        // Event listener for toggle button
                        document.getElementById('toggleNightMode').addEventListener('click', toggleNightMode);
                    } else {
                        console.error('No user is signed in');
                    }
                });
            } catch (error) {
                console.error('Error initializing Firebase Authentication:', error);
            }
        });

    // Event listener for toggle button
    document.getElementById('toggleNightMode').addEventListener('click', toggleNightMode);
</script>

<script>
document.getElementById('toggle-timers').addEventListener('click', function() {
    var timerSections = document.getElementById('timer-sections');
    if (timerSections.classList.contains('show')) {
        timerSections.classList.remove('show');
        this.textContent = 'Show Timers'; // Change button text to 'Show Timers'
    } else {
        timerSections.classList.add('show');
        this.textContent = 'Hide Timers'; // Change button text to 'Hide Timers'
    }
});
    
</script>

<script>
function loadSmallProfilePicture() {
    const currentUser = firebase.auth().currentUser;
    const avatarContainer = document.getElementById('smallProfilePictureContainer');
    const defaultAvatar = document.getElementById('defaultAvatar');

    if (currentUser) {
        const uid = currentUser.uid;
        const userDocRef = firestore.collection('users').doc(uid);

        userDocRef.get().then(doc => {
            if (doc.exists) {
                const data = doc.data();
                const profilePictureUrl = data.profilePicture;

                if (profilePictureUrl) {
                    // Create and append the new profile picture
                    const img = document.createElement('img');
                    img.src = profilePictureUrl;
                    img.alt = 'Profile Picture';
                    img.style.width = '40px'; // Ensure the image has the same size as the SVG
                    img.style.height = '40px';
                    img.style.borderRadius = '50%';

                    // Replace the SVG with the new image
                    avatarContainer.innerHTML = '';  // Clear the current content
                    avatarContainer.appendChild(img);
                } else {
                    console.log("No profile picture set for user.");
                }
            } else {
                console.error("No user document found.");
            }
        }).catch(error => {
            console.error("Error loading profile picture: ", error);
        });
    } else {
        console.error("User is not authenticated.");
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            loadSmallProfilePicture();
        }
    });
});




const quotes = [
    "Start where you are. Use what you have. Do what you can.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Don't watch the clock; do what it does. Keep going.",
    "Your only limit is your mind.",
    "Small daily improvements are the key to staggering long-term results.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Believe you can, and you're halfway there.",
    "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort.",
    "Do something today that your future self will thank you for.",
    "The secret of getting ahead is getting started.",
    "Your goals don’t care how you feel.",
    "Dream big, start small, act now.",
    "Action is the foundational key to all success.",
    "Stay focused and never give up.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "The only place where success comes before work is in the dictionary.",
    "Make each day your masterpiece.",
    "Good things come to those who hustle.",
    "Do it now, sometimes later becomes never.",
    "The future depends on what you do today.",
    "Don't stop until you're proud.",
    "Push yourself, because no one else is going to do it for you.",
    "Don't wait for opportunity. Create it.",
    "The way to get started is to quit talking and begin doing.",
    "Work hard in silence, let success make the noise.",
    "Great things never come from comfort zones.",
    "Wake up with determination, go to bed with satisfaction.",
    "If it doesn’t challenge you, it won’t change you.",
    "What you do today can improve all your tomorrows.",
    "Be stronger than your excuses.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Set your goals high, and don’t stop until you get there.",
    "It always seems impossible until it’s done.",
    "You don’t have to be great to start, but you have to start to be great.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Either you run the day, or the day runs you.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Work smarter, not just harder.",
    "Don’t limit your challenges, challenge your limits.",
    "Focus on being productive instead of busy.",
    "Do what you have to do until you can do what you want to do.",
    "Your future is created by what you do today, not tomorrow.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Don’t stop when you’re tired; stop when you’re done.",
    "You miss 100% of the shots you don’t take.",
    "Success is not in what you have, but who you are.",
    "Always do your best. What you plant now, you will harvest later.",
    "Discipline is the bridge between goals and accomplishment.",
    "Without hustle, talent will only carry you so far.",
    "Dream it. Wish it. Do it.",
    "Act as if what you do makes a difference. It does.",
    "The key to success is to focus on goals, not obstacles.",
    "Don’t count the days; make the days count."
];


// Function to display a random quote with italics and quotation marks
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Find the <p> element containing "Your personalized dashboard" and replace its text with italics and quotes
    const personalizedDashboardElement = document.querySelector('.dashboard-header p');
    if (personalizedDashboardElement) {
        personalizedDashboardElement.innerHTML = `<em>"${randomQuote}"</em>`;
    }
}

async function displayGreeting(username) {
    const apiKey = 'e3f77d4d29e24862b4f190231241611'; // Your WeatherAPI key
    const cacheKey = 'weatherDataCache'; // Key for localStorage
    const cacheDuration = 30 * 60 * 1000; // Cache duration: 30 minutes

    // Function to fetch weather data based on latitude and longitude
    async function getWeather(lat, lon) {
        const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
        const response = await fetch(weatherApiUrl);
        if (!response.ok) throw new Error('Weather data fetch failed');
        return response.json();
    }

    // Function to get cached weather data if available and valid
    function getCachedWeather() {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const isCacheValid = Date.now() - parsedData.timestamp < cacheDuration;
            if (isCacheValid) {
                return parsedData.data;
            }
        }
        return null;
    }

    // Function to cache weather data
    function cacheWeatherData(data) {
        const cachePayload = {
            data,
            timestamp: Date.now(),
        };
        localStorage.setItem(cacheKey, JSON.stringify(cachePayload));
    }

    // Use Geolocation API to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    // Check cache first
                    let weatherData = getCachedWeather();

                    // If no valid cache, fetch new weather data
                    if (!weatherData) {
                        weatherData = await getWeather(latitude, longitude);
                        cacheWeatherData(weatherData); // Cache the new data
                    }

                    const weatherCondition = weatherData.current.condition.text.toLowerCase();
                    let emoji;

                    // Map weather condition to emoji
                    if (weatherCondition.includes('sun') || weatherCondition.includes('clear')) {
                        emoji = '☀️'; // Sunny
                    } else if (weatherCondition.includes('cloud')) {
                        emoji = '☁️'; // Cloudy
                    } else if (weatherCondition.includes('rain')) {
                        emoji = '🌧️'; // Rainy
                    } else if (weatherCondition.includes('thunder')) {
                        emoji = '⛈️'; // Thunderstorm
                    } else if (weatherCondition.includes('snow')) {
                        emoji = '❄️'; // Snowy
                    } else if (weatherCondition.includes('drizzle')) {
                        emoji = '🌦️'; // Drizzle
                    } else if (weatherCondition.includes('mist') || weatherCondition.includes('fog')) {
                        emoji = '🌫️'; // Foggy
                    } else {
                        emoji = '🌍'; // Default Earth emoji
                    }

                    // Define the greeting based on time of day
                    const currentHour = new Date().getHours();
                    let greeting;

                    if (currentHour >= 5 && currentHour < 12) {
                        greeting = "Good morning";
                    } else if (currentHour >= 12 && currentHour < 17) {
                        greeting = "Good afternoon";
                    } else if (currentHour >= 17 && currentHour < 21) {
                        greeting = "Good evening";
                    } else {
                        greeting = "Good night";
                    }

                    // Update the greeting in the <h1> element
                    const greetingElement = document.querySelector('.dashboard-header h1');
                    if (greetingElement) {
                        greetingElement.innerHTML = `${emoji} ${greeting}, <span id="displayName">${username}</span>`;
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            },
            (error) => {
                console.error('Geolocation error:', error.message);
                // Default greeting if location access fails
                const fallbackGreeting = `🌍 Hello, <span id="displayName">${username}</span>!`;
                const greetingElement = document.querySelector('.dashboard-header h1');
                if (greetingElement) {
                    greetingElement.innerHTML = fallbackGreeting;
                }
            }
        );
    } else {
        console.error('Geolocation not supported by this browser.');
        // Fallback for browsers without Geolocation API
        const fallbackGreeting = `🌍 Hello, <span id="displayName">${username}</span>!`;
        const greetingElement = document.querySelector('.dashboard-header h1');
        if (greetingElement) {
            greetingElement.innerHTML = fallbackGreeting;
        }
    }
}



// Fetch weather and update UI
function fetchWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
                );
                const data = await response.json();

                // Update the weather info and emoji
                const condition = data.current.condition.text;
                const temp = data.current.temp_c; // Temperature in Celsius
                const emoji = getWeatherEmoji(data.current.condition.code);

                weatherEmoji.textContent = emoji;
                weatherInfo.textContent = `${condition}, ${temp}°C`;
            } catch (error) {
                weatherInfo.textContent = "Failed to fetch weather.";
                console.error("Weather fetch error:", error);
            }
        });
    } else {
        weatherInfo.textContent = "Geolocation not supported.";
    }
}

// Function to map weather codes to emojis
function getWeatherEmoji(code) {
    const weatherConditions = {
        1000: "☀️", // Sunny
        1003: "🌤️", // Partly cloudy
        1006: "☁️", // Cloudy
        1009: "🌥️", // Overcast
        1063: "🌦️", // Patchy rain possible
        1183: "🌧️", // Light rain
        1195: "⛈️", // Heavy rain
        1225: "❄️", // Snowy
        1240: "🌦️", // Light rain showers
        // Add more mappings as needed
    };
    return weatherConditions[code] || "🌍"; // Default emoji
}

// Call the functions when the page loads
window.addEventListener('load', () => {
    displayRandomQuote();
    fetchWeather2();

});


const apiKey = "e3f77d4d29e24862b4f190231241611"; // Your WeatherAPI key
const weatherInfo = document.getElementById("weather-info");
const weatherEmoji = document.getElementById("weather-emoji");

// Fetch weather and update UI
async function fetchWeather2() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
                );
                const data = await response.json();

                // Initial load in Celsius
                renderWeatherData(data, true);

                // Wait 5 seconds, then convert to Fahrenheit if needed
                setTimeout(() => {
                    convertToFahrenheitIfNeeded(data);
                }, 5000);
            } catch (error) {
                weatherInfo.textContent = "Failed to fetch weather.";
                console.error("Weather fetch error:", error);
            }
        });
    } else {
        weatherInfo.textContent = "Geolocation not supported.";
    }
}

// Render the weather data (Celsius or Fahrenheit)
function renderWeatherData(data, useFahrenheit) {
    const temp = useFahrenheit ? data.current.temp_f : data.current.temp_c;
    const feelsLike = useFahrenheit ? data.current.feelslike_f : data.current.feelslike_c;
    const unit = useFahrenheit ? "°F" : "°C";

    const condition = data.current.condition.text;
    const humidity = data.current.humidity; // Humidity %
    const windSpeed = useFahrenheit
        ? `${data.current.wind_mph} mph`
        : `${data.current.wind_kph} kph`; // Wind speed in appropriate unit
    const emoji = getWeatherEmoji(data.current.condition.code);

    // Generate the temperature bar
    const tempBar = generateTempBar(temp, useFahrenheit);

// Render the UI
weatherEmoji.textContent = emoji;
weatherInfo.innerHTML = `
    <div class="weather-section weather-section-bg">
        <h2>${data.location.name}, ${data.location.region}</h2>
        <p>${condition} ${emoji}</p>
        <p><strong>${temp}${unit}</strong> (Feels like: ${feelsLike}${unit})</p>
        ${tempBar}
        <p>🌬️ Wind: ${windSpeed}</p>
        <p>💧 Humidity: ${humidity}%</p>
    </div>
`;

}

// Function to check location and convert to Fahrenheit if needed
function convertToFahrenheitIfNeeded(data) {
    const country = data.location.country;
    const isFahrenheitCountry = ["United States", "Liberia", "Cayman Islands"].includes(country);

    if (isFahrenheitCountry) {
        renderWeatherData(data, false); // Re-render data in Fahrenheit
    }
}

// Function to map weather codes to emojis
function getWeatherEmoji(code) {
    const weatherConditions = {
        1000: "☀️", // Sunny
        1003: "🌤️", // Partly cloudy
        1006: "☁️", // Cloudy
        1009: "🌥️", // Overcast
        1063: "🌦️", // Patchy rain possible
        1183: "🌧️", // Light rain
        1195: "⛈️", // Heavy rain
        1225: "❄️", // Snowy
        1240: "🌦️", // Light rain showers
        // Add more mappings as needed
    };
    return weatherConditions[code] || "🌍"; // Default emoji
}

function generateTempBar(temp, useFahrenheit) {
    const minTemp = useFahrenheit ? 14 : -10; // Minimum scale
    const maxTemp = useFahrenheit ? 104 : 40; // Maximum scale
    const tempPercent = Math.min(Math.max((temp - minTemp) / (maxTemp - minTemp), 0), 1); // Normalize between 0 and 1
    const barLength = 20; // Total number of bars
    const filledBars = Math.round(tempPercent * barLength);

    // Determine the color based on temperature ranges
    let barColor;
    if (temp <= (useFahrenheit ? 32 : 0)) {
        barColor = "#00bfff"; // Freezing (light blue)
    } else if (temp <= (useFahrenheit ? 50 : 10)) {
        barColor = "#87cefa"; // Chilly (sky blue)
    } else if (temp <= (useFahrenheit ? 70 : 20)) {
        barColor = "#32cd32"; // Mild (green)
    } else if (temp <= (useFahrenheit ? 85 : 30)) {
        barColor = "#ffa500"; // Warm (orange)
    } else {
        barColor = "#ff4500"; // Hot (red-orange)
    }

    // Return the progress bar with the dynamic color
    return `
        <div style="display: flex; align-items: center; justify-content: flex-start; margin-left: 0;">
            <span style="font-size: 0.8rem;">❄️</span>
            <div style="margin: 0 5px; background-color: #e0e0e0; border-radius: 5px; width: 150px; height: 10px; overflow: hidden; position: relative;">
                <div style="background-color: ${barColor}; height: 100%; width: ${filledBars / barLength * 100}%;"></div>
            </div>
            <span style="font-size: 0.8rem;">🔥</span>
        </div>
    `;
}










// Function to load productivity data
function loadProductivityData() {
    const userId = firebase.auth().currentUser.uid;
    const productivitySection = document.querySelector('.productivity-stats');
    productivitySection.innerHTML = ''; // Clear section content initially

    // Keep the header
    const header = document.createElement('h3');
    header.textContent = "Your Productivity";
    productivitySection.appendChild(header);

    // Create the no-data message element
    const noDataMessage = document.createElement('p');
    noDataMessage.textContent = "✨ Nothing productive scheduled—why not get started? Create a task, goal, project, or plan to make the most of your time & stay productive! ✨";
    noDataMessage.style.display = 'none'; // Hide it by default
    productivitySection.appendChild(noDataMessage);

    // Array of Firestore collections to check
    const collections = [
        { name: 'tasks', label: 'Tasks' },
        { name: 'goals', label: 'Goals' },
        { name: 'projects', label: 'Projects' },
        { name: 'plans', label: 'Plans' }
    ];

    let totalDataCount = 0; // Track total data items across all collections
    const dataCounts = {}; // To track data counts for all collections

    collections.forEach(collection => {
        dataCounts[collection.name] = 0; // Initialize count for each collection

        db.collection(collection.name)
            .where('userId', '==', userId)
            .onSnapshot(snapshot => {
                let collectionDiv = document.querySelector(`.progress-item[data-collection="${collection.name}"]`);

                if (!collectionDiv) {
                    // If not, create a new section for this collection
                    collectionDiv = document.createElement('div');
                    collectionDiv.className = 'progress-item';
                    collectionDiv.setAttribute('data-collection', collection.name);
                    productivitySection.appendChild(collectionDiv);
                }

                // Clear existing content within the collection section
                collectionDiv.innerHTML = '';

                if (!snapshot.empty) {
                    const totalCount = snapshot.size;
                    const completedCount = snapshot.docs.filter(doc => doc.data().completed).length;
                    dataCounts[collection.name] = totalCount; // Update count

                    // Update the total data count
                    totalDataCount = Object.values(dataCounts).reduce((sum, count) => sum + count, 0);

                    const collectionLabel = document.createElement('p');
                    collectionLabel.textContent = `${collection.label} Completed: ${completedCount}/${totalCount}`;
                    collectionDiv.appendChild(collectionLabel);

                    // Create progress bar for each collection
                    const progressBar = document.createElement('div');
                    progressBar.className = 'progress-bar';

                    const progressFill = document.createElement('div');
                    progressFill.className = 'progress-fill';
                    const completionPercentage = (completedCount / totalCount) * 100;
                    progressFill.style.width = `${Math.min(completionPercentage, 100)}%`; // Set width based on completion count
                    progressBar.appendChild(progressFill);

                    collectionDiv.appendChild(progressBar);

                    // Hide the no-data message if there is data
                    noDataMessage.style.display = 'none';
                } else {
                    // If the collection is empty, reset the count
                    dataCounts[collection.name] = 0;

                    // Remove the section if there are no documents
                    collectionDiv.remove();
                }

                // Check if all collections have no data
                totalDataCount = Object.values(dataCounts).reduce((sum, count) => sum + count, 0);
                if (totalDataCount === 0) {
                    noDataMessage.style.display = 'block'; // Show the no-data message
                }
            }, error => {
                console.error(`Error loading ${collection.label} data: `, error);
            });
    });
}

// Call this function on page load or user login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        loadProductivityData();
    }
});





let dataExists = false; // Shared flag to track if any data exists
const upcomingDeadlines = new Map(); // Store upcoming deadlines by collection and document ID

function loadUpcomingDeadlines() {
    const userId = firebase.auth().currentUser.uid;
    const deadlinesList = document.getElementById('deadlines-list');

    // Collections with due dates to check
    const collections = [
        { name: 'tasks', label: 'Task', dateField: 'dueDate', titleField: 'task' },
        { name: 'goals', label: 'Goal', dateField: 'dueDate', titleField: 'goal' },
        { name: 'projects', label: 'Project', dateField: 'dueDate', titleField: 'project' },
        { name: 'plans', label: 'Plan', dateField: 'dueDate', titleField: 'plan' },
        { name: 'events', label: 'Event', dateField: null, titleField: 'title' } // Events use different fields
    ];

    // Clear the map and initialize listeners for all collections
    upcomingDeadlines.clear();
    collections.forEach(collection => {
        db.collection(collection.name)
            .where('userId', '==', userId)
            .onSnapshot(snapshot => {
                let listModified = false;

                snapshot.docChanges().forEach(change => {
                    const doc = change.doc;
                    const data = doc.data();
                    let deadlineDate;
                    let titleText = data[collection.titleField] || '';

                    // Check due date or event-specific date fields
                    if (collection.name === 'events') {
                        if (data.year && data.month && data.day) {
                            deadlineDate = new Date(data.year, data.month - 1, data.day);
                        }
                    } else if (data[collection.dateField]) {
                        deadlineDate = data[collection.dateField].toDate();
                    }

                    // Process additions and modifications
                    if (change.type === 'added' || change.type === 'modified') {
                        if (deadlineDate && deadlineDate >= new Date()) {
                            // Add or update the deadline in the map
                            upcomingDeadlines.set(`${collection.name}-${doc.id}`, {
                                label: collection.label,
                                title: titleText,
                                date: deadlineDate
                            });
                            listModified = true;
                        } else {
                            // Remove if the date is invalid or in the past
                            upcomingDeadlines.delete(`${collection.name}-${doc.id}`);
                            listModified = true;
                        }
                    }

                    // Process deletions
                    if (change.type === 'removed') {
                        upcomingDeadlines.delete(`${collection.name}-${doc.id}`);
                        listModified = true;
                    }
                });

                // Rebuild the list if any modifications were made
                if (listModified) {
                    rebuildDeadlinesList();
                }
            }, error => {
                console.error(`Error loading ${collection.label} data: `, error);
            });
    });
}

function rebuildDeadlinesList() {
    const deadlinesList = document.getElementById('deadlines-list');
    deadlinesList.innerHTML = ''; // Clear the list

    if (upcomingDeadlines.size > 0) {
        // Populate the list with deadlines from the map
        dataExists = true;
        upcomingDeadlines.forEach((value, key) => {
            const listItem = document.createElement('li');
            const tag = document.createElement('span');
            tag.className = 'deadline-tag';
            tag.textContent = value.label;

            const deadlineText = document.createElement('span');
            deadlineText.textContent = `${value.title} - `;

            // Create due date span with new CSS class
            const dueDateText = document.createElement('span');
            dueDateText.textContent = value.date.toLocaleDateString();
            dueDateText.classList.add('due-date'); // Apply due-date style

            deadlineText.appendChild(dueDateText);
            listItem.appendChild(tag);
            listItem.appendChild(deadlineText);
            deadlinesList.appendChild(listItem);
        });
    } else {
        // If no deadlines exist, show "No upcoming deadlines" message
        dataExists = false;
        const noDeadlinesMessage = document.createElement('li');
        noDeadlinesMessage.textContent = "No upcoming deadlines";
        deadlinesList.appendChild(noDeadlinesMessage);
    }
}





function loadUpcomingEvents() {
    const userId = firebase.auth().currentUser.uid;
    const deadlinesList = document.getElementById('deadlines-list');

    db.collection('events')
        .where('uid', '==', userId)
        .onSnapshot(snapshot => { // Listen to real-time updates
            let eventDataExists = false;
            deadlinesList.innerHTML = ''; // Clear the current list to avoid duplication

            snapshot.forEach(doc => {
                const data = doc.data();

                // Skip events with linked items
                if (data.linkedTaskId || data.linkedGoalId || data.linkedPlanId || data.linkedProjectId) {
                    return;
                }

                // Check if we have the required date fields
                if (data.year && data.month && data.day) {
                    const correctedMonth = data.month + 1;
                    const eventDate = new Date(data.year, correctedMonth - 1, data.day);

                    // Only display upcoming events
                    if (eventDate >= new Date()) {
                        eventDataExists = true;
                        const listItem = document.createElement('li');
                        const tag = document.createElement('span');
                        tag.className = 'deadline-tag';
                        tag.textContent = 'Event';

                        const eventText = document.createElement('span');
                        eventText.textContent = `${data.title} - `;

                        const dueDateText = document.createElement('span');
                        dueDateText.textContent = eventDate.toLocaleDateString();
                        dueDateText.classList.add('due-date');

                        eventText.appendChild(dueDateText);
                        eventText.appendChild(document.createTextNode(''));

                        listItem.appendChild(tag);
                        listItem.appendChild(eventText);
                        deadlinesList.appendChild(listItem);
                    }
                }
            });

            // Show "No upcoming deadlines" only if there are no upcoming events
            if (!eventDataExists && deadlinesList.children.length === 0) {
                const noDeadlinesMessage = document.createElement('li');
                noDeadlinesMessage.textContent = "No upcoming deadlines";
                deadlinesList.appendChild(noDeadlinesMessage);
            }
        }, error => {
            console.error("Error loading events data: ", error);
        });
}


// Call both functions on page load or user login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        loadUpcomingDeadlines(); // Load deadlines
        loadUpcomingEvents();    // Load events
    }
});





</script>

<script>
    // Function to open a specific tab
    function openTab(event, tabName) {
        // Hide all tab-content elements
        var tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(function(tabContent) {
            tabContent.style.display = 'none';
        });

        // Remove active class from all tab links
        var tabLinks = document.querySelectorAll('.tab-link');
        tabLinks.forEach(function(tabLink) {
            tabLink.classList.remove('active');
        });

        // Show the clicked tab and set it as active
        document.getElementById(tabName).style.display = 'block';
        if (event) {
            event.currentTarget.classList.add('active');
        }
    }

    // Automatically show the "Tasks" section by default when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        var defaultTabLink = document.querySelector('.nav-tabs li:first-child a');
        openTab(null, 'tasks-section'); // Open "Tasks" tab
        defaultTabLink.classList.add('active'); // Set the default tab as active
    });
</script>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        const summarySections = document.querySelectorAll("#ai-summary-section .summary-section");
        const hideButton = document.getElementById("hide-ai-section-button");
        const hideIcon = hideButton.querySelector("svg");

        // Define original and hidden SVG paths
        const originalSVGPath = `
    <path d="m19.012 32.711c-0.17188 1.6484 1.0391 3.1211 2.6797 3.2891h0.12891 0.17969c1.5391 0 2.8281-1.1719 2.9883-2.7109l0.19141-1.8594c0.32812-3.3008 2.9609-5.9414 6.2695-6.2617l1.8594-0.19141c0.80078-0.078124 1.5195-0.46875 2.0195-1.0898 0.51172-0.62109 0.73828-1.3984 0.66016-2.1992s-0.46094-1.5195-1.0781-2.0195c-0.62109-0.51172-1.3984-0.73828-2.1992-0.66016l-1.8594 0.19141c-6.1406 0.60938-11.031 5.5117-11.648 11.641l-0.19141 1.8594z"/>
    <path d="m33.301 75.02-1.8594-0.19141c-3.3008-0.32812-5.9414-2.9609-6.2617-6.2695l-0.19141-1.8594c-0.078125-0.80078-0.46875-1.5195-1.0898-2.0195-0.62109-0.51172-1.3984-0.73828-2.1992-0.66016s-1.5195 0.46094-2.0195 1.0781c-0.51172 0.62109-0.73828 1.3984-0.66016 2.1992l0.23828 2.3516c0.82031 5.8984 5.6211 10.551 11.578 11.141l1.8594 0.19141c1.6602 0.16016 3.1211-1.0391 3.2812-2.6914 0-0.089843 0.019532-0.19922 0.019532-0.30078 0-1.5391-1.1602-2.8281-2.6992-2.9883z"/>
    <path d="m67.309 80.98 2.1914-0.21875c5.9805-0.76172 10.699-5.5898 11.301-11.609l0.19141-1.8594c0.078124-0.80078-0.16016-1.5781-0.66016-2.1992s-1.2188-1-2.0117-1.0781c-0.10937 0-0.21094-0.019531-0.30859-0.019531-1.5391 0-2.8281 1.1602-2.9883 2.6992l-0.19141 1.8594c-0.32812 3.3008-2.9609 5.9414-6.2695 6.2617l-1.8594 0.19141c-0.80078 0.078126-1.5195 0.46875-2.0195 1.0898-0.51172 0.62109-0.73828 1.3984-0.66016 2.1992 0.16016 1.6484 1.6406 2.8516 3.2891 2.6797z"/>
    <path d="m80.73 30.328c-0.82812-5.8906-5.6211-10.539-11.578-11.129l-1.8594-0.19141c-0.10156 0-0.19922-0.011718-0.30078-0.011718-1.5195 0-2.8281 1.1602-2.9805 2.6992 0 0.10938-0.019531 0.21094-0.019531 0.30078 0 1.5391 1.1602 2.8281 2.6992 2.9883l1.8594 0.19141c3.3008 0.32812 5.9414 2.9609 6.2617 6.2695l0.19141 1.8594c0.16016 1.6484 1.6406 2.8594 3.2891 2.6914 0.80078-0.078125 1.5195-0.46875 2.0195-1.0898s0.73828-1.3984 0.66016-2.1992l-0.23828-2.3594z"/>
    <path d="m49.98 67c1.6719 0 3.0195-1.3516 3.0195-3v-5.2109l0.82031-0.14844c2.1289-0.39844 4.1797-1.1211 6.0781-2.1484l0.73828-0.39844 3.0195 3.7812c0.98828 1.2383 2.9492 1.4805 4.2305 0.46094 0.62109-0.5 1.0117-1.2109 1.1016-2.0117 0.089844-0.80078-0.14062-1.5781-0.64062-2.1992l-3.0195-3.7812 0.55078-0.62891c1.7305-1.9883 3.0391-4.25 3.9102-6.7188 0.26953-0.76172 0.23047-1.5703-0.12109-2.2891-0.35156-0.73047-0.94922-1.2695-1.7109-1.5391-0.75-0.26953-1.5703-0.23047-2.2891 0.12109-0.73047 0.35156-1.2695 0.94922-1.5391 1.7109-2.1211 5.9805-7.8008 10-14.121 10-6.3203 0-12.012-4.0195-14.121-10-0.55078-1.5508-2.2695-2.3711-3.8398-1.8281-0.75 0.26172-1.3594 0.80859-1.6992 1.5312-0.33984 0.71875-0.39062 1.5391-0.12109 2.3086 0.87109 2.4492 2.1797 4.7109 3.9102 6.7188l0.53906 0.62891-3.0195 3.7812c-1.0312 1.2891-0.82031 3.1797 0.46094 4.2188 1.2695 1.0117 3.2305 0.78125 4.2188-0.46094l3.0195-3.7812 0.73047 0.39062c1.9297 1.0312 3.9688 1.7617 6.0781 2.1484l0.82031 0.14844v5.2109c0 1.6484 1.3516 3 3 3z"/>
`;

        const hiddenSVGPath = `
            <path d="m81 54c0-15.391 0-23.871-5.5586-29.43-5.5586-5.5703-14.039-5.5703-29.441-5.5703h-4c-1.6484 0-3 1.3516-3 3s1.3516 3 3 3h4c14.238 0 21.379 0 25.191 3.8086 3.8086 3.8086 3.8086 10.949 3.8086 25.191v4c0 1.6484 1.3516 3 3 3s3-1.3516 3-3z"/>
            <path d="m61 62c1.6484 0 3-1.3516 3-3v-4c0-8.1016 0-12.559-3.2188-15.781-3.2188-3.2188-7.6797-3.2188-15.781-3.2188h-4c-1.6484 0-3 1.3516-3 3s1.3516 3 3 3h4c2.4492 0 4.5586 0 6.3086 0.089844l2.2383 0.12109-15.672 15.672c-1.1719 1.1719-1.1719 3.0703 0 4.2383 1.1289 1.1289 3.1094 1.1289 4.2383 0l15.672-15.672 0.12109 2.2383c0.089844 1.7383 0.089844 3.8594 0.089844 6.3086v4c0 1.6484 1.3516 3 3 3z"/>
            <path d="m19 42v4c0 15.391 0 23.871 5.5586 29.43 5.5586 5.5703 14.039 5.5703 29.441 5.5703h4c1.6484 0 3-1.3516 3-3s-1.3516-3-3-3h-4c-14.238 0-21.379 0-25.191-3.8086-3.8086-3.8086-3.8086-10.949-3.8086-25.191v-4c0-1.6484-1.3516-3-3-3s-3 1.3516-3 3z"/>
        `;

    // Update the SVG icon based on visibility state
    function updateIcon(isHidden) {
        hideIcon.innerHTML = isHidden ? hiddenSVGPath : originalSVGPath;
        hideIcon.classList.toggle("primary-hover", isHidden);
    }

    // Initialize visibility and icon based on localStorage
    const isInitiallyHidden = localStorage.getItem("aiSectionHidden") === "true";
    if (isInitiallyHidden) {
        summarySections.forEach(section => section.style.display = "none");
    }
    updateIcon(isInitiallyHidden);

    // Toggle AI summary-section visibility with confirmation and save preference
    hideButton.addEventListener("click", function() {
        const isHidden = Array.from(summarySections).every(section => section.style.display === "none");

        if (!isHidden) {
            const userConfirmed = confirm("Are you sure you want to hide this section?");
            if (userConfirmed) {
                summarySections.forEach(section => section.style.display = "none");
                localStorage.setItem("aiSectionHidden", "true");
                updateIcon(true);
            }
        } else {
            summarySections.forEach(section => section.style.display = "block");
            localStorage.setItem("aiSectionHidden", "false");
            updateIcon(false);
        }
    });
});

function updateIcon(isHidden) {
    hideIcon.innerHTML = isHidden ? hiddenSVGPath : originalSVGPath;
    hideIcon.classList.toggle("primary-hover", isHidden); // Add/remove primary-hover class based on state
}

// Constants
const huggingFaceApiKey = "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";
const modelEndpoint = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-11B-Vision-Instruct";
const collections = ['tasks', 'goals', 'projects', 'plans'];

// Fetch data from all collections and user info
async function fetchCollectionData(userId) {
    try {
        const allData = {};

        // Fetch user info
        const userDoc = await db.collection('users').doc(userId).get();
        if (!userDoc.exists) {
            console.warn('User not found');
            return null;
        }

        const userInfo = userDoc.data();
        const displayName = userInfo.displayName || "User";

        // Fetch collections
        for (const collectionName of collections) {
            const snapshot = await db.collection(collectionName)
                .where('userId', '==', userId)
                .get();

            allData[collectionName] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                type: collectionName.slice(0, -1) // e.g., 'task' for 'tasks'
            }));
        }

        // Check if any data is found
        const hasData = Object.values(allData).some(collection => collection.length > 0);

        if (!hasData) {
            renderPlaceholderMessage();
            return null;
        }

        // Attach displayName for use in summary generation
        allData.displayName = displayName;
        return allData;

    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}



// Function to render placeholder message
function renderPlaceholderMessage() {
    const aiSummarySection = document.getElementById('ai-summary-section');
    const summaryContainer = aiSummarySection.querySelector('.ai-assistant-card');
    const existingSections = summaryContainer.querySelectorAll('.summary-section');

    // Remove old sections
    existingSections.forEach(section => section.remove());

    // Create and add placeholder section
    const placeholderSection = document.createElement('div');
    placeholderSection.className = 'summary-section';
    placeholderSection.innerHTML = `
        <h3 class="section-title" style="color: green;">👋 Welcome!</h3>
        <div class="section-content">TaskMaster is ready to generate your Smart Overview. To get started, create a task, goal, project, or plan.</div>
    `;
    summaryContainer.appendChild(placeholderSection);
}

// First AI call to generate section content
async function generateSection(data, instructions) {
    const sectionPrompt = `Hello ${data.displayName}! I am TaskMaster, a friendly productivity-focused AI assistant. 
I will Generate ONLY the section content and title, keeping responses concise, clear, and professional.

USER DATA:
${data}

INSTRUCTIONS FOR THIS SECTION:
${instructions}

I WILL FORMAT MY RESPONSE EXACTLY LIKE THIS:
Title: [Section title]
Content: [Complete response here]`;

    const response = await fetch(modelEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${huggingFaceApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: sectionPrompt }),
    });

    if (!response.ok) {
        throw new Error(`Failed to generate section`);
    }

    const result = await response.json();
    const titleMatch = result[0]?.generated_text.match(/Title:\s*(.*)/);
    const contentMatch = result[0]?.generated_text.match(/Content:\s*([\s\S]*)/);

    const title = titleMatch ? titleMatch[1].trim() : "Loading...";
    const content = contentMatch ? contentMatch[1].trim() : "💬 TaskMaster requires additional information. Continue adding tasks, goals, projects, or plans for a clearer summary.";

    return { title, content };
}

// Second AI call to review and verify the content
async function reviewSection(title, content) {
    const reviewPrompt = `Please review the following section for any errors, inconsistencies, or improvements. 
Ensure that the section is clear, concise, and free from mistakes. Provide the corrected title and content. In your final response do not include explanations or questions. 

Title: ${title}
Content: ${content}

Format the response exactly like this (REMEMBER DO NOT INCLUDE EXPLANATIONS OR QUESTIONS):
Title: [Corrected title]
Content: [Final, corrected content]`;

    const response = await fetch(modelEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${huggingFaceApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: reviewPrompt }),
    });

    if (!response.ok) {
        throw new Error(`Failed to review section`);
    }

    const result = await response.json();
    const titleMatch = result[0]?.generated_text.match(/Title:\s*(.*)/);
    const contentMatch = result[0]?.generated_text.match(/Content:\s*([\s\S]*)/);

    const finalTitle = titleMatch ? titleMatch[1].trim() : title;
    const finalContent = contentMatch ? contentMatch[1].trim() : content;

    return { title: finalTitle, content: finalContent };
}

// Main function that generates the AI summary sequentially
async function generateAISummary(data) {
    const displayName = data.displayName || "User"; // Fallback if displayName is not set
    const formattedData = Object.entries(data)
        .filter(([key, items]) => key !== 'displayName' && items.length > 0) // Only include non-empty collections
        .map(([category, items]) => {
            return `${category.toUpperCase()}:\n` + 
                items.map(item => `- ${item.type}: ${item[item.type]} (Due: ${new Date(item.dueDate?.seconds * 1000).toLocaleDateString() || 'No date'})`).join('\n');
        }).join('\n\n');

    if (!formattedData.trim()) {
        return {
            title: "No Data",
            content: "💬 TaskMaster needs more information! Add tasks, goals, projects, or plans to receive a tailored summary."
        };
    }

    try {
        // Generate sections sequentially with verification
        let section = await generateSection(formattedData, `
1. Begin with a friendly and motivational greeting to ${displayName}.
2. Use 🚨 for items due within 3 days, and ⏰ for items due within 14 days.
3. Provide a clear, actionable tip for each item.
4. Exclude any categories without urgent items.
5. Keep under 150 words; exclude "Urgent Items" or explanations.
        `);
        section = await reviewSection(section.title, section.content);

        const urgentItems = section;

        section = await generateSection(formattedData, `
1. Start with an encouraging note for ${displayName}.
2. Use 🎯 for goals, 📋 for tasks, 📊 for projects, followed by a period.
3. Include practical next steps for each.
4. Exclude any categories that don’t have ongoing data.
5. Keep under 150 words; avoid "In Progress."
        `);
        section = await reviewSection(section.title, section.content);

        const inProgress = section;

        section = await generateSection(formattedData, `
1. Provide one preparation tip per upcoming item.
2. Avoid dates unless critical.
3. Use emojis meaningfully, not excessively.
4. Exclude categories without upcoming data.
5. Keep concise; omit "Coming Up."
        `);
        section = await reviewSection(section.title, section.content);

        const comingUp = section;

        section = await generateSection(formattedData, `
1. Provide four actionable, personalized recommendations for ${displayName}.
2. End with two motivational sentences tailored to ${displayName}.
3. Only include categories present in user data.
4. Keep concise, under 150 words; omit "Overview."
        `);
        section = await reviewSection(section.title, section.content);

        const overviewAndRecommendations = section;

        // Return the final reviewed sections
        return {
            urgentItems,
            inProgress,
            comingUp,
            overviewAndRecommendations
        };

    } catch (error) {
        console.error('Error generating AI summary:', error);
        return {
            title: "Error",
            content: "Failed to generate complete summary. Please try again."
        };
    }
}

// Function to render the sections with left-to-right fade-in animation and proper spacing
function renderSections(summaryData) {
    const aiSummarySection = document.getElementById('ai-summary-section');
    const summaryContainer = aiSummarySection.querySelector('.ai-assistant-card');
    const existingSections = summaryContainer.querySelectorAll('.summary-section');

    // Remove existing sections
    existingSections.forEach(section => section.remove());

    // Render new sections with animation
    Object.values(summaryData).forEach(({ title, content }, index) => {
        const sectionElement = document.createElement('div');
        sectionElement.className = 'summary-section hidden'; // Add "hidden" class initially

        const sanitizedTitle = sanitizeTitle(title);
        const sanitizedContent = sanitizeContent(content);

        sectionElement.innerHTML = `
            <h3 class="section-title">${sanitizedTitle}</h3>
            <div class="section-content">${sanitizedContent}</div>
        `;

        summaryContainer.appendChild(sectionElement);

        // Apply animation with a delay for each section
        setTimeout(() => {
            sectionElement.classList.remove('hidden'); // Trigger fade-in animation
        }, index * 300); // Adjust delay as needed (e.g., 300ms between sections)
    });
}



function sanitizeTitle(title) {
    // If the title is a single emoji, symbol, letter, number, or period, return "Loading..."
    if (/^[\p{Emoji}\p{P}\p{L}\p{N}\.]$/u.test(title)) {
        return "Loading..."; // Return "Loading..." if the title matches the condition
    }

    // Remove any leading random symbols (excluding emojis)
    title = title.replace(/^[^\w\s\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+/u, '');

    // Check if the title is all uppercase
    if (title === title.toUpperCase()) {
        title = title.toLowerCase(); // Convert entire title to lowercase

        // Capitalize the first word of the title
        const firstWord = title.split(' ')[0];
        title = title.replace(firstWord, firstWord.charAt(0).toUpperCase() + firstWord.slice(1));
    }

    // Remove specific phrases while keeping the rest
    const phrasesToRemove = ["user", "Dashboard", "Remove the word", "remove", "word", "Connecting", "]", "title", "corrected", "Do not", "update", "in", "Subscription Fields", "RSS", "Stay on Track", "RSS Subscription Fields Do Not Update in Calendar", "explanation", "Task Action Items", "Items", "Action", "SDLesát", "section", "Plans Section", "here to help", "help", "items", "kill", "death", "bypass", "lick", "licked", "unblock", "killed", "murder", "die", "dying", "porn", "poop", "fuck", "shit", "damn", "bitch", "asshole", "cunt", "bastard", "slut", "dick", "piss", "crap", "pussy", "fag", "cock", "whore", "fucker", "motherfucker", "suck", "retard", "jerk", "scumbag", "twat", "douche", "dipshit", "prick", "wanker", "arse", "bloody", "bollocks", "bugger", "wank", "knobhead", "tosser", "bellend", "git", "minger", "shag", "gash", "piss-off", "skank", "turd", "ballsack", "buttfuck", "chode", "knob", "poon", "queef", "schlong", "shithead", "spunk", "tosspot", "twatwaffle", "dickhead", "mofo", "nutcase", "nutjob", "skullfuck", "douchebag", "freak", "loser", "idiot", "imbecile", "moron", "psycho", "lunatic", "cretin", "scat", "shitfaced", "dickwad", "cum", "jizz", "sperm", "milf", "gilf", "dildo", "blowjob", "handjob", "rimjob", "tits", "boobs", "boobies", "pecker", "hardon", "balls", "genital", "orgasm", "penetrate", "sodomy", "slit", "bollocks", "clusterfuck", "gonads", "titfuck", "cocksucker", "buttplug", "asslicker", "fudgepacker", "twink", "gimp", "slapper", "whorehouse", "brothel", "stripper", "tramp", "hooker", "escort", "smut", "gangbang", "orgy", "rapist", "molest", "abuse", "violence", "terror", "extremist", "terrorism", "radical", "blood", "gore", "stab", "shoot", "gun", "weapon", "bomb", "explosive", "axe", "torture", "beheading", "decapitate", "burn", "arson", "loot", "pillager", "rioter", "criminal", "thief", "steal", "rob", "robbery", "rape", "molestation", "pedophile", "creep", "predator", "pervert", "perverted", "sicko", "sociopath", "maniac", "incest", "necrophilia", "cannibal", "depraved", "defecate", "feces", "excrement", "urine", "vomit", "barf", "phlegm", "menstrual", "semen", "ejaculate", "masturbate", "butt", "butthole", "masturbation", "whacking", "boner", "erect", "erection", "ejaculation", "hooker", "slattern", "wench", "hookup", "tart", "depravity", "harlot", "fornicate", "infidel", "apostate", "blaspheme", "heretic", "crusader", "infidel"];
    phrasesToRemove.forEach(phrase => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
        title = title.replace(regex, '').trim();
    });

// Check if the title is exactly "Loading..." and allow ellipsis
if (title === "Loading...") {
    return title; // Return "Loading..." as is
}

// Remove "Content: " at the beginning
title = title.replace(/^Content:\s*/, '');

// Remove "[corrected title " if detected anywhere in the title
title = title.replace(/\[corrected title\s*/gi, '');

// Remove "Corrected title]" if detected anywhere in the title
title = title.replace(/\s*Corrected title\]\s*/gi, '');

// Remove " ] " if detected anywhere in the title
title = title.replace(/\s*\]\s*/g, '');

// Remove trailing periods for all other titles
title = title.replace(/\.+$/, '').trim();

// If the sanitized title is empty, set it to "Loading..."
if (!title) {
    title = "Loading...";
}

return title; // Return the sanitized title


}






/**
 * Sanitize the content by removing malformed or incomplete parts.
 *
 * Rules:
 * - Keep required sections intact.
 * - Remove incomplete sentences or malformed patterns.
 * - Ensure content ends cleanly without truncation indicators.
 */
function sanitizeContent(content) {
    if (!content) {
        return '💬 TaskMaster requires additional information. Continue adding tasks, goals, projects, or plans for a clearer summary.';
    }

const inappropriateWords = [
    /\b(nigga|nigger|kill|death|bypass|lick|licked|unblock|killed|murder|die|dying|porn|poop|fuck|shit|damn|bitch|asshole|cunt|bastard|slut|dick|piss|crap|pussy|fag|cock|whore|fucker|motherfucker|suck|retard|jerk|scumbag|twat|douche|dipshit|prick|wanker|arse|bloody|bollocks|bugger|wank|knobhead|tosser|bellend|git|minger|shag|gash|piss-off|skank|turd|ballsack|buttfuck|chode|knob|poon|queef|schlong|shithead|spunk|tosspot|twatwaffle|dickhead|mofo|nutcase|nutjob|skullfuck|douchebag|freak|loser|idiot|imbecile|moron|psycho|lunatic|cretin|scat|shitfaced|dickwad|cum|jizz|sperm|milf|gilf|dildo|blowjob|handjob|rimjob|tits|boobs|boobies|pecker|hardon|balls|genital|orgasm|penetrate|sodomy|slit|bollocks|clusterfuck|gonads|titfuck|cocksucker|buttplug|asslicker|fudgepacker|twink|gimp|slapper|whorehouse|brothel|stripper|tramp|hooker|escort|smut|gangbang|orgy|rapist|molest|abuse|violence|terror|extremist|terrorism|radical|blood|gore|stab|shoot|gun|weapon|bomb|explosive|axe|torture|beheading|decapitate|burn|arson|loot|pillager|rioter|criminal|thief|steal|rob|robbery|rape|molestation|pedophile|creep|predator|pervert|perverted|sicko|sociopath|maniac|incest|necrophilia|cannibal|depraved|defecate|feces|excrement|urine|vomit|barf|phlegm|menstrual|semen|ejaculate|masturbate|butt|butthole|masturbation|whacking|boner|erect|erection|ejaculation|hooker|slattern|wench|hookup|tart|depravity|harlot|fornicate|infidel|apostate|blaspheme|heretic|crusader|infidel)\b/i
];

    const malformedIndicators = [
        /\[truncated\]/i,
        /(\s+incomplete|\.\.\.)$/i,
        /Answer Choices:/i,
        /Correct Answer:/i,
        /In Progress:/i,
        /^\.$/, // Matches a line containing only a period
        /\*\*Your Response:\*\*/i,
        /submission/i,
        /Overview & Recommendations:/i,
        /TaskPal/i,
        /Here is the response:/i,
        /RSS Subscription Fields Do Not Update in Calendar/i,
        /Connecting Tasks to Dashboard/i,
        /dashboard/i,
        /💬 To view tasks in the main dashboard, update dynamic data configuration for ABC and untouched features have not updated successfully. Continue assessing projects, goals, or creating connections to ensure accurate polling./i,
        /💬 TaskMaster requires additional information to provide an accurate summary. Please continue providing tasks, goals, projects, or plans to achieve a more comprehensive and clear summary. One additional point to update is incapacity to plan effectively 🤔. Consider checking factors that could be impacting these plans./i,
        /This format is clear and concise and provides the necessary information without mentioning empty categories./i

        
    ];

// Check for inappropriate content or sensitive keywords
if (inappropriateWords.some(pattern => pattern.test(content))) {
    return '⚠️ Warning: Inappropriate Content Detected';
}

if (/suicide/i.test(content)) {
    return 'TaskMaster is here to help. Please do not harm yourself. It\'s important to reach out to a mental health professional or a support network when feeling overwhelmed. If you are in immediate danger or need urgent assistance, please call 911 or a local emergency number. 💙🚨';
}

// Split content into individual lines
let lines = content.split('\n').map(line => line.trim());

// Remove the word "Content:" from each line without removing the entire line
lines = lines.map(line => line.replace(/^Content:\s*/, '').trim());

// Remove lines that don’t end with a period or lines that contain only numbers
lines = lines.filter(line => line.endsWith('.') && !/^\(?\d+\)?[\.:]?\s*$/.test(line));

// Remove empty lines after filtering
lines = lines.filter(Boolean);

// Join the sanitized lines with a single space (no <br> tags)
return lines.length
    ? lines.join(' ') // Join sentences with spaces
    : '💭 TaskMaster is still thinking... Check back later.';



}






// Show loading state
function showLoading() {
    const aiSummarySection = document.getElementById('ai-summary-section');
    const summaryContainer = aiSummarySection.querySelector('.ai-assistant-card');
    
    // Clear existing sections
    const existingSections = summaryContainer.querySelectorAll('.summary-section');
    existingSections.forEach(section => section.remove());

    const loadingSection = document.createElement('div');
    loadingSection.className = 'summary-section loading-state';
    loadingSection.innerHTML = '<p>Generating your smart overview...</p>';
    summaryContainer.appendChild(loadingSection);
}

// Main function to update the summary
async function updateAISummary(userId) {
    showLoading();

    try {
        const data = await fetchCollectionData(userId);
        console.log("Fetched data:", data); // Debug log

        if (data) {
            const summary = await generateAISummary(data);
            console.log("Generated summary:", summary); // Debug log

            if (summary) {
                renderSections(summary);
            } else {
                throw new Error('Failed to generate summary');
            }
        }
    } catch (error) {
        console.error('Error updating summary:', error);
        const aiSummarySection = document.getElementById('ai-summary-section');
        const summaryContainer = aiSummarySection.querySelector('.ai-assistant-card');
        summaryContainer.innerHTML += `
            <div class="summary-section error-state">
                <p>⏳ You have reached your daily limit for Smart Overview. Your limit will reset shortly. ⏳</p>
            </div>
        `;
    }
}


// Initialize and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Set up hide button functionality
    const hideButton = document.getElementById('hide-ai-section-button');
    if (hideButton) {
        hideButton.addEventListener('click', () => {
            const aiSummarySection = document.getElementById('ai-summary-section');
            aiSummarySection.style.display = aiSummarySection.style.display === 'none' ? 'block' : 'none';
        });
    }

    // Check authentication state and update summary
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('User is logged in:', user.uid);
            updateAISummary(user.uid);
        } else {
            console.log('No user logged in');
            const aiSummarySection = document.getElementById('ai-summary-section');
            const summaryContainer = aiSummarySection.querySelector('.ai-assistant-card');
            summaryContainer.innerHTML = `
                <div class="summary-section">
                    <p>Please log in to view your Smart Overview.</p>
                </div>
            `;
        }
    });
});
