import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function UserStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setStats(res.data))
      .catch((err) => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>;
  if (error)
    return <h2 style={{ textAlign: "center", marginTop: "100px", color: "red" }}>{error}</h2>;
  if (!stats)
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>No stats available</h2>;

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "50px auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>👥 User Statistics</h1>
      <hr style={{ margin: "20px 0" }} />

      <div style={{ textAlign: "center", fontSize: "18px" }}>
        <p><b>Total Users:</b> {stats.totalUsers}</p>
        <p><b>Admins:</b> {stats.roleBreakdown?.admin}</p>
        <p><b>Experts:</b> {stats.roleBreakdown?.expert}</p>
        <p><b>Citizens:</b> {stats.roleBreakdown?.citizen}</p>
      </div>

      <hr style={{ margin: "30px 0" }} />
      <h3 style={{ textAlign: "center" }}>All Users</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {stats.users.map((u, i) => (
          <li
            key={i}
            style={{
              margin: "10px 0",
              padding: "10px",
              background: "#f9f9f9",
              borderRadius: "6px",
            }}
          >
            <b>{u.name}</b> — {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserStats;
