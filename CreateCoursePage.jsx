import { useState, useRef } from "react";
import { SideBar } from "../components/shared";
import { useCourses } from "../context/CourseContext";

const CATS   = ["Programming", "Design", "Business", "Marketing", "Data Science", "Music"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const emptyLesson = () => ({
  tempId: Date.now() + Math.random(),
  title: "",
  duration: "",
  videoUrl: "",
  content: "",
  quiz: { question: "", options: ["", "", "", ""], answer: 0 },
});

function CreateCoursePage({ navigate, user }) {
  const { addCourse } = useCourses();

  const [form, setForm] = useState({ title: "", description: "", category: "", level: "Beginner" });
  const [imagePreview, setImagePreview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageTab, setImageTab] = useState("url");
  const fileInputRef = useRef(null);

  const [lessons, setLessons] = useState([emptyLesson()]);
  const [openLesson, setOpenLesson] = useState(0); 

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState("");
  const [step, setStep]     = useState(1); // 1 = course info, 2 = lessons

  const update = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const updateLesson = (idx, field, value) => {
    setLessons(prev => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  };

  const updateQuiz = (idx, field, value) => {
    setLessons(prev => prev.map((l, i) =>
      i === idx ? { ...l, quiz: { ...l.quiz, [field]: value } } : l
    ));
  };

  const updateQuizOption = (lessonIdx, optionIdx, value) => {
    setLessons(prev => prev.map((l, i) => {
      if (i !== lessonIdx) return l;
      const options = [...l.quiz.options];
      options[optionIdx] = value;
      return { ...l, quiz: { ...l.quiz, options } };
    }));
  };

  const toEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtu\.be\/|v=)([^&?/\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const addLesson = () => {
    const newLesson = emptyLesson();
    setLessons(prev => [...prev, newLesson]);
    setOpenLesson(lessons.length);
  };

  const removeLesson = (idx) => {
    if (lessons.length === 1) return;
    setLessons(prev => prev.filter((_, i) => i !== idx));
    setOpenLesson(Math.max(0, idx - 1));
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setError("");
    if (!form.title || !form.description || !form.category) {
      setError("Please fill in all course details."); setStep(1); return;
    }
    const hasEmptyLesson = lessons.some(l => !l.title.trim());
    if (hasEmptyLesson) {
      setError("Every lesson must have a title."); return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const formattedLessons = lessons.map((l, i) => ({
      id: Date.now() + i,
      orderNumber: i + 1,
      title: l.title.trim(),
      duration: l.duration.trim() || "10 min",
      videoUrl: toEmbedUrl(l.videoUrl.trim()),
      content: l.content.trim() || `This lesson covers ${l.title}.`,
      quiz: l.quiz.question.trim() ? l.quiz : null,
    }));

    addCourse({
      title:       form.title,
      description: form.description,
      category:    form.category,
      level:       form.level,
      image:       imagePreview || null,
      instructor:  user?.name || "Instructor",
      lessons:     formattedLessons,
      lessonCount: formattedLessons.length,
    });

    setLoading(false);
    setSuccess(true);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: 10,
    border: "1.5px solid #e2e8f0", fontSize: 14,
    color: "#1a1a2e", background: "#fafafa", fontFamily: "inherit",
    boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 13, fontWeight: 700, color: "#4a5568", display: "block", marginBottom: 7 };

  if (success) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", paddingTop: 68 }}>
        <SideBar user={user || { role: "INSTRUCTOR", name: "Instructor" }} active="/instructor/create-course" navigate={navigate} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fe" }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: "56px 48px", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", maxWidth: 480 }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>📋</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", marginBottom: 10 }}>Course Submitted!</h2>
            <p style={{ color: "#64748b", fontSize: 15, marginBottom: 8 }}>
              <strong style={{ color: "#6C63FF" }}>{form.title}</strong> has been submitted with <strong>{lessons.length}</strong> lesson{lessons.length !== 1 ? "s" : ""}.
            </p>
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 18px", marginBottom: 24, fontSize: 14, color: "#b45309" }}>
              ⏳ Your course is <strong>Pending Admin Approval</strong>. Once approved, it will be visible to students in Browse Courses.
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => navigate("/instructor/dashboard")}
                style={{ padding: "13px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(108,99,255,0.3)" }}>
                Go to Dashboard →
              </button>
              <button onClick={() => { setSuccess(false); setForm({ title: "", description: "", category: "", level: "Beginner" }); setImagePreview(""); setImageUrl(""); setImageTab("url"); setLessons([emptyLesson()]); setStep(1); setOpenLesson(0); }}
                style={{ padding: "13px 28px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#718096", borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 68 }}>
      <SideBar user={user || { role: "INSTRUCTOR", name: "Instructor" }} active="/instructor/create-course" navigate={navigate} />

      <div style={{ flex: 1, padding: "40px 48px", background: "#f8f9fe", overflowY: "auto" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 14 }}>
          <button onClick={() => navigate("/instructor/dashboard")} style={{ background: "none", border: "none", color: "#6C63FF", cursor: "pointer", fontWeight: 600 }}>Dashboard</button>
          <span style={{ color: "#cbd5e0" }}>/</span>
          <span style={{ color: "#94a3b8" }}>Create Course</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 6, letterSpacing: "-0.5px" }}>Create a New Course</h1>
        <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 32 }}>Fill in course details, add lessons with videos and quizzes, then publish.</p>

      
        <div style={{ display: "flex", gap: 4, marginBottom: 32, background: "#f1f5f9", borderRadius: 12, padding: 4, maxWidth: 400 }}>
          {[["1", "Course Info"], ["2", `Lessons (${lessons.length})`]].map(([s, label]) => (
            <button key={s} onClick={() => setStep(Number(s))}
              style={{ flex: 1, padding: "10px", borderRadius: 9, border: "none", background: step === Number(s) ? "#fff" : "transparent", color: step === Number(s) ? "#1a1a2e" : "#94a3b8", fontWeight: step === Number(s) ? 700 : 500, fontSize: 14, cursor: "pointer", boxShadow: step === Number(s) ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #feb2b2", color: "#c53030", borderRadius: 10, padding: "12px 16px", fontSize: 14, marginBottom: 24 }}>{error}</div>
        )}

        
        {step === 1 && (
          <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
            <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 24 }}>📋 Course Details</h3>

              <div style={{ marginBottom: 22 }}>
                <label style={labelStyle}>Course Thumbnail <span style={{ color: "#94a3b8", fontWeight: 400 }}>(shown on course card)</span></label>

             
                <div style={{ display: "flex", gap: 4, marginBottom: 12, background: "#f1f5f9", borderRadius: 10, padding: 3, width: "fit-content" }}>
                  {[["url", "🔗 Paste URL"], ["upload", "📁 Upload File"]].map(([t, label]) => (
                    <button key={t} type="button" onClick={() => { setImageTab(t); setImagePreview(""); setImageUrl(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                      style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: imageTab === t ? "#fff" : "transparent", color: imageTab === t ? "#1a1a2e" : "#94a3b8", fontWeight: imageTab === t ? 700 : 500, fontSize: 13, cursor: "pointer", boxShadow: imageTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
                      {label}
                    </button>
                  ))}
                </div>

              
                {imageTab === "url" && (
                  <div>
                    <input
                      value={imageUrl}
                      onChange={e => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
                      placeholder="https://images.unsplash.com/photo-... or any image URL"
                      style={{ ...inputStyle, marginBottom: 8 }}
                    />
                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>
                      💡 Tip: Go to <strong>unsplash.com</strong>, find an image, right-click → Copy image address, paste here
                    </div>
                  </div>
                )}

          
                {imageTab === "upload" && (
                  <div onClick={() => fileInputRef.current?.click()}
                    style={{ border: "2px dashed #c4b5fd", borderRadius: 12, cursor: "pointer", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center", background: "#fafbff", position: "relative", marginBottom: 8 }}>
                    <input ref={fileInputRef} type="file" accept="image/*"
                      style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
                      onChange={e => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = ev => { setImagePreview(ev.target.result); setImageUrl(""); }; reader.readAsDataURL(file); }}
                      onClick={e => e.stopPropagation()} />
                    <div style={{ textAlign: "center", pointerEvents: "none" }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>📁</div>
                      <div style={{ fontSize: 13, color: "#6C63FF", fontWeight: 600 }}>Click to upload</div>
                      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>PNG · JPG · WEBP</div>
                    </div>
                  </div>
                )}

         
                {imagePreview && (
                  <div style={{ borderRadius: 12, overflow: "hidden", border: "1.5px solid #e2e8f0", marginBottom: 8 }}>
                    <img src={imagePreview} alt="Thumbnail preview"
                      style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                      onError={() => { setImagePreview(""); setImageUrl(""); }} />
                  </div>
                )}
                {imagePreview && (
                  <button type="button" onClick={() => { setImagePreview(""); setImageUrl(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    style={{ background: "none", border: "none", color: "#ef4444", fontSize: 12, cursor: "pointer", padding: 0 }}>
                    ✕ Remove image
                  </button>
                )}
              </div>

             
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Course Title *</label>
                <input value={form.title} onChange={update("title")} placeholder="e.g. Complete Python Bootcamp" maxLength={120} style={inputStyle} />
                <div style={{ textAlign: "right", fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{form.title.length}/120</div>
              </div>

         
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select value={form.category} onChange={update("category")}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer", color: form.category ? "#1a1a2e" : "#94a3b8" }}>
                    <option value="">— Select —</option>
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Level</label>
                  <select value={form.level} onChange={update("level")}
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

    
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Description *</label>
                <textarea value={form.description} onChange={update("description")} rows={5} maxLength={1000}
                  placeholder="What will students learn? Who is this course for? What are the requirements?"
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }} />
                <div style={{ textAlign: "right", fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{form.description.length}/1000</div>
              </div>

              <button onClick={() => { if (!form.title || !form.description || !form.category) { setError("Please fill title, category and description."); } else { setError(""); setStep(2); } }}
                style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 16px rgba(108,99,255,0.3)" }}>
                Next: Add Lessons →
              </button>
            </div>

      
            <div style={{ width: 280 }}>
              <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #f0f4f8" }}>
                <div style={{ height: 140, background: imagePreview ? "transparent" : "linear-gradient(135deg,#6C63FF,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {imagePreview
                    ? <img src={imagePreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: 48 }}>📚</span>}
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#6C63FF", background: "#f0efff", padding: "3px 10px", borderRadius: 100, display: "inline-block", marginBottom: 8 }}>{form.category || "Category"}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 6, lineHeight: 1.3 }}>{form.title || "Course Title"}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{form.level} · {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}</div>
                </div>
              </div>
              <div style={{ marginTop: 14, padding: "14px 16px", background: "#fff", borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#6C63FF", marginBottom: 8 }}>👆 Course Card Preview</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>This is how your course will appear in Browse Courses. Upload a thumbnail to make it stand out!</div>
              </div>
            </div>
          </div>
        )}

        
        {step === 2 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>📖 Course Lessons</h3>
                <p style={{ fontSize: 13, color: "#94a3b8" }}>Add lessons with YouTube videos, notes, and quizzes.</p>
              </div>
              <button onClick={addLesson}
                style={{ padding: "10px 20px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 2px 8px rgba(108,99,255,0.3)" }}>
                + Add Lesson
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {lessons.map((lesson, idx) => {
                const isOpen = openLesson === idx;
                const embedUrl = toEmbedUrl(lesson.videoUrl);
                return (
                  <div key={lesson.tempId} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: isOpen ? "1.5px solid #6C63FF" : "1.5px solid #f0f4f8" }}>

               
                    <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", cursor: "pointer", gap: 14 }}
                      onClick={() => setOpenLesson(isOpen ? -1 : idx)}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: isOpen ? "#6C63FF" : "#f0efff", color: isOpen ? "#fff" : "#6C63FF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1a2e" }}>
                          {lesson.title || <span style={{ color: "#94a3b8", fontWeight: 400 }}>Lesson {idx + 1} — click to fill in details</span>}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                          {lesson.duration && <span style={{ fontSize: 11, color: "#94a3b8" }}>⏱ {lesson.duration}</span>}
                          {lesson.videoUrl && <span style={{ fontSize: 11, color: "#6C63FF", fontWeight: 600 }}>▶ Video added</span>}
                          {lesson.quiz?.question && <span style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600 }}>📝 Quiz added</span>}
                          {lesson.content && <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }}>📄 Notes added</span>}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {lessons.length > 1 && (
                          <button onClick={e => { e.stopPropagation(); removeLesson(idx); }}
                            style={{ padding: "5px 10px", background: "#fff5f5", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 7, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                            🗑 Remove
                          </button>
                        )}
                        <span style={{ color: "#94a3b8", fontSize: 16 }}>{isOpen ? "▲" : "▼"}</span>
                      </div>
                    </div>

             
                    {isOpen && (
                      <div style={{ padding: "0 20px 24px", borderTop: "1px solid #f0f4f8" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, marginBottom: 16 }}>
                          <div>
                            <label style={labelStyle}>Lesson Title *</label>
                            <input value={lesson.title} onChange={e => updateLesson(idx, "title", e.target.value)}
                              placeholder="e.g. Introduction to Variables" style={inputStyle} />
                          </div>
                          <div>
                            <label style={labelStyle}>Duration</label>
                            <input value={lesson.duration} onChange={e => updateLesson(idx, "duration", e.target.value)}
                              placeholder="e.g. 15 min" style={inputStyle} />
                          </div>
                        </div>

              
                        <div style={{ marginBottom: 16 }}>
                          <label style={labelStyle}>🎥 YouTube Video URL <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
                          <input value={lesson.videoUrl} onChange={e => updateLesson(idx, "videoUrl", e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                            style={inputStyle} />
                          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Paste any YouTube link — it will be embedded for students</div>

                        
                          {embedUrl && (
                            <div style={{ marginTop: 12, borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                              <div style={{ background: "#0f0c29", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="white"><polygon points="2,1 7,4 2,7" /></svg>
                                </div>
                                <span style={{ color: "#a5b4fc", fontSize: 12 }}>Video Preview</span>
                                <button type="button" onClick={() => updateLesson(idx, "videoUrl", "")}
                                  style={{ marginLeft: "auto", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 12 }}>✕ Remove</button>
                              </div>
                              <div style={{ position: "relative", paddingBottom: "40%", height: 0 }}>
                                <iframe src={embedUrl} frameBorder="0" allowFullScreen
                                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
                              </div>
                            </div>
                          )}
                        </div>

                     
                        <div style={{ marginBottom: 20 }}>
                          <label style={labelStyle}>📄 Lesson Notes / Content</label>
                          <textarea value={lesson.content} onChange={e => updateLesson(idx, "content", e.target.value)}
                            rows={5} placeholder="Write lesson notes here. Students will read this while studying. You can include explanations, code examples, key points, etc."
                            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }} />
                        </div>

                       
                        <div style={{ background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 14, padding: "18px 20px" }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#92400e", marginBottom: 14 }}>📝 Quiz Question <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 12 }}>(optional)</span></div>

                          <div style={{ marginBottom: 12 }}>
                            <label style={{ ...labelStyle, color: "#92400e" }}>Question</label>
                            <input value={lesson.quiz.question} onChange={e => updateQuiz(idx, "question", e.target.value)}
                              placeholder="e.g. Which keyword is used to declare a variable in Python?"
                              style={{ ...inputStyle, background: "#fff" }} />
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                            {lesson.quiz.options.map((opt, oi) => (
                              <div key={oi} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <button onClick={() => updateQuiz(idx, "answer", oi)}
                                  style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${lesson.quiz.answer === oi ? "#22c55e" : "#e2e8f0"}`, background: lesson.quiz.answer === oi ? "#22c55e" : "#fff", color: lesson.quiz.answer === oi ? "#fff" : "#94a3b8", fontWeight: 700, fontSize: 11, cursor: "pointer", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {lesson.quiz.answer === oi ? "✓" : String.fromCharCode(65 + oi)}
                                </button>
                                <input value={opt} onChange={e => updateQuizOption(idx, oi, e.target.value)}
                                  placeholder={`Option ${String.fromCharCode(65 + oi)}`}
                                  style={{ ...inputStyle, background: "#fff", flex: 1, padding: "9px 12px" }} />
                              </div>
                            ))}
                          </div>
                          <div style={{ fontSize: 12, color: "#b45309" }}>
                            💡 Click the circle button next to the correct answer to mark it as correct (shown in green ✓)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          
            <button onClick={addLesson}
              style={{ width: "100%", padding: "14px", border: "2px dashed #c4b5fd", background: "#fafbff", color: "#6C63FF", borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}>
              + Add Another Lesson
            </button>

          
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(1)}
                style={{ padding: "14px 28px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#718096", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                ← Back
              </button>
              <button onClick={handleSubmit} disabled={loading}
                style={{ flex: 1, padding: "14px", background: loading ? "#c4c4f0" : "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 16px rgba(108,99,255,0.3)" }}>
                {loading ? "Publishing…" : `🚀 Publish Course with ${lessons.length} Lesson${lessons.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCoursePage;
