// src/pages/Profile.jsx
export default function Profile() {
  return (
    <div style={{ maxWidth: "600px", width: "100%", margin: "0 auto", textAlign: "left" }}>
      <div style={{ marginBottom: "25px" }}>
        <h1 style={{ margin: "0 0 6px 0", fontSize: "28px" }}>User Profile</h1>
        <p style={{ color: "var(--text)", fontSize: "15px" }}>Manage your workspace identity settings.</p>
      </div>

      <div className="card" style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Avatar Header Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ 
            width: "70px", 
            height: "70px", 
            borderRadius: "50%", 
            backgroundColor: "var(--accent-bg)", 
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: "bold"
          }}>
            A
          </div>
          <div>
            <h2 style={{ margin: "0 0 4px 0", fontSize: "20px" }}>Aaron</h2>
            <p style={{ margin: 0, fontSize: "14px", color: "var(--text)" }}>Full-Stack Developer Workspace</p>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />

        {/* Info Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", color: "var(--text)", fontWeight: "500" }}>Account Status</span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#22c55e" }}>Active Local Administrator</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "14px", color: "var(--text)", fontWeight: "500" }}>Environment</span>
            <span style={{ fontSize: "14px", fontFamily: "var(--mono)", color: "var(--text-h)" }}>Development (Local)</span>
          </div>
        </div>
      </div>
    </div>
  );
}