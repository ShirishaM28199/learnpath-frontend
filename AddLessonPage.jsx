import { useState } from "react";
import { SideBar } from "../components/shared";
import { MOCK_COURSES } from "../data/mockData";
import { useCourses } from "../context/CourseContext";

function AddLessonPage({ courseId, lessons, onAddLesson, navigate }) {
  const { instructorCourses } = useCourses();
  const allCourses = [...instructorCourses, ...MOCK_COURSES];
  const course = allCourses.find((c) => c.id === courseId);

  const [title,    setTitle]    = useState("");
  const [duration, setDuration] = useState("");
  const [content,  setContent]  = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  
  const toEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtu\.be\/|v=)([^&?/\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleVideoChange = (e) => {
    const val = e.target.value;
    setVideoUrl(val);
    const embed = toEmbedUrl(val.trim());
    setVideoPreview(embed);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) { setError("Lesson title is required."); return; }
    onAddLesson(courseId, {
      title:    title.trim(),
      duration: duration.trim() || "10 min",
      content:  content.trim(),
      videoUrl: toEmbedUrl(videoUrl.trim()),
    });
    setSuccess(true);
    setTitle("");
    setDuration("");
    setContent("");
    setVideoUrl("");
    setVideoPreview("");
    setTimeout(() => setSuccess(false), 3000);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 10,
    border: "1.5px solid #e2e8f0", fontSize: 15,
    color: "#1a1a2e", background: "#fafafa", fontFamily: "inherit",
  };

  const labelStyle = {
    fontSize: 13, fontWeight: 700, color: "#4a5568",
    display: "block", marginBottom: 8,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 68 }}>
      <SideBar user={{ role: "INSTRUCTOR", name: "Instructor" }} active="/instructor/dashboard" navigate={navigate} />

      <div style={{ flex: 1, padding: "40px 48px", background: "#f8f9fe" }}>
      
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 14 }}>
          <button onClick={() => navigate("/instructor/dashboard")} style={{ background: "none", border: "none", color: "#6C63FF", cursor: "pointer", fontWeight: 600 }}>Dashboard</button>
          <span style={{ color: "#cbd5e0" }}>/</span>
          <span style={{ color: "#94a3b8" }}>Add Lesson</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, letterSpacing: "-0.5px" }}>Add Lesson</h1>
        {course && (
          <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 36 }}>
            Adding to: <strong style={{ color: "#6C63FF" }}>{course.title}</strong>
          </p>
        )}

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

          
          <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

            {success && (
              <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 14, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 22 }}>✅</span>
                <div style={{ fontWeight: 700, color: "#15803d" }}>Lesson added successfully!</div>
              </div>
            )}

            {error && (
              <div style={{ background: "#fff5f5", border: "1px solid #feb2b2", color: "#c53030", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 20 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: 22 }}>

           
              <div>
                <label style={labelStyle}>Lesson Title *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Introduction to Arrays" style={inputStyle} />
              </div>

        
              <div>
                <label style={labelStyle}>Duration</label>
                <input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 15 min" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>
                  YouTube Video URL
                  <span style={{ marginLeft: 8, fontSize: 12, color: "#94a3b8", fontWeight: 400 }}>(optional)</span>
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🎥</div>
                  <input
                    value={videoUrl}
                    onChange={handleVideoChange}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    style={{ ...inputStyle, paddingLeft: 44 }}
                  />
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
                  Paste any YouTube link — we'll convert it automatically ✓
                </div>

             
                {videoPreview && (
                  <div style={{ marginTop: 14, borderRadius: 14, overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                    <div style={{ background: "#0f0c29", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="white"><polygon points="2,1 8,4.5 2,8" /></svg>
                      </div>
                      <span style={{ color: "#a5b4fc", fontSize: 12, fontWeight: 600 }}>Video Preview</span>
                      <button type="button" onClick={() => { setVideoUrl(""); setVideoPreview(""); }}
                        style={{ marginLeft: "auto", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 14 }}>✕</button>
                    </div>
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                      <iframe src={videoPreview} title="Preview" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                    </div>
                  </div>
                )}
              </div>

          
              <div>
                <label style={labelStyle}>Lesson Content</label>
                <textarea
                  value={content} onChange={e => setContent(e.target.value)} rows={8}
                  placeholder="Write the lesson content here. Students will read this while taking the course."
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                />
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button type="submit"
                  style={{ flex: 1, padding: "15px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(108,99,255,0.3)" }}>
                  + Add Lesson
                </button>
                <button type="button" onClick={() => navigate("/instructor/dashboard")}
                  style={{ padding: "15px 24px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#718096", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  Done
                </button>
              </div>
            </form>
          </div>
          <div style={{ width: 300, background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 18 }}>
              📖 Current Lessons ({lessons.length})
            </h3>
            {lessons.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 0", color: "#94a3b8", fontSize: 14 }}>
                No lessons yet.<br />Add your first one!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {lessons.map((l) => (
                  <div key={l.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px", background: "#f8f9fe", borderRadius: 10, border: "1px solid #f0f4f8" }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#6C63FF", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                      {l.orderNumber}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.title}</div>
                      <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                        {l.duration && <span style={{ fontSize: 11, color: "#94a3b8" }}>⏱ {l.duration}</span>}
                        {l.videoUrl && <span style={{ fontSize: 11, color: "#6C63FF", fontWeight: 600 }}>▶ Video</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

        
            <div style={{ marginTop: 24, padding: "16px", background: "#f0efff", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#6C63FF", marginBottom: 10 }}>💡 Tips for great lessons</div>
              {[
                ["🎥", "Add a YouTube video for each lesson"],
                ["📝", "Write clear, detailed notes"],
                ["⏱", "Keep videos under 30 minutes"],
                ["🎯", "Focus on one concept per lesson"],
              ].map(([icon, tip]) => (
                <div key={tip} style={{ display: "flex", gap: 8, fontSize: 12, color: "#4a5568", marginBottom: 6, lineHeight: 1.4 }}>
                  <span>{icon}</span><span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLessonPage;
