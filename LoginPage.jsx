import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../data/mockData";

function LoginPage({ onLogin, navigate, user }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("STUDENT");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  useEffect(() => { if (user) navigate("/"); }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 700));
      // ✅ onLogin throws if credentials are invalid
      onLogin(email.trim(), password, role);
      navigate(
        role === "INSTRUCTOR" ? "/instructor/dashboard" :
        role === "ADMIN"      ? "/admin/courses"        :
        "/my-courses"
      );
    } catch (err) {
      // ✅ Show the real error e.g. "Invalid email or password."
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 68, display: "flex", background: "#f8f9fe" }}>

      {/* ── Left panel ── */}
      <div style={{ flex: 1, background: "linear-gradient(145deg,#0f0c29,#1a1048)", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 50px" }}>
        <div style={{ maxWidth: 400 }}>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: "-1px" }}>
            Welcome<br />back.
          </h2>
          <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
            Continue your learning journey and pick up right where you left off.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{ flex: "0 0 520px", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, letterSpacing: "-0.5px" }}>Sign in</h2>
          <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 32 }}>
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")}
              style={{ background: "none", border: "none", color: "#6C63FF", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
              Create one
            </button>
          </p>

          {/* ✅ Error message */}
          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #feb2b2", color: "#c53030", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Role tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28, background: "#f1f5f9", borderRadius: 12, padding: "4px" }}>
            {["STUDENT", "INSTRUCTOR", "ADMIN"].map(r => (
              <button key={r} onClick={() => { setRole(r); setError(""); }}
                style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", background: role === r ? "#fff" : "transparent", color: role === r ? "#1a1a2e" : "#94a3b8", fontWeight: role === r ? 700 : 500, fontSize: 13, cursor: "pointer", boxShadow: role === r ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
                {r.charAt(0) + r.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 8 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                placeholder="you@example.com"
                style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 15, color: "#1a1a2e", background: "#fafafa", transition: "all 0.2s" }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 8 }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 15, color: "#1a1a2e", background: "#fafafa", transition: "all 0.2s" }}
              />
            </div>
            <button type="submit" disabled={loading}
              style={{ padding: "15px", background: loading ? "#c4c4f0" : "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 4, boxShadow: loading ? "none" : "0 4px 16px rgba(108,99,255,0.3)", transition: "all 0.2s" }}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          {/* Helper text */}
          <p style={{ marginTop: 20, fontSize: 12, color: "#94a3b8", textAlign: "center", lineHeight: 1.6 }}>
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")}
              style={{ background: "none", border: "none", color: "#6C63FF", fontWeight: 600, cursor: "pointer", fontSize: 12 }}>
              Register first
            </button>
            {" "}— then come back to sign in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
