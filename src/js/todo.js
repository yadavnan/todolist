let todos = JSON.parse(localStorage.getItem('todos')) || [];

export function addTodo(todo) {
  todos.push(todo);
  saveToLocalStorage();
}

export function markComplete(todoId) {
  const todo = todos.find(todo => todo.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    saveToLocalStorage();
  }
}

export function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  saveToLocalStorage();
}

export function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function renderTodos() {
  return todos;
}
