// src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// 1. The Protection Guard Component
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// 2. Upgraded Controlled Login Form Component
function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  // Controlled input states (Single source of truth)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation error states
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault(); // Stop standard browser page refresh on form submit
    
    let isValid = true;
    let localErrors = { email: "", password: "" };

    // Email Regex Validation Rule
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      localErrors.email = "Email field cannot be empty";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      localErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Length Validation Rule
    if (!password) {
      localErrors.password = "Password field cannot be empty";
      isValid = false;
    } else if (password.length < 6) {
      localErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    // If validation fails, update errors state and halt submission
    if (!isValid) {
      setErrors(localErrors);
      return;
    }

    // If all validation rules pass:
    setIsAuthenticated(true);
    navigate("/dashboard"); // Auto-redirect to dashboard workspace
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--bg)",
      padding: "20px"
    }}>
      <form onSubmit={handleLogin} className="card" style={{
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: "0 0 8px 0" }}>Sign In</h2>
          <p style={{ color: "var(--text)", fontSize: "15px" }}>Access your internal control workspace</p>
        </div>

        {/* Email Input Field container */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-h)" }}>Email Address</label>
          <input 
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // Clear error highlight state as soon as user types a new character
              if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
            }}
            placeholder="name@domain.com"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: `1px solid ${errors.email ? "#ef4444" : "var(--border)"}`,
              backgroundColor: "var(--card-bg)",
              color: "var(--text-h)",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
          />
          {errors.email && <span style={{ color: "#ef4444", fontSize: "13px" }}>{errors.email}</span>}
        </div>

        {/* Password Input Field container */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-h)" }}>Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              // Clear error highlight state as soon as user types a new character
              if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
            }}
            placeholder="••••••••"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: `1px solid ${errors.password ? "#ef4444" : "var(--border)"}`,
              backgroundColor: "var(--card-bg)",
              color: "var(--text-h)",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
          />
          {errors.password && <span style={{ color: "#ef4444", fontSize: "13px" }}>{errors.password}</span>}
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: "14px 20px", 
            cursor: "pointer", 
            background: "var(--accent)", 
            color: "#fff", 
            border: "none", 
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            marginTop: "10px",
            boxShadow: "var(--shadow)"
          }}
        >
          Authenticate Account
        </button>
      </form>
    </div>
  );
}

// 3. Main Application Entry Core
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      {/* Hide the headers and panel navigation if we're on the login form page */}
      {isAuthenticated && <Navbar />}

      <div style={{ display: "flex", minHeight: isAuthenticated ? "calc(100vh - 64px)" : "100vh" }}>
        {isAuthenticated && <Sidebar />}

        <div style={{ 
          padding: isAuthenticated ? "20px" : "0px", 
          width: "100%",
          backgroundColor: "var(--bg)"
        }}>
          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

            {/* Protected Core Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Settings />
              </ProtectedRoute>
            } />

            {/* Fallback Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;