// src/App.js
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState(""); // Track edited text

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, priority: "low", dueDate: null },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setEditingTaskId(null);
  };

  const updateTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, text: editedTaskText, dueDate: null }
          : task
      )
    );
    setEditingTaskId(null);
  };

  const editTask = (taskId, currentText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(currentText);
  };

  const togglePriority = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              priority: task.priority === "low" ? "high" : "low",
            }
          : task
      )
    );
  };

  const setDueDate = (taskId, dueDate) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, dueDate } : task
      )
    );
  };

  const formatDate = (dueDate) => {
    if (!dueDate) return "";
    const date = new Date(dueDate);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="app">
      <h1>TO DO TASKS</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add tasks"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-info">
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                  />
                  <button onClick={() => updateTask(task.id)}>Done</button>
                </>
              ) : (
                <>
                  <span className={`priority-${task.priority}`}>
                    {task.text}
                  </span>
                  <div className="task-details">
                    <div className="task-buttons">
                      <button onClick={() => editTask(task.id, task.text)}>
                        Edit
                      </button>
                      <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                    <div className="task-metadata">
                      <button onClick={() => togglePriority(task.id)}>
                        {task.priority === "low" ? "High" : "Low"} Priority
                      </button>
                      <input
                        type="date"
                        value={formatDate(task.dueDate)}
                        onChange={(e) => setDueDate(task.id, e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
