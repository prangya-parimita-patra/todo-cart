import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import './TodoList.css';

function TodoList() {
  // Destructure required functions and data from the TodoContext
  const { todos, addTodo, markTodo, removeTodo, updateTodoTask } = useTodoContext();

  // State for editing tasks
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  // Handle adding a new task
  const handleAddTodo = () => {
    const newTask = 'New Task';
    addTodo(newTask);
  };

  // Handle marking a task as completed
  const handleMarkTodo = (id) => {
    markTodo(id);
  };

  // Handle removing a task
  const handleRemoveTodo = (id) => {
    removeTodo(id);
    setEditItemId(null);
  };

  // Handle initiating task edit
  const handleEditTodo = (todo) => {
    setEditItemId(todo.id);
    setEditedTask(todo.task);
  };

  // Handle saving the edited task
  const handleSaveEdit = () => {
    updateTodoTask(editItemId, editedTask);
    setEditItemId(null);
    setEditedTask('');
  };

  return (
    <div className="todo-list">
      {/* Add new task button */}
      <button className="btn-add" onClick={handleAddTodo}>Add Task</button>
      {/* Toggle edit mode button */}
      <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Done Editing' : 'Edit Tasks'}
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="task-container">
              {/* Display task input or task content */}
              {isEditing && editItemId === todo.id ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              ) : (
                <div className={`task${todo.completed ? ' completed' : ''}`}>
                  {todo.task}
                </div>
              )}
              {/* Display edit or save button */}
              {isEditing ? (
                <div>
                  {editItemId === todo.id ? (
                    <button className="btn-save" onClick={handleSaveEdit}>Save</button>
                  ) : (
                    <button className="btn-edit" onClick={() => handleEditTodo(todo)}>Edit</button>
                  )}
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleMarkTodo(todo.id)}
                  />
                  <button className="btn-remove" onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
