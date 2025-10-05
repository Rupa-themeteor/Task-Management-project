import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../hooks/useform";

function EditTask({ tasks, updateTask }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === Number(id));

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Title is required";
    if (!values.deadline) errors.deadline = "Deadline is required";
    return errors;
  };

  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    { title: "", deadline: "", priority: "", status: "" },
    validate
  );

  useEffect(() => {
    if (task) setValues(task);
  }, [task, setValues]);

  const onSubmit = () => {
    updateTask(values);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Edit Task</h2>
      <input name="title" placeholder="Task Title" value={values.title} onChange={handleChange} />
      {errors.title && <p className="error">{errors.title}</p>}
      <input name="deadline" type="date" value={values.deadline} onChange={handleChange} />
      {errors.deadline && <p className="error">{errors.deadline}</p>}
      <select name="priority" value={values.priority} onChange={handleChange}>
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
      <select name="status" value={values.status} onChange={handleChange}>
        <option>Pending</option><option>Completed</option>
      </select>
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditTask;
