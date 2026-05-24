import React, { useState, useEffect } from 'react';

function Notes() {
  // 1. Initialize state from localStorage (or default to empty array)
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('dashboard_notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);

  // 2. Automatically sync notes to localStorage whenever the notes array changes
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
        date: new Date().toLocaleDateString()
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

  return (
    <div className="notes-container">
      {/* Editor Box */}
      <div className="card note-form">
        <h2>{editingId ? 'Edit Note' : 'Notes'}</h2>
        <textarea 
          placeholder="Write down something awesome..." 
          rows="5" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="note-form-actions">
          {editingId && (
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
          <button onClick={handleSave}>
            {editingId ? 'Update Note' : 'Save Note'}
          </button>
        </div>
      </div>

      {/* Grid Display */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="notes-empty-state">
            No notes saved yet. Type something above to get started!
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="card note-card">
              <p className="note-content">{note.content}</p>
              <div className="note-footer">
                <span className="note-date">{note.date}</span>
                <div className="note-controls">
                  <button className="note-action-btn btn-secondary" onClick={() => handleEdit(note)}>
                    Edit
                  </button>
                  <button className="note-action-btn delete" onClick={() => handleDelete(note.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;