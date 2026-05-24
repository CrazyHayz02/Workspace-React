// src/pages/Notes.jsx
import { useState, useEffect } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('dashboard_notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('dashboard_notes', JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (!text.trim()) return;

    if (editingId) {
      setNotes(notes.map(note => note.id === editingId ? { ...note, content: text } : note));
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        content: text,
        date: new Date().toLocaleDateString('en-GB') // Standard UK formatting
      };
      setNotes([newNote, ...notes]);
    }
    setText('');
  };

  const handleEdit = (note) => {
    setText(note.content);
    setEditingId(note.id);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setText('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setText('');
  };

  // Reusable inline form styling configurations
  const fieldStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid var(--border)",
    backgroundColor: "var(--bg)",
    color: "var(--text-h)",
    outline: "none",
    fontSize: "15px",
    fontFamily: "inherit",
    resize: "vertical",
    marginBottom: "12px"
  };

  const actionBtnStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    border: "1px solid var(--border)"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px", width: "100%", textAlign: "left" }}>
      
      {/* Editor Box */}
      <div className="card" style={{ padding: "24px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px" }}>
          {editingId ? '📝 Edit Note' : '✍️ Notebook Workspace'}
        </h2>
        <textarea 
          placeholder="Write down something awesome..." 
          rows="4" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={fieldStyle}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          {editingId && (
            <button 
              onClick={handleCancel}
              style={{ ...actionBtnStyle, backgroundColor: "transparent", color: "var(--text)" }}
            >
              Cancel
            </button>
          )}
          <button 
            onClick={handleSave}
            style={{ ...actionBtnStyle, backgroundColor: "var(--accent)", color: "#fff", border: "none" }}
          >
            {editingId ? 'Update Note' : 'Save Note'}
          </button>
        </div>
      </div>

      {/* Dynamic Grid Display Matrix */}
      <h3 style={{ fontSize: "16px", color: "var(--text)", margin: "10px 0 0 0" }}>Saved Notes</h3>
      
      {notes.length === 0 ? (
        <div className="card" style={{ padding: "40px", textAlign: "center", borderStyle: "dashed", color: "var(--text)" }}>
          No notes saved yet. Type something above to get started!
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "20px" 
        }}>
          {notes.map(note => (
            <div key={note.id} className="card" style={{ 
              padding: "20px", 
              display: "flex", 
              flexDirection: "column", 
              justifyContent: "space-between",
              minHeight: "150px"
            }}>
              <p style={{ 
                margin: "0 0 20px 0", 
                color: "var(--text-h)", 
                fontSize: "15px", 
                whiteSpace: "pre-wrap",
                lineHeight: "1.5"
              }}>
                {note.content}
              </p>
              
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                borderTop: "1px solid var(--border)",
                paddingTop: "12px"
              }}>
                <span style={{ fontSize: "12px", color: "var(--text)" }}>{note.date}</span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button 
                    onClick={() => handleEdit(note)}
                    style={{ ...actionBtnStyle, padding: "4px 10px", fontSize: "12px", backgroundColor: "transparent" }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(note.id)}
                    style={{ ...actionBtnStyle, padding: "4px 10px", fontSize: "12px", backgroundColor: "transparent", color: "#ef4444", borderColor: "#ef4444" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}