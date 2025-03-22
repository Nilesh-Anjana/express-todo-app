const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());  // Allow frontend access
app.use(bodyParser.json()); // Parse JSON requests

// In-memory storage for tasks
let todos = [];

// Get all todos (For Webpage & Postman)
app.get("/todos", (req, res) => {
    res.json(todos);
});

// Add a new todo (For Webpage & Postman)
app.post("/todos", (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    const newTask = { id: todos.length + 1, task };
    todos.push(newTask);
    res.status(201).json(newTask);
});

// Delete a todo (For Webpage & Postman)
app.delete("/todos/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Remove the task with the given ID
    todos = todos.filter(todo => todo.id !== taskId);

    // **Reassign new IDs after deletion**
    todos = todos.map((todo, index) => ({
        id: index + 1, // Assign new sequential IDs
        task: todo.task
    }));

    res.json({ message: "Task deleted and IDs updated successfully", todos });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
