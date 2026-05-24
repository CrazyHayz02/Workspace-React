// src/components/Todo.jsx
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Todo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    const newTask = {
      text: task.text,
      category: task.category,
      dueDate: task.dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(indexToDelete) {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  }

  // FIXED: Synchronized to use array index exclusively
  function toggleComplete(indexToToggle) {
    const updatedTasks = tasks.map((task, index) =>
      index === indexToToggle ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  // ADDED: Missing edit modification function
  function editTask(indexToEdit, updatedTask) {
    const updatedTasks = tasks.map((task, index) => 
      index === indexToEdit ? updatedTask : task
    );
    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // Filter button utility styler
  const getFilterBtnStyle = (type) => ({
    padding: "6px 14px",
    fontSize: "13px",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: filter === type ? "var(--accent-bg)" : "var(--card-bg)",
    color: filter === type ? "var(--accent)" : "var(--text)",
    borderColor: filter === type ? "var(--accent)" : "var(--border)",
  });

  return (
    <div className="card" style={{ textAlign: "left", width: "100%" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>Task Workspace</h2>

      <TodoForm addTask={addTask} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "25px", marginBottom: "15px" }}>
        <h3 style={{ fontSize: "15px", margin: 0, color: "var(--text)" }}>Active Items</h3>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => setFilter("all")} style={getFilterBtnStyle("all")}>All</button>
          <button onClick={() => setFilter("active")} style={getFilterBtnStyle("active")}>Active</button>
          <button onClick={() => setFilter("completed")} style={getFilterBtnStyle("completed")}>Done</button>
        </div>
      </div>

      <TodoList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        editTask={editTask} // FIXED: Passed down missing functional reference
        toggleComplete={toggleComplete}
      />
    </div>
  );
}