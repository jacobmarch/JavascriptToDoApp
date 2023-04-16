// Other imports...
import React, { useState, useEffect } from 'react';
import TodoForm from './ToDoForm';
import TodoList from './ToDoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/tasks')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = (task) => {
    fetch('http://localhost:5001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task, completed: false }),
    })
      .then((response) => response.json())
      .then((newTask) => setTodos((prevTodos) => [...prevTodos, newTask]));
  };

  // Implement the remaining CRUD operations (toggleTodo, deleteTodo, etc.)
  const toggleTodo = (id) => {
    // Find the task in the state
    const task = todos.find((todo) => todo.id === id);
    if (!task) return;
  
    // Update the task's completion status
    const updatedTask = { ...task, completed: !task.completed };
  
    // Make a request to the backend API to update the task
    fetch(`http://localhost:5001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        return response.json();
      })
      .then((updatedTask) => {
        // Update the state with the updated task
        setTodos(todos.map((todo) => (todo.id === id ? updatedTask : todo)));
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };
  


  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
