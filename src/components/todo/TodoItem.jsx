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

  // Shared structural aesthetic styles matching your main TodoForm fields
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
        /* Inline Modifying Edit Form Block */
        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
          <input 
            type="text" 
            value={editedText} 
            onChange={(e) => setEditedText(e.target.value)} 
            style={{ ...fieldStyle, flex: 1 }} // Styled identical to creation input
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
        /* Regular View State */
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
                <span style={{ fontSize: "11px", padding: "2px 6px", borderRadius: "4px", backgroundColor: "var(--accent-bg)", color: "var(--accent)" }}>
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