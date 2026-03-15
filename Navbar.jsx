import { useState, useEffect } from "react";

export default function Navbar({ user, onLogout, navigate, path }) {
  const [dropOpen, setDropOpen] = useState(false);

  const go = (p) => { navigate(p); setDropOpen(false); };

  const roleRoute = user?.role === "INSTRUCTOR" ? "/instructor/dashboard"
    : user?.role === "ADMIN" ? "/admin/courses"
    : "/my-courses";

  const NAV_LINKS = [
    { label: "Courses", href: "/courses" },
    { label: "About",   href: "/about"   },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lp-navlink {
          position: relative;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          color: #4a4a6a;
          transition: all 0.18s;
        }
        .lp-navlink:hover { color: #6C63FF; background: #f0efff; }
        .lp-navlink.active { color: #6C63FF; font-weight: 700; background: #f0efff; }
        .lp-navlink.active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 16px; right: 16px;
          height: 2px;
          background: #6C63FF;
          border-radius: 2px;
        }
        .lp-drop-item { transition: all 0.15s; }
        .lp-drop-item:hover { background: #f5f3ff !important; color: #6C63FF !important; }
        button:focus { outline: none; }
        button:focus-visible { outline: 2px solid #6C63FF; outline-offset: 2px; }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: "#ffffff",
        borderBottom: "2px solid #f0f0f8",
        boxShadow: "0 2px 16px rgba(108,99,255,0.08)",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto",
          padding: "0 32px", height: 68,
          display: "flex", alignItems: "center",
        }}>

          {/* ── Logo ── */}
          <button onClick={() => go("/")} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "none", border: "none", outline: "none",
            cursor: "pointer", padding: 0, marginRight: 40, flexShrink: 0,
            WebkitAppearance: "none", appearance: "none",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 11,
              background: "linear-gradient(135deg, #6C63FF, #4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(108,99,255,0.4)",
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L10 4L16 16H4Z" fill="white" />
                <circle cx="10" cy="11.5" r="2.8" fill="#FFD166" />
              </svg>
            </div>
            <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px", color: "#0f0c29" }}>
              Learn<span style={{ color: "#6C63FF" }}>Path</span>
            </span>
          </button>

          {/* ── Nav links ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => go(href)}
                className={`lp-navlink${path === href ? " active" : ""}`}>
                {label}
              </button>
            ))}
          </nav>

          {/* ── Right ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!user ? (
              <>
                <button onClick={() => go("/login")} style={{
                  padding: "9px 22px", borderRadius: 9,
                  border: "1.5px solid #e0e0f0",
                  background: "transparent", color: "#4a4a6a",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#6C63FF"; e.currentTarget.style.color = "#6C63FF"; e.currentTarget.style.background = "#f0efff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e0e0f0"; e.currentTarget.style.color = "#4a4a6a"; e.currentTarget.style.background = "transparent"; }}>
                  Sign In
                </button>
                <button onClick={() => go("/register")} style={{
                  padding: "9px 22px", borderRadius: 9,
                  background: "linear-gradient(135deg, #6C63FF, #4f46e5)",
                  color: "#fff", border: "none",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(108,99,255,0.35)",
                  transition: "all 0.18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(108,99,255,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(108,99,255,0.35)"; }}>
                  Get Started
                </button>
              </>
            ) : (
              <div style={{ position: "relative" }}>
                <button onClick={() => setDropOpen(o => !o)} style={{
                  display: "flex", alignItems: "center", gap: 9,
                  padding: "6px 14px 6px 6px",
                  background: dropOpen ? "#f0efff" : "#fafafe",
                  border: `1.5px solid ${dropOpen ? "#6C63FF" : "#e0e0f0"}`,
                  borderRadius: 12, cursor: "pointer", transition: "all 0.18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#f0efff"; e.currentTarget.style.borderColor = "#6C63FF"; }}
                  onMouseLeave={e => { if (!dropOpen) { e.currentTarget.style.background = "#fafafe"; e.currentTarget.style.borderColor = "#e0e0f0"; } }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9,
                    background: "linear-gradient(135deg,#6C63FF,#a78bfa)",
                    color: "#fff", fontWeight: 800, fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{user.name}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "none" }}>
                    <path d="M2 4L6 8L10 4" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {dropOpen && (
                  <div style={{
                    position: "absolute", right: 0, top: "calc(100% + 8px)",
                    background: "#fff",
                    border: "1.5px solid #ebebf5",
                    borderRadius: 16, padding: "6px", minWidth: 215,
                    boxShadow: "0 16px 48px rgba(0,0,0,0.1), 0 4px 16px rgba(108,99,255,0.08)",
                    animation: "slideDown 0.18s ease",
                    zIndex: 100,
                  }}>
                    <div style={{ padding: "10px 14px 12px", borderBottom: "1px solid #f0f0f8", marginBottom: 4 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f0c29" }}>{user.name}</div>
                      <span style={{ display: "inline-block", marginTop: 4, padding: "2px 10px", background: "#f0efff", color: "#6C63FF", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>
                        {user.role}
                      </span>
                    </div>
                    {[["📊", "Dashboard", roleRoute], ["📚", "My Courses", "/my-courses"], ["⚙️", "Settings", "#"]].map(([icon, label, href]) => (
                      <button key={label} onClick={() => go(href)}
                        className="lp-drop-item"
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          width: "100%", padding: "10px 14px",
                          background: "none", border: "none",
                          textAlign: "left", fontSize: 14, color: "#4a4a6a",
                          cursor: "pointer", borderRadius: 10, fontWeight: 500,
                        }}>
                        <span style={{ fontSize: 16 }}>{icon}</span>{label}
                      </button>
                    ))}
                    <div style={{ borderTop: "1px solid #f0f0f8", marginTop: 4, paddingTop: 4 }}>
                      <button onClick={() => { onLogout(); setDropOpen(false); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          width: "100%", padding: "10px 14px",
                          background: "none", border: "none",
                          textAlign: "left", fontSize: 14, color: "#ef4444",
                          cursor: "pointer", borderRadius: 10, fontWeight: 600,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fff5f5"}
                        onMouseLeave={e => e.currentTarget.style.background = "none"}>
                        🚪 Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}