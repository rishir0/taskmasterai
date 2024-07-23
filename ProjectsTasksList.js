import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';

const ProjectsTasksList = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch projects
    const fetchProjects = async () => {
      try {
        const projectsCollection = await firestore.collection('projects').get();
        const projectsData = projectsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    // Fetch tasks
    const fetchTasks = async () => {
      try {
        const tasksCollection = await firestore.collection('tasks').get();
        const tasksData = tasksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchProjects();
    fetchTasks();
  }, []);

  return (
    <div className="all-items">
      <h2>Tasks & Projects</h2>
      <div id="tasks-projects-list">
        <h3>Projects:</h3>
        {projects.length > 0 ? (
          <ul>
            {projects.map(project => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        ) : (
          <p>No projects available.</p>
        )}
        <h3>Tasks:</h3>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map(task => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsTasksList;
