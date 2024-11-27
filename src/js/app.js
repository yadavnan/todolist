// Importing required functions from modules
import { addTodo, renderTodos, markComplete, deleteTodo } from './todo';
import { addProject, renderProjects } from './project';
import '../css/style.css';

const projectSelect = document.getElementById('project-select');
const addProjectBtn = document.getElementById('add-project-btn');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoTitle = document.getElementById('todo-title');
const todoDescription = document.getElementById('todo-description');
const todoDueDate = document.getElementById('todo-due-date');
const todoPriority = document.getElementById('todo-priority');
const newProjectName = document.getElementById('new-project-name');
const todoList = document.getElementById('todo-list');

// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  renderProjectsList();
  renderTodoList();
});

// Render project dropdown
function renderProjectsList() {
  const projects = renderProjects();
  projectSelect.innerHTML = '<option value="" disabled selected>Select a project</option>';
  projects.forEach((project) => {
    const option = document.createElement('option');
    option.value = project.id;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });
}

// Render To-Dos
function renderTodoList() {
  const todos = renderTodos();
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <div>
        <strong>${todo.title}</strong> - ${todo.dueDate} (${todo.priority})
        <p>${todo.description}</p>
      </div>
      <div>
        <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    todoList.appendChild(li);

    li.querySelector('.complete-btn').addEventListener('click', () => {
      markComplete(todo.id);
      renderTodoList();
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
      deleteTodo(todo.id);
      renderTodoList();
    });
  });
}

// Add project
addProjectBtn.addEventListener('click', () => {
  const projectName = newProjectName.value.trim();
  if (projectName) {
    addProject(projectName);
    renderProjectsList();
    newProjectName.value = '';
  } else {
    alert('Please enter a valid project name.');
  }
});

// Add Todo
addTodoBtn.addEventListener('click', () => {
  const todo = {
    title: todoTitle.value,
    description: todoDescription.value,
    dueDate: todoDueDate.value,
    priority: todoPriority.value,
    completed: false,
    projectId: parseInt(projectSelect.value, 10),
    id: Date.now(),
  };

  if (todo.title && todo.description && todo.dueDate && todo.projectId) {
    addTodo(todo);
    renderTodoList();
    clearTodoInputs();
  } else {
    alert('Please fill in all fields.');
  }
});

function clearTodoInputs() {
  todoTitle.value = '';
  todoDescription.value = '';
  todoDueDate.value = '';
  todoPriority.value = '';
}

