import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, { id: Date.now(), ...task }]);
  const updateTask = (updatedTask) =>
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home tasks={tasks} deleteTask={deleteTask} />} />
        <Route path="/create" element={<CreateTask addTask={addTask} />} />
        <Route path="/edit/:id" element={<EditTask tasks={tasks} updateTask={updateTask} />} />
      </Routes>
    </Router>
  );
}

export default App;
