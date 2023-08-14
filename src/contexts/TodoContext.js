import React, { createContext, useState, useContext, useEffect } from 'react';
import todoData from '../dummy/todoData.json';

// Create a TodoContext using createContext
const TodoContext = createContext();

// TodoContextProvider component that wraps the application and provides context
function TodoContextProvider({ children }) {
  // State for todo items
  const [todos, setTodos] = useState([]);

  // Load data from localStorage or initialize with dummy data on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));

    if (storedTodos) {
      setTodos(storedTodos);
    } else {
      setTodos(todoData);
      localStorage.setItem('todos', JSON.stringify(todoData));
    }
  }, []);

  // Add a new todo item
  const addTodo = (task) => {
    const newTodo = { id: Date.now(), task, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  // Mark a todo item as completed or not completed
  const markTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Remove a todo item
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Update the task of a todo item
  const updateTodoTask = (id, newTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Provide the context values to the components
  return (
    <TodoContext.Provider value={{ todos, addTodo, markTodo, removeTodo, updateTodoTask }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to use the TodoContext
function useTodoContext() {
  return useContext(TodoContext);
}

export { TodoContextProvider, useTodoContext };
