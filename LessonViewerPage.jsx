import { useState } from "react";
import { LESSON_QUIZZES, DEFAULT_QUIZZES } from "../data/mockData";

function LessonViewerPage({ courseId, course, navigate, onUpdateProgress }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState({});
  const [quizState, setQuizState] = useState({}); // { lessonId: { selected, submitted } }

  if (!course) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", fontFamily: "'Sora',sans-serif" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 20 }}>Please enroll in this course first.</p>
        <button onClick={() => navigate("/courses")} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>Browse Courses</button>
      </div>
    );
  }

  const lessons = course.lessons || [];

  if (lessons.length === 0) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", fontFamily: "'Sora',sans-serif" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
        <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 8 }}>No lessons have been added yet.</p>
        <p style={{ color: "#cbd5e0", fontSize: 14, marginBottom: 24 }}>Check back soon — the instructor is still building this course.</p>
        <button onClick={() => navigate("/my-courses")} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>← My Courses</button>
      </div>
    );
  }

  const lesson = lessons[activeLesson];
  const completedCount = Object.values(completed).filter(Boolean).length;
  const allDone = completedCount === lessons.length;

  
  const getQuiz = (lessonId) => {
    if (LESSON_QUIZZES[lessonId]) return LESSON_QUIZZES[lessonId];
   
    return DEFAULT_QUIZZES[lessonId % DEFAULT_QUIZZES.length];
  };

  const quiz = getQuiz(lesson.id);
  const qState = quizState[lesson.id] || { selected: null, submitted: false };

  const handleQuizSelect = (idx) => {
    if (qState.submitted) return;
    setQuizState(prev => ({ ...prev, [lesson.id]: { ...prev[lesson.id], selected: idx, submitted: false } }));
  };

  const handleQuizSubmit = () => {
    if (qState.selected === null) return;
    setQuizState(prev => ({ ...prev, [lesson.id]: { ...prev[lesson.id], submitted: true } }));
  };

  const isCorrect = qState.submitted && qState.selected === quiz.answer;


  const markComplete = (idx) => {
    const newCompleted = { ...completed, [idx]: true };
    setCompleted(newCompleted);
    const allFinished = Object.values(newCompleted).filter(Boolean).length === lessons.length;
    if (allFinished) onUpdateProgress(courseId, "COMPLETED");
    else onUpdateProgress(courseId, "IN_PROGRESS");
  };

  const goNext = () => {
    markComplete(activeLesson);
    if (activeLesson < lessons.length - 1) setActiveLesson(activeLesson + 1);
  };


  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const videoUrl = getEmbedUrl(lesson.videoUrl);

  return (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 68, fontFamily: "'Sora',sans-serif", background: "#f8f9fe" }}>

  
      <div style={{ width: 300, background: "#fff", borderRight: "1px solid #e8ecf4", display: "flex", flexDirection: "column", position: "sticky", top: 68, height: "calc(100vh - 68px)", overflowY: "auto", flexShrink: 0 }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #f0f4f8" }}>
          <button onClick={() => navigate("/my-courses")} style={{ background: "none", border: "none", color: "#6C63FF", fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 12, padding: 0 }}>← My Courses</button>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: course.coverColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{course.emoji}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>{course.title}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{completedCount}/{lessons.length} completed</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ height: 5, borderRadius: 100, background: "#f0f4f8", overflow: "hidden" }}>
              <div style={{ width: `${(completedCount / lessons.length) * 100}%`, height: "100%", background: "linear-gradient(90deg,#6C63FF,#a78bfa)", borderRadius: 100, transition: "width 0.4s" }} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "12px" }}>
          {lessons.map((l, i) => {
            const isActive = i === activeLesson;
            const isDone = completed[i];
            const hasQuiz = !!getQuiz(l.id);
            return (
              <button key={l.id} onClick={() => setActiveLesson(i)}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, width: "100%", padding: "12px 12px", borderRadius: 12, border: "none", background: isActive ? "#f0efff" : "transparent", cursor: "pointer", textAlign: "left", marginBottom: 2, transition: "background 0.15s" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: isDone ? "#22c55e" : isActive ? "#6C63FF" : "#e2e8f0", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                  {isDone ? "✓" : l.orderNumber}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? "#6C63FF" : isDone ? "#15803d" : "#4a5568", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.title}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 3 }}>
                    {l.duration && <span style={{ fontSize: 11, color: "#94a3b8" }}>⏱ {l.duration}</span>}
                    {l.videoUrl && <span style={{ fontSize: 11, color: "#6C63FF" }}>▶ Video</span>}
                    {hasQuiz && <span style={{ fontSize: 11, color: "#f59e0b" }}>📝 Quiz</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 40px 80px" }}>

      
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ background: "#f0efff", color: "#6C63FF", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 100 }}>Lesson {lesson.orderNumber}</span>
              {lesson.duration && <span style={{ background: "#f8f9fe", color: "#94a3b8", fontSize: 12, padding: "4px 12px", borderRadius: 100, border: "1px solid #e2e8f0" }}>⏱ {lesson.duration}</span>}
              {completed[activeLesson] && <span style={{ background: "#f0fdf4", color: "#15803d", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 100 }}>✓ Completed</span>}
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px", lineHeight: 1.3 }}>{lesson.title}</h1>
          </div>

          
          {videoUrl && (
            <div style={{ marginBottom: 32, borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid #e8ecf4" }}>
              <div style={{ background: "#0f0c29", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FF0000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="white"><polygon points="4,2 10,6 4,10" /></svg>
                </div>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{lesson.title}</span>
              </div>
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src={videoUrl}
                  title={lesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          )}

          
          <div style={{ background: "#fff", borderRadius: 20, padding: "36px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #f0f4f8", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 18 }}>📖</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>Lesson Notes</span>
            </div>
            <div style={{ fontSize: 15, color: "#374151", lineHeight: 1.9, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{lesson.content}</div>
          </div>

          
          <div style={{ background: "linear-gradient(135deg,#f0efff,#e8e6ff)", border: "1px solid #c4b5fd", borderRadius: 16, padding: "22px 28px", marginBottom: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#6C63FF", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>📌 Key Takeaways</div>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Understand the core concept introduced in this lesson", "Practice the examples shown with your own variations", "Complete the quiz below before moving to the next lesson"].map((t, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "#4a5568" }}>
                  <span style={{ color: "#6C63FF", fontWeight: 700 }}>→</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #f0f4f8", marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📝</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e" }}>Quick Quiz</div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>Test your understanding before moving on</div>
              </div>
              {qState.submitted && (
                <div style={{ marginLeft: "auto", padding: "6px 16px", borderRadius: 100, background: isCorrect ? "#f0fdf4" : "#fff5f5", color: isCorrect ? "#15803d" : "#c53030", fontWeight: 700, fontSize: 13 }}>
                  {isCorrect ? "✓ Correct!" : "✗ Try again"}
                </div>
              )}
            </div>

            <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e", marginBottom: 18, lineHeight: 1.5 }}>{quiz.question}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {quiz.options.map((option, idx) => {
                let bg = "#f8f9fe";
                let border = "1.5px solid #e2e8f0";
                let color = "#4a5568";
                if (qState.selected === idx && !qState.submitted) {
                  bg = "#f0efff"; border = "1.5px solid #6C63FF"; color = "#6C63FF";
                }
                if (qState.submitted) {
                  if (idx === quiz.answer) {
                    bg = "#f0fdf4"; border = "1.5px solid #22c55e"; color = "#15803d";
                  } else if (idx === qState.selected && idx !== quiz.answer) {
                    bg = "#fff5f5"; border = "1.5px solid #ef4444"; color = "#c53030";
                  }
                }
                return (
                  <button key={idx} onClick={() => handleQuizSelect(idx)}
                    disabled={qState.submitted}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12, border, background: bg, color, fontSize: 14, fontWeight: qState.selected === idx ? 600 : 400, cursor: qState.submitted ? "default" : "pointer", textAlign: "left", transition: "all 0.15s" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${qState.selected === idx && !qState.submitted ? "#6C63FF" : qState.submitted && idx === quiz.answer ? "#22c55e" : qState.submitted && idx === qState.selected ? "#ef4444" : "#e2e8f0"}`, background: qState.selected === idx && !qState.submitted ? "#6C63FF" : qState.submitted && idx === quiz.answer ? "#22c55e" : qState.submitted && idx === qState.selected ? "#ef4444" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "#fff", fontWeight: 700 }}>
                      {qState.submitted && idx === quiz.answer ? "✓" : qState.submitted && idx === qState.selected && idx !== quiz.answer ? "✗" : String.fromCharCode(65 + idx)}
                    </div>
                    {option}
                  </button>
                );
              })}
            </div>

            {!qState.submitted ? (
              <button onClick={handleQuizSubmit} disabled={qState.selected === null}
                style={{ padding: "12px 28px", background: qState.selected === null ? "#e2e8f0" : "linear-gradient(135deg,#f59e0b,#d97706)", color: qState.selected === null ? "#94a3b8" : "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: qState.selected === null ? "not-allowed" : "pointer", boxShadow: qState.selected !== null ? "0 4px 14px rgba(245,158,11,0.3)" : "none" }}>
                Submit Answer →
              </button>
            ) : (
              <div style={{ padding: "14px 20px", borderRadius: 12, background: isCorrect ? "#f0fdf4" : "#fff5f5", border: `1px solid ${isCorrect ? "#bbf7d0" : "#fecaca"}` }}>
                <div style={{ fontWeight: 700, color: isCorrect ? "#15803d" : "#c53030", marginBottom: 4, fontSize: 15 }}>
                  {isCorrect ? "🎉 Correct! Great job!" : "💡 Not quite right."}
                </div>
                <div style={{ fontSize: 14, color: isCorrect ? "#166534" : "#991b1b" }}>
                  {isCorrect
                    ? "You've understood this concept well. Move on to the next lesson!"
                    : `The correct answer is: "${quiz.options[quiz.answer]}". Review the lesson content and try again next time!`}
                </div>
              </div>
            )}
          </div>

     
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <button onClick={() => { if (activeLesson > 0) setActiveLesson(activeLesson - 1); }}
              disabled={activeLesson === 0}
              style={{ padding: "13px 24px", border: "1.5px solid #e2e8f0", borderRadius: 12, background: "#fff", color: activeLesson === 0 ? "#cbd5e0" : "#4a5568", fontSize: 14, fontWeight: 600, cursor: activeLesson === 0 ? "not-allowed" : "pointer" }}>
              ← Previous
            </button>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>{activeLesson + 1} of {lessons.length}</div>
            </div>

            {activeLesson < lessons.length - 1 ? (
              <button onClick={goNext}
                style={{ padding: "13px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(108,99,255,0.3)" }}>
                {completed[activeLesson] ? "Next Lesson →" : "Complete & Continue →"}
              </button>
            ) : (
              <button onClick={() => markComplete(activeLesson)}
                style={{ padding: "13px 28px", background: allDone ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(108,99,255,0.3)" }}>
                {allDone ? "🏆 Course Complete!" : "✓ Finish Course"}
              </button>
            )}
          </div>

     
          {allDone && (
            <div style={{ marginTop: 36, background: "linear-gradient(135deg,#0f0c29,#1a1048)", borderRadius: 20, padding: "36px", textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🏆</div>
              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Congratulations!</h2>
              <p style={{ color: "#94a3b8", fontSize: 15, marginBottom: 24 }}>You've completed <strong style={{ color: "#a78bfa" }}>{course.title}</strong>. Your certificate is ready.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button onClick={() => navigate(`/certificate/${courseId}`)} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>View Certificate</button>
                <button onClick={() => navigate("/courses")} style={{ padding: "12px 28px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Browse More Courses</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonViewerPage;
