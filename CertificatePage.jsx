import { useRef } from "react";

function CertificatePage({ user, courseId, courses, navigate }) {
  const certRef = useRef(null);


  const course = courses?.find(c => c.id === courseId);
  const courseName = course?.title || "the Course";
  const instructorName = course?.instructorName || "Instructor";
  const studentName = user?.name || "Student";
  const completionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const certId = `LP-${courseId}-${user?.id || "000"}`.toUpperCase();


  const handleDownload = () => {
    window.print();
  };

  if (!course) {
    return (
      <div style={{ paddingTop: 120, textAlign: "center", fontFamily: "'Sora',sans-serif" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 20 }}>Certificate not found.</p>
        <button onClick={() => navigate("/my-courses")}
          style={{ padding: "12px 28px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
          ← My Courses
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fe", paddingTop: 68, fontFamily: "'Sora','DM Sans',sans-serif" }}>

    
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Sora:wght@300;400;600;700;800&display=swap');
        @media print {
          body * { visibility: hidden !important; }
          #certificate-print, #certificate-print * { visibility: visible !important; }
          #certificate-print {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            margin: 0 !important; padding: 0 !important;
            box-shadow: none !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

   
      <div className="no-print" style={{ background: "#fff", borderBottom: "1px solid #e8ecf4", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("/my-courses")}
          style={{ background: "none", border: "none", color: "#6C63FF", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          ← Back to My Courses
        </button>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate("/courses")}
            style={{ padding: "9px 20px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#718096", borderRadius: 9, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            Browse More Courses
          </button>
          <button onClick={handleDownload}
            style={{ padding: "9px 20px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 4px 12px rgba(108,99,255,0.3)", display: "flex", alignItems: "center", gap: 7 }}>
            ⬇️ Download Certificate
          </button>
        </div>
      </div>


      <div style={{ maxWidth: 960, margin: "40px auto", padding: "0 24px 80px" }}>

 
        <div className="no-print" style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Congratulations, {studentName}!
          </h1>
          <p style={{ color: "#64748b", fontSize: 16 }}>
            You've successfully completed <strong style={{ color: "#6C63FF" }}>{courseName}</strong>.
            Your certificate is below.
          </p>
        </div>

    
        <div id="certificate-print" ref={certRef} style={{
          background: "#fff",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          position: "relative",
        }}>


          <div style={{ height: 10, background: "linear-gradient(90deg,#6C63FF,#a78bfa,#FFD166,#f59e0b)" }} />

      
          <div style={{ padding: "56px 72px", position: "relative", overflow: "hidden" }}>

            
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(108,99,255,0.04) 0%,transparent 70%)", pointerEvents: "none" }} />

            <div style={{ position: "absolute", top: 24, left: 24, width: 60, height: 60, borderTop: "3px solid #6C63FF", borderLeft: "3px solid #6C63FF", borderRadius: "4px 0 0 0", opacity: 0.4 }} />
            <div style={{ position: "absolute", top: 24, right: 24, width: 60, height: 60, borderTop: "3px solid #6C63FF", borderRight: "3px solid #6C63FF", borderRadius: "0 4px 0 0", opacity: 0.4 }} />
            <div style={{ position: "absolute", bottom: 24, left: 24, width: 60, height: 60, borderBottom: "3px solid #6C63FF", borderLeft: "3px solid #6C63FF", borderRadius: "0 0 0 4px", opacity: 0.4 }} />
            <div style={{ position: "absolute", bottom: 24, right: 24, width: 60, height: 60, borderBottom: "3px solid #6C63FF", borderRight: "3px solid #6C63FF", borderRadius: "0 0 4px 0", opacity: 0.4 }} />

     
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 36 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#6C63FF,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(108,99,255,0.4)" }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M4 16L10 4L16 16H4Z" fill="white" />
                  <circle cx="10" cy="11.5" r="2.8" fill="#FFD166" />
                </svg>
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#0f0c29", letterSpacing: "-0.5px" }}>
                Learn<span style={{ color: "#6C63FF" }}>Path</span>
              </span>
            </div>

            
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ display: "inline-block", padding: "5px 20px", borderRadius: 100, border: "1.5px solid #e2e8f0", fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
                Certificate of Completion
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 16, color: "#64748b", marginBottom: 16, fontStyle: "italic" }}>This is to certify that</p>

   
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 52, fontWeight: 900, color: "#1a1a2e", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16, background: "linear-gradient(135deg,#1a1a2e,#6C63FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {studentName}
              </div>

        
              <div style={{ width: 240, height: 2, background: "linear-gradient(90deg,transparent,#6C63FF,transparent)", margin: "0 auto 24px" }} />

              <p style={{ fontSize: 16, color: "#64748b", marginBottom: 16, fontStyle: "italic" }}>has successfully completed</p>

              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.5px", lineHeight: 1.3, marginBottom: 8, maxWidth: 600, margin: "0 auto 12px" }}>
                {courseName}
              </div>

              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
                <span style={{ padding: "5px 16px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 13, fontWeight: 700 }}>{course.category}</span>
                <span style={{ padding: "5px 16px", borderRadius: 100, background: "#f0fdf4", color: "#15803d", fontSize: 13, fontWeight: 700 }}>{course.level}</span>
                <span style={{ padding: "5px 16px", borderRadius: 100, background: "#fffbeb", color: "#b45309", fontSize: 13, fontWeight: 700 }}>
                  {course.lessonCount || course.lessons?.length || 0} Lessons
                </span>
              </div>
            </div>

            <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#e2e8f0,transparent)", margin: "0 0 32px" }} />

        
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>

          
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 4, fontFamily: "'Playfair Display',serif" }}>{completionDate}</div>
                <div style={{ width: 140, height: 1, background: "#e2e8f0", margin: "8px auto" }} />
                <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Date of Completion</div>
              </div>

           
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 4px 20px rgba(108,99,255,0.4)", border: "3px solid rgba(255,255,255,0.3)" }}>
                  <div style={{ fontSize: 28 }}>🏆</div>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.8)", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 2 }}>Certified</div>
                </div>
              </div>

           
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", marginBottom: 4, fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>{instructorName}</div>
                <div style={{ width: 140, height: 1, background: "#e2e8f0", margin: "8px auto" }} />
                <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Course Instructor</div>
              </div>
            </div>

      
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <div style={{ display: "inline-block", padding: "5px 16px", borderRadius: 100, background: "#f8f9fe", border: "1px solid #e2e8f0", fontSize: 11, color: "#94a3b8", fontWeight: 600, letterSpacing: 1 }}>
                Certificate ID: {certId}
              </div>
            </div>
          </div>

         
          <div style={{ height: 8, background: "linear-gradient(90deg,#FFD166,#f59e0b,#6C63FF,#a78bfa)" }} />
        </div>

     
        <div className="no-print" style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          <button onClick={handleDownload}
            style={{ padding: "13px 32px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 16px rgba(108,99,255,0.3)" }}>
            ⬇️ Download as PDF
          </button>
          <button onClick={() => navigate("/courses")}
            style={{ padding: "13px 32px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#4a5568", borderRadius: 12, fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
            📚 Browse More Courses
          </button>
          <button onClick={() => navigate("/my-courses")}
            style={{ padding: "13px 32px", border: "1.5px solid #e2e8f0", background: "#fff", color: "#4a5568", borderRadius: 12, fontWeight: 600, fontSize: 15, cursor: "pointer" }}>
            🎓 My Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default CertificatePage;
