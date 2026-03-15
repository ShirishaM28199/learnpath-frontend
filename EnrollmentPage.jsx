import { useState } from "react";
import { MOCK_COURSES, COURSE_REVIEWS } from "../data/mockData";
import { useCourses } from "../context/CourseContext";

function StarRating({ rating, size = 16 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#FFD166" : "#e2e8f0", fontSize: size }}>★</span>
      ))}
    </div>
  );
}

function EnrollmentPage({ courseId, user, onEnroll, enrolled, navigate }) {
  const { visibleInstructorCourses } = useCourses();
  const allCourses = [...visibleInstructorCourses, ...MOCK_COURSES];
  const course = allCourses.find(c => c.id === courseId);

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(enrolled);
  const [activeTab, setActiveTab] = useState("overview"); 

  if (!course) {
    return (
      <div style={{ paddingTop: 140, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 20 }}>Course not found.</p>
        <button onClick={() => navigate("/courses")} style={{ color: "#6C63FF", background: "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>← Browse Courses</button>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user) { navigate("/login"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    onEnroll(courseId);
    setDone(true);
    setLoading(false);
  };

  const displayLessons = (course.lessons?.length > 0)
    ? course.lessons.slice(0, 8)
    : Array.from({ length: Math.min(course.lessonCount || 0, 8) }, (_, i) => ({
        id: i + 1, orderNumber: i + 1,
        title: `Lesson ${i + 1}: ${["Introduction & Setup","Core Fundamentals","Building Projects","Advanced Patterns","Testing & Debugging","Deployment & Beyond","Best Practices","Final Project"][i]}`,
      }));

  const totalLessons = course.lessons?.length || course.lessonCount || 0;
  const reviews = COURSE_REVIEWS[courseId] || [];
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : course.rating;

  const relatedCourses = allCourses.filter(c => c.category === course.category && c.id !== courseId).slice(0, 3);

  const introVideo = course.introVideo;

  const TABS = ["overview", "curriculum", "reviews"];

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "#f8f9fe" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #e8ecf4", padding: "16px 28px" }}>
        <button onClick={() => navigate("/courses")} style={{ background: "none", border: "none", color: "#6C63FF", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>← Back to Courses</button>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "48px 28px 80px", display: "flex", gap: 44, alignItems: "flex-start", flexWrap: "wrap" }}>

        <div style={{ flex: 1, minWidth: 300 }}>

          {introVideo ? (
            <div style={{ borderRadius: 24, overflow: "hidden", marginBottom: 32, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
              <div style={{ background: "#0f0c29", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="white"><polygon points="3,1 9,5 3,9" /></svg>
                </div>
                <span style={{ color: "#a5b4fc", fontWeight: 600, fontSize: 13 }}>Course Preview</span>
              </div>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe src={introVideo} title={course.title} frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
              </div>
            </div>
          ) : (
            <div style={{ height: 260, borderRadius: 24, overflow: "hidden", background: course.coverColor, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
              {course.image
                ? <img src={course.image} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
                : <span style={{ fontSize: 84 }}>{course.emoji || "📚"}</span>}
            </div>
          )}

          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span style={{ padding: "5px 14px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 12, fontWeight: 700 }}>{course.category}</span>
            <span style={{ padding: "5px 14px", borderRadius: 100, background: "#f0fdf4", color: "#15803d", fontSize: 12, fontWeight: 700 }}>{course.level}</span>
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1a1a2e", marginBottom: 12, lineHeight: 1.3, letterSpacing: "-0.5px" }}>{course.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <StarRating rating={avgRating} size={18} />
            <span style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>{avgRating}</span>
            <span style={{ fontSize: 14, color: "#94a3b8" }}>({reviews.length > 0 ? `${reviews.length} reviews` : `${course.enrolledCount?.toLocaleString()} students`})</span>
          </div>

          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 28 }}>{course.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 36 }}>
            {[
              ["👨‍🏫", "Instructor", course.instructorName || "Instructor"],
              ["📖", "Lessons", `${totalLessons} lessons`],
              ["👥", "Students", `${(course.enrolledCount || 0).toLocaleString()} enrolled`],
              ["⭐", "Rating", course.rating ? `${course.rating} / 5.0` : "New"],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e", marginTop: 2 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "#f1f5f9", borderRadius: 12, padding: 4 }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{ flex: 1, padding: "10px", borderRadius: 9, border: "none", background: activeTab === tab ? "#fff" : "transparent", color: activeTab === tab ? "#1a1a2e" : "#94a3b8", fontWeight: activeTab === tab ? 700 : 500, fontSize: 14, cursor: "pointer", boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s", textTransform: "capitalize" }}>
                {tab === "reviews" && reviews.length > 0 ? `Reviews (${reviews.length})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div style={{ background: "#fff", borderRadius: 18, padding: "28px 32px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", marginBottom: 18 }}>What you'll learn</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  `Master ${course.category} from scratch`,
                  "Build real-world projects",
                  "Industry best practices",
                  "Hands-on coding exercises",
                  "Certificate upon completion",
                  "Lifetime access to content",
                  "Expert instructor support",
                  "Community access",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#6C63FF", fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#4a5568" }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: "#f0f4f8", margin: "24px 0" }} />

              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", marginBottom: 14 }}>Requirements</h3>
              {["Basic computer skills", `Interest in ${course.category}`, "No prior experience needed for Beginner level"].map((req, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: "#94a3b8", fontSize: 14 }}>•</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>{req}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "curriculum" && (
            <div style={{ background: "#fff", borderRadius: 18, padding: "24px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e" }}>Course Curriculum</h3>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>{totalLessons} lessons</span>
              </div>
              {displayLessons.map((l, i) => (
                <div key={l.id || i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "13px 0", borderBottom: i < displayLessons.length - 1 ? "1px solid #f0f4f8" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0efff", color: "#6C63FF", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{l.orderNumber}</div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 14, color: "#4a5568" }}>{l.title}</span>
                    <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                      {l.videoUrl && <span style={{ fontSize: 11, color: "#6C63FF", fontWeight: 600 }}>▶ Video</span>}
                      {l.duration && <span style={{ fontSize: 11, color: "#94a3b8" }}>⏱ {l.duration}</span>}
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: "#94a3b8", background: "#f8f9fe", padding: "3px 10px", borderRadius: 100 }}>🔒 Enrolled</span>
                </div>
              ))}
              {totalLessons > 8 && (
                <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 14 }}>+ {totalLessons - 8} more lessons after enrolling</p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {reviews.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: 18, padding: "48px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>⭐</div>
                  <p style={{ color: "#94a3b8", fontSize: 15 }}>No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                <div>
                  <div style={{ background: "#fff", borderRadius: 18, padding: "24px 28px", marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 32 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 52, fontWeight: 800, color: "#1a1a2e", lineHeight: 1 }}>{avgRating}</div>
                      <StarRating rating={avgRating} size={20} />
                      <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>{reviews.length} reviews</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = reviews.filter(r => r.rating === star).length;
                        const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={star} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <span style={{ fontSize: 12, color: "#94a3b8", width: 10 }}>{star}</span>
                            <span style={{ color: "#FFD166", fontSize: 12 }}>★</span>
                            <div style={{ flex: 1, height: 6, borderRadius: 100, background: "#f0f4f8", overflow: "hidden" }}>
                              <div style={{ width: `${pct}%`, height: "100%", background: "#FFD166", borderRadius: 100 }} />
                            </div>
                            <span style={{ fontSize: 12, color: "#94a3b8", width: 20 }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {reviews.map(review => (
                      <div key={review.id} style={{ background: "#fff", borderRadius: 18, padding: "22px 26px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                          <div style={{ width: 42, height: 42, borderRadius: "50%", background: review.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{review.avatar}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{review.name}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <StarRating rating={review.rating} size={13} />
                              <span style={{ fontSize: 12, color: "#94a3b8" }}>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.7 }}>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {relatedCourses.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 20, letterSpacing: "-0.5px" }}>
                More {course.category} Courses
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {relatedCourses.map(rc => (
                  <div key={rc.id} onClick={() => navigate(`/enroll/${rc.id}`)}
                    style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #f0f4f8", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(108,99,255,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "none"; }}>
                    <div style={{ width: 56, height: 56, borderRadius: 12, background: rc.coverColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{rc.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rc.title}</div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>by {rc.instructorName}</span>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>• {rc.lessonCount} lessons</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ color: "#FFD166" }}>★</span>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{rc.rating}</span>
                      </div>
                      <span style={{ padding: "3px 10px", borderRadius: 100, background: "#f0fdf4", color: "#15803d", fontSize: 11, fontWeight: 700 }}>{rc.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ width: 340, position: "sticky", top: 90 }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: "36px 30px", boxShadow: "0 16px 48px rgba(108,99,255,0.12)", border: "1px solid #f0f4f8" }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: "#1a1a2e" }}>Free</div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>No credit card needed</div>
            </div>

            {done ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>You're enrolled!</div>
                <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>Head to My Courses to start learning.</p>
                <button onClick={() => navigate("/my-courses")} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Go to My Courses →</button>
              </div>
            ) : (
              <button onClick={handleEnroll} disabled={loading}
                style={{ width: "100%", padding: "16px", background: loading ? "#c4c4f0" : "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer", marginBottom: 16, boxShadow: loading ? "none" : "0 4px 16px rgba(108,99,255,0.3)", transition: "all 0.2s" }}>
                {loading ? "Enrolling…" : "Enroll Now — Free"}
              </button>
            )}

            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid #f0f4f8", paddingTop: 20 }}>
              {["Full course access", "Video lessons included", "Progress tracking", "Completion certificate", "Lifetime access", "Quiz after every lesson"].map(p => (
                <li key={p} style={{ display: "flex", gap: 10, fontSize: 14, color: "#4a5568" }}>
                  <span style={{ color: "#6C63FF", fontWeight: 700 }}>✓</span> {p}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 24, padding: "16px", background: "#f8f9fe", borderRadius: 14, border: "1px solid #f0f4f8" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Your Instructor</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16 }}>
                  {(course.instructorName || "I")[0]}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>{course.instructorName}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{course.category} Expert</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentPage;
