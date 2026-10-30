import { useState } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function addTask(event) {
    event.preventDefault();
    if (text.trim() === "") {
      setError("Please enter a task");
      return;
    }
    const newTask = { id: Date.now(), text: text.trim(), done: false };
    setTasks([...tasks, newTask]);
    setText("");
    setError("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const remaining = tasks.filter((task) => !task.done).length;

  return (
    <div className="app">
      <h1>Task Tracker</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error-text">{error}</p>}

      <p className="summary">
        {tasks.length} tasks, {remaining} remaining
      </p>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one above.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
