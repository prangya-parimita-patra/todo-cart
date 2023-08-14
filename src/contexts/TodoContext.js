import React, { createContext, useState, useContext, useEffect } from 'react';
import todoData from '../dummy/todoData.json';

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));

    if (storedTodos) {
      setTodos(storedTodos);
    } else {
      setTodos(todoData);
      localStorage.setItem('todos', JSON.stringify(todoData));
    }
  }, []);

  const addTodo = (task) => {
    const newTodo = { id: Date.now(), task, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  const markTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const updateTodoTask = (id, newTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: newTask } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, markTodo, removeTodo, updateTodoTask }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodoContext() {
  return useContext(TodoContext);
}

export { TodoContextProvider, useTodoContext };
