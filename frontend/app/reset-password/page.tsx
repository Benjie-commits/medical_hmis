"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, token, new_password: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful! You can now log in.");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9f0f4" }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Reset Password</h2>
        <p style={{ color: "#888", marginBottom: "1.5rem" }}>Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "1rem", fontSize: "1rem" }}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "1rem", fontSize: "1rem" }}
          />
          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
          {message && <p style={{ color: "green", marginBottom: "1rem" }}>{message}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", padding: "0.75rem", background: "#a03060", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer" }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <a href="/" style={{ display: "block", textAlign: "center", marginTop: "1rem", color: "#a03060" }}>Back to login</a>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}