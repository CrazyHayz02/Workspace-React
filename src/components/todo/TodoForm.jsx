// src/components/TodoForm.jsx
import { useState } from "react";

export default function TodoForm({ addTask }) {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("General");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    addTask({ text: input, category, dueDate });
    setInput("");
    setCategory("General");
    setDueDate("");
  }

  const fieldStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--bg)",
    color: "var(--text-h)",
    outline: "none",
    fontSize: "14px"
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", width: "100%" }}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ ...fieldStyle, flex: 1 }}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} style={fieldStyle}>
        <option>General</option>
        <option>Learning</option>
        <option>Work</option>
        <option>Health</option>
        <option>Essential</option>
        <option>Home</option>
        <option>Personal</option>
        <option>Errands</option>
        <option>Quick</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={fieldStyle}
      />

      <button type="submit" style={{ backgroundColor: "var(--accent)", color: "#fff", border: "none", padding: "0 16px", borderRadius: "8px" }}>
        Add
      </button>
    </form>
  );
}