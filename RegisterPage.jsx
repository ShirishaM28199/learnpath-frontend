import { useState, useEffect } from "react";
import { FormField } from "../components/shared";

function RegisterPage({ onRegister, navigate, user }) {
  const [form,    setForm]    = useState({ name: "", email: "", password: "", confirm: "", role: "STUDENT" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) navigate("/"); }, [user]);

  const update = f => e => { setForm(p => ({ ...p, [f]: e.target.value })); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 900));
    
      onRegister(form.name.trim(), form.email.trim(), form.password, form.role);
      navigate(
        form.role === "INSTRUCTOR" ? "/instructor/dashboard" :
        form.role === "ADMIN"      ? "/admin/courses"        :
        "/my-courses"
      );
    } catch (err) {
      
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ROLE_CARDS = [
    { value: "STUDENT",    emoji: "🎓", title: "Student",    desc: "Browse & enroll in courses" },
    { value: "INSTRUCTOR", emoji: "🏫", title: "Instructor", desc: "Create & teach courses"      },
    { value: "ADMIN",      emoji: "🛡️", title: "Admin",      desc: "Manage & approve courses"   },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingTop: 68, background: "linear-gradient(160deg,#f0f0ff 0%,#f8f9fe 60%,#fff9f0 100%)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-1px", marginBottom: 10 }}>
            Create your account
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>
            Already have one?{" "}
            <button onClick={() => navigate("/login")}
              style={{ background: "none", border: "none", color: "#6C63FF", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
              Sign in
            </button>
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: "48px 44px", boxShadow: "0 20px 60px rgba(108,99,255,0.08)" }}>

       
          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #feb2b2", color: "#c53030", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ flexShrink: 0, marginTop: 1 }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

         
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#4a5568", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>
              I am a…
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              {ROLE_CARDS.map(r => (
                <button key={r.value}
                  onClick={() => setForm(p => ({ ...p, role: r.value }))}
                  style={{ flex: 1, padding: "18px 12px", borderRadius: 14, border: `2px solid ${form.role === r.value ? "#6C63FF" : "#e2e8f0"}`, background: form.role === r.value ? "#f0efff" : "#fafafa", cursor: "pointer", textAlign: "center", transition: "all 0.2s", boxShadow: form.role === r.value ? "0 0 0 4px rgba(108,99,255,0.1)" : "none", position: "relative" }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{r.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{r.desc}</div>
                  {form.role === r.value && (
                    <div style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", background: "#6C63FF", color: "#fff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 18 }}>
              <FormField label="Full Name"  type="text"     value={form.name}     onChange={update("name")}     placeholder="Jane Smith"      />
              <FormField label="Email"      type="email"    value={form.email}    onChange={update("email")}    placeholder="jane@email.com"  />
            </div>
            <div style={{ display: "flex", gap: 18 }}>
              <FormField label="Password"         type="password" value={form.password} onChange={update("password")} placeholder="Min. 6 chars"    />
              <FormField label="Confirm Password" type="password" value={form.confirm}  onChange={update("confirm")}  placeholder="Repeat password" />
            </div>
            <button type="submit" disabled={loading}
              style={{ padding: "15px", background: loading ? "#c4c4f0" : "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginTop: 4, boxShadow: loading ? "none" : "0 4px 16px rgba(108,99,255,0.3)" }}>
              {loading
                ? "Creating account…"
                : `Create ${form.role.charAt(0) + form.role.slice(1).toLowerCase()} Account →`
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
