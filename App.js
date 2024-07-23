// app.js

// Your Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyDaMAlQRMXiDsZ4P0b06P18id3y5xBiZ1k",
      authDomain: "deepworkai-c3419.firebaseapp.com",
      projectId: "deepworkai-c3419",
      storageBucket: "deepworkai-c3419.appspot.com",
      messagingSenderId: "367439182644",
      appId: "1:367439182644:web:304216430df97eff68c361"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to display tasks and projects
function displayTasksAndProjects() {
  const tasksProjectsList = document.getElementById('tasks-projects-list');

  // Clear previous contents
  tasksProjectsList.innerHTML = '';

  // Fetch tasks
  db.collection('tasks').get().then((tasksSnapshot) => {
    tasksSnapshot.forEach((doc) => {
      const task = doc.data();
      const taskElement = document.createElement('div');
      taskElement.textContent = `Task: ${task.title}`;
      tasksProjectsList.appendChild(taskElement);
    });
  });

  // Fetch projects
  db.collection('projects').get().then((projectsSnapshot) => {
    projectsSnapshot.forEach((doc) => {
      const project = doc.data();
      const projectElement = document.createElement('div');
      projectElement.textContent = `Project: ${project.name}`;
      tasksProjectsList.appendChild(projectElement);
    });
  });
}

// Call the function to display tasks and projects
displayTasksAndProjects();
