import { Link } from "react-router-dom";


function Navbar() {
return (
    <header style={{
      height: "64px",
      backgroundColor: "var(--card-bg)",
      borderBottom: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "between",
      padding: "0 2rem",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
        <div style={{ width: "32px", height: "32px", backgroundColor: "var(--accent)", borderRadius: "8px" }} />
        <span style={{ fontWeight: 700, color: "var(--text-h)", fontSize: "1.2rem" }}>PortalOS</span>
      </Link>
    </header>
  );
}

export default Navbar