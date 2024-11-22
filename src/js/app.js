import { addTodo, renderTodos, markComplete, deleteTodo } from './todo';
import { addProject, renderProjects } from './project';
import '../css/style.css';  // Corrected path

const todoList = document.getElementById('todo-list');
const projectSelect = document.getElementById('project-select');
const addProjectBtn = document.getElementById('add-project-btn');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoTitle = document.getElementById('todo-title');
const todoDescription = document.getElementById('todo-description');
const todoDueDate = document.getElementById('todo-due-date');
const todoPriority = document.getElementById('todo-priority');
const newProjectName = document.getElementById('new-project-name');

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Load projects and todos from localStorage
function loadFromLocalStorage() {
  renderProjectsList();
  renderTodoList();
}

// Render Project Options in Select Dropdown
function renderProjectsList() {
  const projects = renderProjects();
  projectSelect.innerHTML = '<option value="" disabled selected>Select a project</option>';
  
  projects.forEach(project => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });
}

// Render Todos for the Selected Project
function renderTodoList() {
  const selectedProjectId = projectSelect.value;
  const todos = renderTodos().filter(todo => todo.projectId === selectedProjectId);
  
  todoList.innerHTML = '';
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <strong>${todo.title}</strong> - ${todo.dueDate} (${todo.priority})
      <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
      <button class="delete-btn">Delete</button>
    `;
    
    li.dataset.id = todo.id;
    
    // Handle Mark Complete
    const completeBtn = li.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => markComplete(todo.id));

    // Handle Delete
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    todoList.appendChild(li);
  });
}

// Handle Add Project
addProjectBtn.addEventListener('click', () => {
  const projectName = newProjectName.value;
  if (projectName.trim()) {
    addProject(projectName);
    newProjectName.value = '';
    renderProjectsList();
  }
});

// Handle Add Todo
addTodoBtn.addEventListener('click', () => {
  const title = todoTitle.value;
  const description = todoDescription.value;
  const dueDate = todoDueDate.value;
  const priority = todoPriority.value;
  const projectId = projectSelect.value;

  if (title && description && dueDate && projectId) {
    const todo = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed: false,
      projectId
    };
    
    addTodo(todo);
    renderTodoList();
    clearTodoInputs();
  } else {
    alert('Please fill out all fields');
  }
});

function clearTodoInputs() {
  todoTitle.value = '';
  todoDescription.value = '';
  todoDueDate.value = '';
  todoPriority.value = 'Medium';
}
