App.jsx

import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", date: "", desc: "" });

  const add = (e) => {
    e.preventDefault();
    if (form.name && form.date) {
      setTasks([...tasks, { ...form, done: false }]);
      setForm({ name: "", date: "", desc: "" });
    }
  };

  const toggle = (i) => {
    setTasks(
      tasks.map((t, j) =>
        j === i ? { ...t, done: !t.done } : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "done") return t.done;
    if (filter === "notdone") return !t.done;
    return true;
  });

  return (
    <div className="app">
      <h1>Reminder App</h1>

      <form onSubmit={add}>
        {["name", "date", "desc"].map((k) => (
          <input
            key={k}
            type={k === "date" ? "date" : "text"}
            placeholder={k}
            value={form[k]}
            onChange={(e) =>
              setForm({ ...form, [k]: e.target.value })
            }
          />
        ))}
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        {["all", "done", "notdone"].map((v) => (
          <button key={v} onClick={() => setFilter(v)}>
            {v}
          </button>
        ))}
      </div>

      <ul>
        {filteredTasks.map((t, i) => (
          <li
            key={i}
            onClick={() => toggle(i)}
            className={t.done ? "done" : ""}
          >
            <b>{t.name}</b> - {t.date}{" "}
            {t.desc && `| ${t.desc}`}
          </li>
        ))}
      </ul>
    </div>
  );
}




Index.css

/* Reset some default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

/* App container */
.app {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background: #f4f6f8;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Title */
.app h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

form input:focus {
  outline: none;
  border-color: #007bff;
}

/* Add button */
form button {
  padding: 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s;
}

form button:hover {
  background: #0056b3;
}

/* Filter buttons */
.filters {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.filters button {
  flex: 1;
  margin: 0 5px;
  padding: 8px;
  border: none;
  background: #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.filters button:hover {
  background: #ccc;
}

/* Task list */
ul {
  list-style: none;
  margin-top: 10px;
}

li {
  padding: 10px;
  margin-bottom: 8px;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
  border-left: 5px solid #007bff;
}

li:hover {
  background: #f1f1f1;
}

/* Completed task */
li.done {
  text-decoration: line-through;
  color: gray;
  border-left: 5px solid green;
}
