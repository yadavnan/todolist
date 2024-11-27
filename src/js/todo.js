// todo.js
let todos = JSON.parse(localStorage.getItem('todos')) || [];

export function addTodo(todo) {
  todos.push(todo);
  saveToLocalStorage();
}

export function markComplete(todoId) {
  const todo = todos.find(todo => todo.id === parseInt(todoId, 10));
  if (todo) {
    todo.completed = !todo.completed;
    saveToLocalStorage();
  }
}

export function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== parseInt(todoId, 10));
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function renderTodos() {
  return todos;
}


