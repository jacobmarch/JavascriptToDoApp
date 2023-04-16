const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// In-memory data store for tasks
let tasks = [];

// Define routes and handlers
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    task: req.body.task,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).end();
});

// Start the server on port 5001
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
