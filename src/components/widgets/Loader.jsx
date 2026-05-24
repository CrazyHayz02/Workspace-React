export default function Loader({ message = "Syncing feed data..." }) {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "20px",
      gap: "12px"
    }}>
      <div style={{
        width: "28px",
        height: "28px",
        border: "3px solid var(--accent-bg)",
        borderTop: "3px solid var(--accent)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
      <span style={{ fontSize: "14px", color: "var(--text)" }}>{message}</span>
    </div>
  );
}