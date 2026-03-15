import { useState, useEffect } from "react";
import { SideBar } from "../components/shared";

function MyCoursesPage({ user, courses, onUpdateProgress, navigate }) {
  const [filter, setFilter] = useState("ALL");
  const [updating, setUpdating] = useState(null);

  const filtered = filter === "ALL" ? courses : courses.filter(c => c.progressStatus === filter);
  const STATUS = {
    NOT_STARTED: { bg: "#f1f5f9", text: "#64748b", dot: "#94a3b8", label: "Not Started" },
    IN_PROGRESS:  { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b", label: "In Progress" },
    COMPLETED:    { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e", label: "Completed" },
  };

  const handleUpdate = async (id, status) => {
    setUpdating(id + status);
    await new Promise(r => setTimeout(r, 350));
    onUpdateProgress(id, status);
    setUpdating(null);
  };

  const progressPct = (status) =>
    status === "COMPLETED" ? 100 : status === "IN_PROGRESS" ? 48 : 0;

  
  useEffect(() => { if (!user) navigate("/login"); }, [user]);
  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 68 }}>
      <SideBar user={user} active="/my-courses" navigate={navigate} />
      <div style={{ flex: 1, padding: "40px 40px", background: "#f8f9fe" }}>

      
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, letterSpacing: "-0.5px" }}>My Learning</h1>
            <p style={{ color: "#94a3b8", fontSize: 15 }}>Pick up where you left off and keep the momentum going.</p>
          </div>
          <button onClick={() => navigate("/courses")} style={{ padding: "12px 22px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(108,99,255,0.3)" }}>
            + Browse Courses
          </button>
        </div>

     
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          {[
            ["📚", courses.length, "Enrolled", "#6C63FF"],
            ["🔥", courses.filter(c => c.progressStatus === "IN_PROGRESS").length, "In Progress", "#f59e0b"],
            ["🏆", courses.filter(c => c.progressStatus === "COMPLETED").length, "Completed", "#22c55e"],
          ].map(([icon, num, lbl, color]) => (
            <div key={lbl} style={{ flex: "1 1 160px", background: "#fff", borderRadius: 16, padding: "20px 22px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color }}>{num}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>{lbl}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {["ALL", "NOT_STARTED", "IN_PROGRESS", "COMPLETED"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "8px 18px", borderRadius: 100, border: `1.5px solid ${filter === f ? "#6C63FF" : "#e2e8f0"}`, background: filter === f ? "#6C63FF" : "#fff", color: filter === f ? "#fff" : "#718096", fontSize: 13, fontWeight: filter === f ? 700 : 500, cursor: "pointer", transition: "all 0.2s" }}>
              {f === "ALL" ? "All Courses" : STATUS[f].label}
            </button>
          ))}
        </div>

       
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎒</div>
            <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 20 }}>
              {courses.length === 0 ? "No courses yet! Start browsing." : "No courses match this filter."}
            </p>
            {courses.length === 0 && (
              <button onClick={() => navigate("/courses")} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
                Browse Courses →
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {filtered.map(enrollment => {
              const cfg = STATUS[enrollment.progressStatus] || STATUS.NOT_STARTED;
              const pct = progressPct(enrollment.progressStatus);
              const lessonCount = enrollment.lessons?.length || 0;
              return (
                <div key={enrollment.id} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #f0f4f8" }}>
                  <div style={{ display: "flex" }}>
               
                    <div style={{ width: 120, background: enrollment.coverColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, flexShrink: 0 }}>
                      {enrollment.emoji}
                    </div>

                
                    <div style={{ flex: 1, padding: "22px 26px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div style={{ flex: 1, paddingRight: 16 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <span style={{ padding: "3px 10px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 11, fontWeight: 700 }}>{enrollment.category}</span>
                            <span style={{ padding: "3px 10px", borderRadius: 100, background: "#f8f9fe", color: "#94a3b8", fontSize: 11 }}>
                              {lessonCount} lesson{lessonCount !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.3 }}>{enrollment.title}</h3>
                          <p style={{ fontSize: 13, color: "#94a3b8" }}>by {enrollment.instructorName}</p>
                        </div>
                    
                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, background: cfg.bg, color: cfg.text, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
                          {cfg.label}
                        </div>
                      </div>

                   
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: "#94a3b8" }}>Progress</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: pct === 100 ? "#15803d" : "#6C63FF" }}>{pct}%</span>
                        </div>
                        <div style={{ height: 7, borderRadius: 100, background: "#f0f4f8", overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#6C63FF,#a78bfa)", borderRadius: 100, transition: "width 0.6s ease" }} />
                        </div>
                      </div>

                    
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                     
                        <button onClick={() => navigate(`/learn/${enrollment.id}`)}
                          style={{ padding: "9px 20px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(108,99,255,0.3)" }}>
                          {enrollment.progressStatus === "NOT_STARTED" ? "▶ Start Learning" : enrollment.progressStatus === "COMPLETED" ? "📖 Review Course" : "▶ Continue Learning"}
                        </button>

                     
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 12, color: "#94a3b8" }}>Mark as:</span>
                          {["NOT_STARTED", "IN_PROGRESS", "COMPLETED"].map(opt => (
                            <button key={opt} onClick={() => handleUpdate(enrollment.id, opt)}
                              disabled={!!updating || enrollment.progressStatus === opt}
                              style={{ padding: "6px 12px", border: `1.5px solid ${enrollment.progressStatus === opt ? cfg.dot : "#e2e8f0"}`, borderRadius: 7, background: enrollment.progressStatus === opt ? cfg.bg : "#f7f8fc", color: enrollment.progressStatus === opt ? cfg.text : "#718096", fontSize: 12, cursor: enrollment.progressStatus === opt ? "default" : "pointer", fontWeight: enrollment.progressStatus === opt ? 700 : 500, transition: "all 0.15s", opacity: updating === enrollment.id + opt ? 0.5 : 1 }}>
                              {updating === enrollment.id + opt ? "…" : STATUS[opt].label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCoursesPage;