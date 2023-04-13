import React from 'react';

function ToDoItem({ todo, toggleTodo }) {
  const { id, task, completed } = todo;

  return (
    <li>
      <label style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        {task}
      </label>
    </li>
  );
}

export default ToDoItem;
