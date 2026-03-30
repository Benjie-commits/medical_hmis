"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, roleRoutes } from "@/services/api/auth";
import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload, UserRole } from "@/types/auth";

export function LoginForm() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<LoginPayload>({
    username: "",
    password: "",
    role: "doctor",
    rememberDevice: false
  });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await login(form);
      setSession(response.user, response.access);
      router.replace(roleRoutes[response.user.role] || "/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="right">
      <div className="sys-tag">
        <span className="sys-dot" />
        System online
      </div>

      <div className="form-title">Welcome back</div>
      <div className="form-sub">Sign in to the Hospital Management System.<br />Select your role before entering credentials.</div>

      <div className="role-section-label">I am a -</div>
      <div className="role-grid">
        {[
          ["doctor", "Doctor"],
          ["nurse", "Nurse"],
          ["receptionist", "Receptionist"],
          ["pharmacist", "Pharmacist"],
          ["lab_technician", "Lab technician"],
          ["manager", "Hospital manager"],
          ["patient", "Student / Staff"]
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`role-chip ${form.role === value ? "active" : "idle"}`}
            onClick={() => setForm((prev) => ({ ...prev, role: value as UserRole }))}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="role-form-divider" />
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="field-label">Staff ID / Username</label>
          <div className="field-inner">
            <input
              className={`f-input ${form.username ? "has-value" : ""}`}
              type="text"
              value={form.username}
              onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="field-label">Password</label>
          <div className="field-inner">
            <input
              className="f-input"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              required
            />
            <span className="field-right" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <div className="row-util">
          <label className="remember">
            <input
              type="checkbox"
              checked={form.rememberDevice}
              onChange={(e) => setForm((prev) => ({ ...prev, rememberDevice: e.target.checked }))}
            />
            Remember this device
          </label>
          <a className="forgot" href="/forgot-password">
            Forgot password?
          </a>
        </div>

        {error ? <p className="error-msg">{error}</p> : null}

        <button className="btn-cta" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in securely"}
        </button>
      </form>
    </div>
  );
}
