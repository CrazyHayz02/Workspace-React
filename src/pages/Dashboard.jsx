import WeatherWidget from "../components/widgets/WeatherWidget";
import CryptoWidget from "../components/widgets/CryptoWidget";
import Todo from "../components/todo/Todo";

export default function Dashboard() {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "30px", textAlign: "left" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "28px" }}>Workspace Overview</h1>
        <p style={{ color: "var(--text)", fontSize: "15px" }}>
          Real-time metrics and services dashboard panel.
        </p>
      </div>

      {/* Responsive layout configuration matrix structured in index.css */}
      <div className="dashboard-grid">
        <div className="card">
          <WeatherWidget />
        </div>
        
        <div className="card">
          <CryptoWidget />
        </div>

        {/* Placeholder Card for your Week 15 tasks */}
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center", borderStyle: "dashed" }}>
          <span style={{ color: "var(--text)", fontSize: "15px", fontStyle: "italic" }}>
            + Add Task Widget (Coming Next Week)
          </span>
        </div>
      </div>
      <div style={{ width: "100%", height: "100vh", paddingTop: "50px" }}>
        <Todo />
      </div>
    </div>
    
  );
}