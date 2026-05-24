// src/pages/Settings.jsx
export default function Settings() {
  const toggleRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid var(--border)"
  };

  return (
    <div style={{ maxWidth: "600px", width: "100%", margin: "0 auto", textAlign: "left" }}>
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ margin: "0 0 6px 0", fontSize: "28px" }}>Control Center Settings</h1>
        <p style={{ color: "var(--text)", fontSize: "15px" }}>Configure global workspace layout properties.</p>
      </div>

      <div className="card" style={{ padding: "30px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>Preferences</h2>
        
        <div style={{ display: "flex", flexDirection: "column" }}>

          <div style={{ ...toggleRowStyle, borderBottom: "none", paddingTop: "16px" }}>
            <div>
              <p style={{ margin: "0 0 2px 0", fontWeight: "600", color: "var(--text-h)", fontSize: "15px" }}>Local Persistence Storage</p>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--text)" }}>Sync notes and tasks automatically to localStorage.</p>
            </div>
            <span style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "4px", backgroundColor: "var(--accent-bg)", color: "var(--accent)", fontWeight: "600" }}>
              ENABLED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}