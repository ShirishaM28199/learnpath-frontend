import { useState, useEffect } from "react";
import { SideBar } from "../components/shared";
import { useCourses } from "../context/CourseContext";

function InstructorDashboard({ user, courses, courseLessons, navigate }) {
  const { instructorCourses } = useCourses();
  const [expanded, setExpanded] = useState(null);

  const STATUS = {
    PENDING:  { bg: "#fffbeb", text: "#b45309", label: "Pending Review" },
    APPROVED: { bg: "#f0fdf4", text: "#15803d", label: "Approved"       },
    REJECTED: { bg: "#fef2f2", text: "#b91c1c", label: "Rejected"       },
  };

  const mockStudents = [
    { id: 1, name: "Alice Johnson", email: "alice@email.com",  progressStatus: "IN_PROGRESS"  },
    { id: 2, name: "Bob Chen",      email: "bob@email.com",    progressStatus: "COMPLETED"     },
    { id: 3, name: "Carol White",   email: "carol@email.com",  progressStatus: "NOT_STARTED"   },
    { id: 4, name: "David Osei",    email: "david@email.com",  progressStatus: "IN_PROGRESS"   },
  ];


  const contextCourses = instructorCourses.map((c) => ({
    ...c,
    lessons: courseLessons[c.id] || c.lessons || [],
  }));

  const demoCourses = courses.map((c, i) => ({
    ...c,
    status: ["APPROVED", "PENDING", "APPROVED"][i] || "PENDING",
    lessons: courseLessons[c.id] || [],
  }));

  const allCourses = [...contextCourses, ...demoCourses];

  useEffect(() => { if (!user || user.role !== "INSTRUCTOR") navigate("/login"); }, [user]);
  if (!user || user.role !== "INSTRUCTOR") return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 68 }}>
      <SideBar user={user} active="/instructor/dashboard" navigate={navigate} />
      <div style={{ flex: 1, padding: "40px 40px", background: "#f8f9fe" }}>

  
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, letterSpacing: "-0.5px" }}>Instructor Dashboard</h1>
            <p style={{ color: "#94a3b8", fontSize: 15 }}>Manage your courses and track student enrollments.</p>
          </div>
          <button onClick={() => navigate("/instructor/create-course")}
            style={{ padding: "12px 22px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(108,99,255,0.3)" }}>
            + Create Course
          </button>
        </div>

       
        <div style={{ display: "flex", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
          {[
            ["📚", allCourses.length, "My Courses", "#6C63FF"],
            ["✅", allCourses.filter(c => c.status === "APPROVED").length, "Live", "#22c55e"],
            ["⏳", allCourses.filter(c => c.status === "PENDING").length, "Pending", "#f59e0b"],
            ["👥", allCourses.reduce((s, c) => s + (c.lessons?.length || 0), 0), "Total Lessons", "#06b6d4"],
          ].map(([icon, num, lbl, color]) => (
            <div key={lbl} style={{ flex: "1 1 140px", background: "#fff", borderRadius: 16, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
              <div style={{ fontSize: 30, fontWeight: 800, color }}>{num}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>{lbl}</div>
            </div>
          ))}
        </div>

   
        {allCourses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📭</div>
            <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 20 }}>No courses yet. Create your first course!</p>
            <button onClick={() => navigate("/instructor/create-course")}
              style={{ padding: "12px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
              + Create Course
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {allCourses.map((course) => {
              const cfg    = STATUS[course.status] || STATUS.PENDING;
              const isExp  = expanded === course.id;
              const lessons = course.lessons || [];

              return (
                <div key={course.id} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 14px rgba(0,0,0,0.06)", border: "1px solid #f0f4f8" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 26px" }}>

                   
                    <div style={{ display: "flex", alignItems: "center", gap: 18, flex: 1 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 15, background: course.coverColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                        {course.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>{course.title}</h3>
                          <span style={{ padding: "3px 10px", borderRadius: 100, background: cfg.bg, color: cfg.text, fontSize: 11, fontWeight: 700 }}>{cfg.label}</span>
                        </div>
                        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#94a3b8", flexWrap: "wrap" }}>
                          <span>🏷️ {course.category}</span>
                          <span>📖 <strong style={{ color: "#1a1a2e" }}>{lessons.length}</strong> lessons</span>
                          <span>👥 {(course.enrolledCount || 0).toLocaleString()} students</span>
                        </div>
                      </div>
                    </div>

                  
                    <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                      <button onClick={() => navigate(`/instructor/course/${course.id}`)}
                        style={{ padding: "9px 18px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(108,99,255,0.25)" }}>
                        + Add Lesson
                      </button>
                      <button onClick={() => setExpanded(isExp ? null : course.id)}
                        style={{ padding: "9px 18px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#718096", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                        {isExp ? "▲ Hide" : "▼ Students"}
                      </button>
                    </div>
                  </div>

                
                  {lessons.length > 0 && (
                    <div style={{ padding: "0 26px 16px", borderTop: "1px solid #f8f9fe" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10, marginTop: 14 }}>
                        Course Lessons
                      </div>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        {lessons.map((l) => (
                          <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8f9fe", borderRadius: 8, padding: "7px 12px", border: "1px solid #f0f4f8" }}>
                            <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#6C63FF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{l.orderNumber}</span>
                            <span style={{ fontSize: 13, color: "#4a5568", fontWeight: 500 }}>{l.title}</span>
                            {l.duration && <span style={{ fontSize: 11, color: "#94a3b8" }}>· {l.duration}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                 
                  {isExp && (
                    <div style={{ padding: "0 26px 22px", borderTop: "1px solid #f0f4f8" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, margin: "18px 0 14px" }}>
                        Enrolled Students
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {mockStudents.map((s) => (
                          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#fafafa", borderRadius: 12, border: "1px solid #f0f4f8" }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f0efff", color: "#6C63FF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                              {s.name[0]}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>{s.name}</div>
                              <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.email}</div>
                            </div>
                            <span style={{
                              padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                              background: s.progressStatus === "COMPLETED" ? "#f0fdf4" : s.progressStatus === "IN_PROGRESS" ? "#fffbeb" : "#f1f5f9",
                              color:      s.progressStatus === "COMPLETED" ? "#15803d" : s.progressStatus === "IN_PROGRESS" ? "#b45309"  : "#64748b",
                            }}>
                              {s.progressStatus.replace("_", " ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorDashboard;