import { useState } from "react";
import { SideBar } from "../components/shared";
import { useCourses } from "../context/CourseContext";

function AdminCoursesPage({ courses, navigate }) {
  const { instructorCourses, updateCourse } = useCourses();

  const allCourses = [
    ...instructorCourses.map(c => ({ ...c, _fromContext: true })),
    ...courses.map((c, i) => ({
      ...c,
      status: c.status || (["APPROVED","PENDING","APPROVED","REJECTED","PENDING","APPROVED"][i] || "PENDING"),
    })),
  ];

  const [filter, setFilter] = useState("PENDING");
  const [acting, setActing] = useState(null);
  const [toast,  setToast]  = useState(null);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleAction = async (id, action, isFromContext) => {
    setActing(id + action);
    await new Promise(r => setTimeout(r, 700));
    const newStatus = action === "approve" ? "APPROVED" : "REJECTED";
    if (isFromContext) updateCourse(id, { status: newStatus });
    showToast(
      action === "approve"
        ? "✅ Course approved — now visible to students!"
        : "❌ Course rejected — hidden from students.",
      action === "approve" ? "success" : "error"
    );
    setActing(null);
  };

  const filtered = filter === "ALL" ? allCourses : allCourses.filter(c => c.status === filter);

  const counts = {
    ALL:      allCourses.length,
    PENDING:  allCourses.filter(c => c.status === "PENDING").length,
    APPROVED: allCourses.filter(c => c.status === "APPROVED").length,
    REJECTED: allCourses.filter(c => c.status === "REJECTED").length,
  };

  const STATUS_CFG = {
    PENDING:  { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b", label: "Pending Review" },
    APPROVED: { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e", label: "Approved — Live" },
    REJECTED: { bg: "#fef2f2", text: "#b91c1c", dot: "#ef4444", label: "Rejected" },
  };

  const FILTER_COLORS = {
    PENDING: "#f59e0b", APPROVED: "#22c55e", REJECTED: "#ef4444", ALL: "#6C63FF",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 68, position: "relative" }}>

      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 1000,
          background: toast.type === "success" ? "#15803d" : "#c53030",
          color: "#fff", padding: "14px 22px", borderRadius: 12,
          fontWeight: 600, fontSize: 14, maxWidth: 340,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}>
          {toast.msg}
        </div>
      )}

      <SideBar user={{ role: "ADMIN", name: "Admin" }} active="/admin/courses" navigate={navigate} />

      <div style={{ flex: 1, padding: "40px 40px", background: "#f8f9fe" }}>

        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, letterSpacing: "-0.5px" }}>
          Course Approval Panel
        </h1>
        <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 16 }}>
          Only <strong style={{ color: "#15803d" }}>Approved</strong> courses are visible to students.
          {" "}<strong style={{ color: "#b91c1c" }}>Rejected</strong> and <strong style={{ color: "#b45309" }}>Pending</strong> courses are hidden.
        </p>

        {counts.PENDING > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 12, padding: "12px 18px", marginBottom: 24 }}>
            <span style={{ fontSize: 20 }}>⏳</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#b45309" }}>
              {counts.PENDING} course{counts.PENDING !== 1 ? "s" : ""} waiting for your approval
            </span>
            <button onClick={() => setFilter("PENDING")}
              style={{ marginLeft: "auto", padding: "6px 14px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Review Now
            </button>
          </div>
        )}

        <div style={{ background: "#f0efff", border: "1px solid #c4b5fd", borderRadius: 12, padding: "12px 18px", marginBottom: 28, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>ℹ️</span>
          <span style={{ fontSize: 13, color: "#4a5568", lineHeight: 1.6 }}>
            <strong>Workflow:</strong> Instructor creates course → Status is <strong>Pending</strong> →
            You approve → Course becomes <strong>visible to students</strong> in Browse Courses.
            Rejected courses are hidden from everyone.
          </span>
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: "wrap" }}>
          {["PENDING","APPROVED","REJECTED","ALL"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                flex: "1 1 120px", padding: "18px 20px", borderRadius: 14,
                cursor: "pointer", textAlign: "left",
                border: `2px solid ${filter === f ? FILTER_COLORS[f] : "#e2e8f0"}`,
                background: filter === f ? FILTER_COLORS[f] + "15" : "#fff",
                transition: "all 0.15s",
              }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: FILTER_COLORS[f] }}>{counts[f]}</div>
              <div style={{ fontSize: 12, color: "#718096", marginTop: 4, fontWeight: 500 }}>
                {f === "ALL" ? "All Courses" : STATUS_CFG[f].label}
              </div>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {["PENDING","APPROVED","REJECTED","ALL"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "8px 18px", borderRadius: 100,
                border: `1.5px solid ${filter === f ? "#6C63FF" : "#e2e8f0"}`,
                background: filter === f ? "#6C63FF" : "#fff",
                color: filter === f ? "#fff" : "#718096",
                fontSize: 13, fontWeight: filter === f ? 700 : 500,
                cursor: "pointer", transition: "all 0.2s",
              }}>
              {f === "ALL" ? "All" : STATUS_CFG[f].label}
              {f !== "ALL" && counts[f] > 0 && (
                <span style={{
                  marginLeft: 7,
                  background: filter === f ? "rgba(255,255,255,0.25)" : FILTER_COLORS[f] + "22",
                  color: filter === f ? "#fff" : FILTER_COLORS[f],
                  borderRadius: 100, padding: "1px 8px", fontSize: 11, fontWeight: 700,
                }}>
                  {counts[f]}
                </span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", background: "#fff", borderRadius: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ color: "#94a3b8", fontSize: 16 }}>No courses in this category.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filtered.map(course => {
              const cfg = STATUS_CFG[course.status] || STATUS_CFG.PENDING;
              const isPending = course.status === "PENDING";
              const isFromContext = !!course._fromContext;

              return (
                <div key={course.id} style={{
                  background: "#fff", borderRadius: 18, overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  border: isPending && isFromContext ? "1.5px solid #c4b5fd" : "1.5px solid #f0f4f8",
                }}>

                  {isFromContext && isPending && (
                    <div style={{ background: "linear-gradient(135deg,#6C63FF,#4f46e5)", padding: "7px 20px", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                      🆕 New course submitted by instructor — awaiting your review
                    </div>
                  )}
                  {course.status === "APPROVED" && (
                    <div style={{ background: "linear-gradient(135deg,#15803d,#16a34a)", padding: "7px 20px", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                      ✅ Approved — Visible to students in Browse Courses
                    </div>
                  )}
                  {course.status === "REJECTED" && (
                    <div style={{ background: "linear-gradient(135deg,#b91c1c,#dc2626)", padding: "7px 20px", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                      ❌ Rejected — Hidden from all students
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", padding: "20px 24px", gap: 18 }}>
                    <div style={{ width: 60, height: 60, borderRadius: 14, background: course.coverColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, overflow: "hidden" }}>
                      {course.image
                        ? <img src={course.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                        : (course.emoji || "📚")}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>{course.title}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, background: cfg.bg, color: cfg.text, fontSize: 12, fontWeight: 600 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />
                          {cfg.label}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 14, fontSize: 13, color: "#94a3b8", marginBottom: 8, flexWrap: "wrap" }}>
                        <span>🏷️ {course.category}</span>
                        <span>👨‍🏫 {course.instructorName || "Instructor"}</span>
                        <span>📖 {course.lessonCount || course.lessons?.length || 0} lessons</span>
                        <span>🎚 {course.level}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>
                        {(course.description || "No description.").substring(0, 160)}
                        {(course.description?.length || 0) > 160 ? "…" : ""}
                      </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0, minWidth: 120 }}>
                      {isPending ? (
                        <>
                          <button onClick={() => handleAction(course.id, "approve", isFromContext)} disabled={!!acting}
                            style={{ padding: "10px 22px", background: acting === course.id+"approve" ? "#e2e8f0" : "#f0fdf4", color: acting === course.id+"approve" ? "#94a3b8" : "#15803d", border: `1.5px solid ${acting === course.id+"approve" ? "#e2e8f0" : "#bbf7d0"}`, borderRadius: 10, fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontSize: 14, transition: "all 0.2s" }}>
                            {acting === course.id+"approve" ? "…" : "✓ Approve"}
                          </button>
                          <button onClick={() => handleAction(course.id, "reject", isFromContext)} disabled={!!acting}
                            style={{ padding: "10px 22px", background: acting === course.id+"reject" ? "#e2e8f0" : "#fff5f5", color: acting === course.id+"reject" ? "#94a3b8" : "#c53030", border: `1.5px solid ${acting === course.id+"reject" ? "#e2e8f0" : "#feb2b2"}`, borderRadius: 10, fontWeight: 700, cursor: acting ? "not-allowed" : "pointer", fontSize: 14, transition: "all 0.2s" }}>
                            {acting === course.id+"reject" ? "…" : "✕ Reject"}
                          </button>
                        </>
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 28, marginBottom: 4 }}>
                            {course.status === "APPROVED" ? "✅" : "❌"}
                          </div>
                          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>
                            {course.status === "APPROVED" ? "Live for students" : "Hidden from students"}
                          </div>
                          {isFromContext && (
                            <button onClick={() => updateCourse(course.id, { status: "PENDING" })}
                              style={{ background: "none", border: "1px solid #e2e8f0", color: "#6C63FF", fontSize: 11, cursor: "pointer", fontWeight: 600, borderRadius: 7, padding: "5px 10px" }}>
                              Re-review
                            </button>
                          )}
                        </div>
                      )}
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

export default AdminCoursesPage;
