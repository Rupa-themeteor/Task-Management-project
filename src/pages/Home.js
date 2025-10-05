import React from "react";
import TaskTable from "../Components/TaskTable";

function Home({ tasks, deleteTask }) {
  return (
    <div className="home">
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Create one!</p>
      ) : (
        <TaskTable tasks={tasks} deleteTask={deleteTask} />
      )}
    </div>
  );
}

export default Home;
