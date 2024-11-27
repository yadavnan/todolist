// project.js
let projects = JSON.parse(localStorage.getItem('projects')) || [];

export function addProject(projectName) {
  const project = {
    id: Date.now(),
    name: projectName
  };
  projects.push(project);
  saveToLocalStorage();
}

export function renderProjects() {
  return projects;
}

export function saveToLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

