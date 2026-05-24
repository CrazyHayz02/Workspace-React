// src/components/TodoItem.jsx
import { useState } from "react";

export default function TodoItem({ task, index, deleteTask, editTask, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedCategory, setEditedCategory] = useState(task.category);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate || "");

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "2-digit" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  function handleSave() {
    if (!editedText.trim()) return;
    editTask(index, { ...task, text: editedText, category: editedCategory, dueDate: editedDueDate });
    setIsEditing(false);
  }

  // 1. Dynamic Category Color Lookup System
  const getCategoryStyles = (categoryName) => {
    const colors = {
      General:   { text: "#64748b", bg: "rgba(100, 116, 139, 0.15)" }, // Slate Gray
      Learning:  { text: "#3b82f6", bg: "rgba(59, 130, 246, 0.15)" },  // Accent Blue
      Work:      { text: "#a855f7", bg: "rgba(168, 85, 247, 0.15)" },  // Purple
      Health:    { text: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },  // Emerald Green
      Essential: { text: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },   // Red Alert
      Home:      { text: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },   // Amber Orange
      Personal:  { text: "#ec4899", bg: "rgba(236, 72, 153, 0.15)" },  // Rose Pink
      Errands:   { text: "#06b6d4", bg: "rgba(6, 182, 212, 0.15)" },   // Cyan
      Quick:     { text: "#14b8a6", bg: "rgba(20, 184, 166, 0.15)" }    // Teal
    };

    // Fallback default style if a custom category isn't matched
    return colors[categoryName] || { text: "var(--accent)", bg: "var(--accent-bg)" };
  };

  const currentCategoryStyle = getCategoryStyles(task.category);

  // Shared form input design variables
  const fieldStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--bg)",
    color: "var(--text-h)",
    outline: "none",
    fontSize: "14px"
  };

  const actionBtnStyle = { padding: "4px 8px", fontSize: "12px", margin: "0 2px" };

  return (
    <li style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      padding: "12px", 
      borderBottom: "1px solid var(--border)",
      listStyleType: "none"
    }}>
      {isEditing ? (
        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
          <input 
            type="text" 
            value={editedText} 
            onChange={(e) => setEditedText(e.target.value)} 
            style={{ ...fieldStyle, flex: 1 }} 
          />

          <select 
            value={editedCategory} 
            onChange={(e) => setEditedCategory(e.target.value)} 
            style={fieldStyle}
          >
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
            value={editedDueDate} 
            onChange={(e) => setEditedDueDate(e.target.value)} 
            style={fieldStyle}
          />

          <button 
            onClick={handleSave}
            style={{ backgroundColor: "var(--accent)", color: "#fff", border: "none", padding: "0 16px", borderRadius: "8px", cursor: "pointer" }}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            <span onClick={() => toggleComplete(index)} style={{ cursor: "pointer", fontSize: "18px" }}>
              {task.completed ? "✅" : "⬜"}
            </span>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ 
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "var(--text)" : "var(--text-h)",
                fontSize: "15px",
                fontWeight: "500"
              }}>
                {task.text}
              </span>
              <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                
                {/* 2. DYNAMICALLY STYLED CATEGORY PILL */}
                <span style={{ 
                  fontSize: "11px", 
                  padding: "2px 8px", 
                  borderRadius: "4px", 
                  fontWeight: "600",
                  backgroundColor: currentCategoryStyle.bg, 
                  color: currentCategoryStyle.text,
                  transition: "all 0.2s ease"
                }}>
                  {task.category}
                </span>

                {task.dueDate && (
                  <span style={{ fontSize: "11px", padding: "2px 6px", borderRadius: "4px", backgroundColor: "var(--border)", color: "var(--text)" }}>
                    📅 {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <button onClick={() => setIsEditing(true)} style={actionBtnStyle}>Edit</button>
            <button onClick={() => deleteTask(index)} style={{ ...actionBtnStyle, color: "#ef4444" }}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}