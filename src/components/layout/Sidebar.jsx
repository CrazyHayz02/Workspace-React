import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyles = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1rem",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "0.95rem",
    color: isActive ? "var(--accent)" : "var(--text)",
    backgroundColor: isActive ? "var(--accent-bg)" : "transparent",
    transition: "all 0.2s ease"
  });

  return (
    <aside style={{
      width: "240px",
      backgroundColor: "var(--card-bg)",
      borderRight: "1px solid var(--border)",
      padding: "1.5rem 1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    }}>
      <NavLink to="/dashboard" style={linkStyles}>Dashboard</NavLink>
      <NavLink to="/Notes" style={linkStyles}>Notes</NavLink>
      <NavLink to="/profile" style={linkStyles}>Profile</NavLink>
      <NavLink to="/settings" style={linkStyles}>Settings</NavLink>
    </aside>
  );
}