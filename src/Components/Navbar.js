import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>📝 Task Manager</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Add Task</Link>
      </div>
    </nav>
  );
}

export default Navbar;
