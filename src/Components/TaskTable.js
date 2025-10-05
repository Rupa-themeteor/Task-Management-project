import React, { useState } from "react";
import { Link } from "react-router-dom";

function TaskTable({ tasks, deleteTask }) {
  const [sortField, setSortField] = useState("title");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const sortedTasks = [...tasks]
    .filter((t) => t.status.includes(filter))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a[sortField].localeCompare(b[sortField]));

  const start = (page - 1) * rowsPerPage;
  const paginatedTasks = sortedTasks.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(sortedTasks.length / rowsPerPage);

  return (
    <div className="table-container">
      <div className="controls">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.deadline}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <Link to={`/edit/${task.id}`} className="btn-edit">Edit</Link>
                <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>◀</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>▶</button>
      </div>
    </div>
  );
}

export default TaskTable;
