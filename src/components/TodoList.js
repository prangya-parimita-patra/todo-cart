import React, { useState } from 'react';
import { useTodoContext } from '../contexts/TodoContext';
import './TodoList.css';

function TodoList() {
  const { todos, addTodo, markTodo, removeTodo, updateTodoTask } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const handleAddTodo = () => {
    const newTask = 'New Task';
    addTodo(newTask);
  };

  const handleMarkTodo = (id) => {
    markTodo(id);
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id);
    setEditItemId(null);
  };

  const handleEditTodo = (todo) => {
    setEditItemId(todo.id);
    setEditedTask(todo.task);
  };

  const handleSaveEdit = () => {
    updateTodoTask(editItemId, editedTask);
    setEditItemId(null);
    setEditedTask('');
  };

  return (
    <div className="todo-list">
      <button className="btn-add" onClick={handleAddTodo}>Add Task</button>
      <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Done Editing' : 'Edit Tasks'}
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="task-container">
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
