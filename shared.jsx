import { useState } from "react";
export function SideBar({ user, active, navigate }) {
  const links = user?.role === "ADMIN"
    ? [["🛡️ Approvals", "/admin/courses"]]
    : user?.role === "INSTRUCTOR"
    ? [["📊 Dashboard", "/instructor/dashboard"], ["➕ New Course", "/instructor/create-course"]]
    : [["🏠 Browse", "/courses"], ["📚 My Learning", "/my-courses"]];

  return (
    <div style={{ width: 220, background: "#fff", borderRight: "1px solid #e2e8f0", padding: "28px 20px", display: "flex", flexDirection: "column", gap: 28, position: "sticky", top: 68, height: "calc(100vh - 68px)", flexShrink: 0 }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {links.map(([label, href]) => (
          <button key={href} onClick={() => navigate(href)}
            style={{ padding: "10px 14px", borderRadius: 10, background: active === href ? "#f0efff" : "transparent", color: active === href ? "#6C63FF" : "#718096", border: "none", textAlign: "left", fontSize: 14, fontWeight: active === href ? 700 : 500, cursor: "pointer", transition: "all 0.15s" }}>
            {label}
          </button>
        ))}
      </nav>
      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15 }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>{user?.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function PageFooter({ navigate }) {
  return (
    <footer style={{ background: "#0f0c29", color: "#64748b", padding: "60px 28px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, cursor: "pointer" }} onClick={() => navigate("/")}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#6C63FF,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M4 16L10 4L16 16H4Z" fill="white" opacity="0.9"/><circle cx="10" cy="11" r="3" fill="#FFD166"/></svg>
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>LearnHub</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>Empowering lifelong learners worldwide with expert-led, affordable courses.</p>
          </div>
          {[
            ["Learn", [["Browse Courses","/courses"],["About Us","/about"],["Pricing","/pricing"]]],
            ["Account", [["Sign In","/login"],["Register","/register"],["My Courses","/my-courses"]]],
            ["Company", [["About","/about"],["Blog","#"],["Careers","#"],["Contact","#"]]],
          ].map(([title, links]) => (
            <div key={title}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 18 }}>{title}</div>
              {links.map(([l, href]) => (
                <div key={l} style={{ fontSize: 14, marginBottom: 10, cursor: "pointer" }}
                  onClick={() => navigate(href)}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#64748b"}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13 }}>© 2026 LearnHub. All rights reserved.</div>
          <div style={{ display: "flex", gap: 20, fontSize: 13 }}>
            {["Privacy","Terms","Cookies"].map(l => <span key={l} style={{ cursor: "pointer" }}>{l}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HomeCourseCard({ course, navigate }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="hover-card" onClick={() => navigate(`/enroll/${course.id}`)}
      style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", cursor: "pointer", transition: "all 0.25s", border: "1px solid #f0f4f8" }}>

      {/* ── Cover image (real photo, falls back to gradient+emoji) ── */}
      <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
        {course.image && !imgErr ? (
          <img
            src={course.image}
            alt={course.title}
            onError={() => setImgErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.35s", }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        ) : (
          <div style={{ height: "100%", background: course.coverColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54 }}>
            {course.emoji}
          </div>
        )}
      </div>

      <div style={{ padding: "20px 22px 22px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <span style={{ padding: "3px 10px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 11, fontWeight: 700 }}>{course.category}</span>
          <span style={{ padding: "3px 10px", borderRadius: 100, background: "#f0fdf4", color: "#15803d", fontSize: 11, fontWeight: 700 }}>{course.level}</span>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 8, lineHeight: 1.4 }}>{course.title}</h3>
        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{course.description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #f0f4f8" }}>
          <div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>by {course.instructorName}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>📖 {course.lessonCount} lessons · 👥 {course.enrolledCount.toLocaleString()}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ color: "#FFD166", fontSize: 14 }}>★</span>
            <span style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>{course.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8ecf4", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{q}</span>
        <span style={{ fontSize: 18, color: "#6C63FF", transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: 12 }}>+</span>
      </button>
      {open && <div style={{ padding: "0 24px 20px", fontSize: 14, color: "#64748b", lineHeight: 1.8, borderTop: "1px solid #f0f4f8" }}>{a}</div>}
    </div>
  );
}

export function FormField({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{label}</label>
      <input type={type || "text"} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, color: "#1a1a2e", background: "#fafbff", outline: "none" }} />
    </div>
  );
}