import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [backendMessage, setBackendMessage] = useState("Connecting to backend...");
  const [status, setStatus] = useState("Pending");

  // Uses environment variable or your live Vercel backend directly
  const backendUrl = process.env.REACT_APP_API_URL || "https://mern-backend-six-rouge.vercel.app";

  useEffect(() => {
    fetch(`${backendUrl}/api/status`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setBackendMessage(data.message);
        setStatus(data.status);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setBackendMessage("Unable to reach backend service");
        setStatus("Offline");
      });
  }, [backendUrl]);

  return (
    <div style={{ textAlign: "center", marginTop: "60px", fontFamily: "Segoe UI, sans-serif" }}>
      <h1 style={{ color: "#1e293b" }}>Web Technology Lab - Experiment 10</h1>
      <h3 style={{ color: "#475569" }}>MERN Stack Cloud Deployment</h3>

      <div
        style={{
          display: "inline-block",
          marginTop: "25px",
          padding: "28px 36px",
          border: "1px solid #cbd5e1",
          borderRadius: "12px",
          backgroundColor: "#f8fafc",
          textAlign: "left",
          boxShadow: "0 6px 12px -2px rgba(0, 0, 0, 0.08)",
          minWidth: "360px"
        }}
      >
        <p><strong>Frontend Host:</strong> Vercel</p>
        <p><strong>Backend Host:</strong> Vercel (Serverless Express)</p>
        <p><strong>Database:</strong> MongoDB Atlas (Connected)</p>
        <hr style={{ margin: "16px 0", borderColor: "#e2e8f0" }} />
        <p>
          <strong>Backend Status: </strong>
          <span style={{ color: status === "Online" ? "#16a34a" : "#dc2626", fontWeight: "bold" }}>
            {status}
          </span>
        </p>
        <p><strong>Server Message:</strong> {backendMessage}</p>
      </div>
    </div>
  );
}

export default App;