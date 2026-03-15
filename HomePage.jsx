import { useState } from "react";
import { MOCK_COURSES, CATEGORIES, STATS, TESTIMONIALS } from "../data/mockData";
import { HomeCourseCard, PageFooter } from "../components/shared";

// Real learner photos from Unsplash (free, no auth needed)
const LEARNER_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
    label: "Team learning session",
    size: "large",   // top-left, tall
  },
  {
    url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=300&q=80",
    label: "Student with laptop",
    size: "small",   
  },
  {
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&q=80",
    label: "Happy learner",
    size: "small",  
  },
  {
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80",
    label: "Focused student",
    size: "medium",  
  },
];

function HeroPhotoCollage() {
  return (
    <div style={{
      flex: "0 0 480px",
      position: "relative",
      height: 440,
    }}>
     
      <div style={{
        position: "absolute", inset: -24,
        borderRadius: "50%",
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.28) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 248, height: 272,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 24px 56px rgba(0,0,0,0.45)",
        border: "3px solid rgba(255,255,255,0.1)",
        animation: "float 6s ease-in-out infinite",
      }}>
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80"
          alt="Team learning"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
       
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 55%, rgba(15,12,41,0.55) 100%)",
        }} />
      </div>

      
      <div style={{
        position: "absolute", top: 20, right: 0,
        width: 196, height: 188,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 20px 48px rgba(0,0,0,0.4)",
        border: "3px solid rgba(255,255,255,0.08)",
        animation: "float 5s ease-in-out 0.8s infinite",
      }}>
        <img
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80"
          alt="Student with laptop"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 50%, rgba(15,12,41,0.5) 100%)",
        }} />
      </div>

     
      <div style={{
        position: "absolute", bottom: 0, left: 20,
        width: 210, height: 176,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 20px 48px rgba(0,0,0,0.4)",
        border: "3px solid rgba(255,255,255,0.08)",
        animation: "float 7s ease-in-out 1.2s infinite",
      }}>
        <img
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80"
          alt="Focused student"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 45%, rgba(15,12,41,0.5) 100%)",
        }} />
      </div>

     
      <div style={{
        position: "absolute", bottom: 10, right: 0,
        width: 200, height: 192,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 20px 48px rgba(0,0,0,0.4)",
        border: "3px solid rgba(255,255,255,0.08)",
        animation: "float 5.5s ease-in-out 0.4s infinite",
      }}>
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80"
          alt="Happy learner"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 45%, rgba(15,12,41,0.5) 100%)",
        }} />
      </div>

    
      <div style={{
        position: "absolute", top: 200, left: -12,
        background: "#fff",
        borderRadius: 16,
        padding: "10px 16px",
        boxShadow: "0 12px 36px rgba(0,0,0,0.3)",
        display: "flex", alignItems: "center", gap: 10,
        animation: "float 4.5s ease-in-out 0.6s infinite",
        zIndex: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg,#FFD166,#f59e0b)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18,
        }}>⭐</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e", lineHeight: 1 }}>4.9 / 5.0</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>48K+ reviews</div>
        </div>
      </div>

     
      <div style={{
        position: "absolute", bottom: 140, right: -16,
        background: "#fff",
        borderRadius: 16,
        padding: "10px 16px",
        boxShadow: "0 12px 36px rgba(0,0,0,0.3)",
        display: "flex", alignItems: "center", gap: 10,
        animation: "float 5s ease-in-out 1s infinite",
        zIndex: 10,
      }}>
        
        <div style={{ display: "flex", position: "relative", width: 52 }}>
          {["#6C63FF","#ec4899","#10b981"].map((c, i) => (
            <div key={i} style={{
              position: "absolute", left: i * 16,
              width: 28, height: 28, borderRadius: "50%",
              background: c, border: "2px solid #fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: "#fff", fontWeight: 800,
            }}>{["J","M","A"][i]}</div>
          ))}
        </div>
        <div style={{ marginLeft: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a2e", lineHeight: 1 }}>+2.4K online</div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>learning now</div>
        </div>
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#22c55e",
          boxShadow: "0 0 0 3px rgba(34,197,94,0.25)",
        }} />
      </div>

      
      <div style={{
        position: "absolute", top: -16, right: 60,
        background: "linear-gradient(135deg,#6C63FF,#4f46e5)",
        borderRadius: 14,
        padding: "8px 16px",
        boxShadow: "0 8px 24px rgba(108,99,255,0.45)",
        display: "flex", alignItems: "center", gap: 8,
        animation: "float 6s ease-in-out 0.2s infinite",
        zIndex: 10,
      }}>
        <span style={{ fontSize: 16 }}>🎓</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1 }}>New course added</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>React Advanced 2026</div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ navigate }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? MOCK_COURSES : MOCK_COURSES.filter(c => c.category === activeCategory);

  return (
    <div>
   
      <section style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0f0c29 0%,#1a1048 40%,#24243e 100%)", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
     
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(108,99,255,0.25) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "5%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,209,102,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
      
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{ position: "absolute", width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, borderRadius: "50%", background: "rgba(255,255,255,0.4)", top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animation: `pulse ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`, pointerEvents: "none" }} />
        ))}

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px", width: "100%", display: "flex", alignItems: "center", gap: 60 }}>
          <div style={{ flex: 1, maxWidth: 640 }} className="fade-up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(108,99,255,0.2)", border: "1px solid rgba(108,99,255,0.4)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6C63FF", display: "inline-block" }} />
              <span style={{ color: "#a5b4fc", fontSize: 13, fontWeight: 600 }}>Trusted by 48,000+ learners worldwide</span>
            </div>
            <h1 style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 800, color: "#fff", lineHeight: 1.12, marginBottom: 24, letterSpacing: "-2px" }}>
              Learn Without<br />
              <span style={{ background: "linear-gradient(135deg,#6C63FF,#a78bfa,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Limits.</span>
            </h1>
            <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
              World-class courses taught by industry experts. Learn at your own pace, build real skills, and launch your next career chapter.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => navigate("/courses")} className="btn-primary"
                style={{ padding: "16px 36px", borderRadius: 12, background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(108,99,255,0.4)", transition: "all 0.2s" }}>
                Explore Courses →
              </button>
              <button onClick={() => navigate("/register")}
                style={{ padding: "16px 36px", borderRadius: 12, background: "rgba(255,255,255,0.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", fontSize: 16, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)", transition: "all 0.2s" }}>
                Start Free Today
              </button>
            </div>
            <div style={{ display: "flex", gap: 28, marginTop: 48, flexWrap: "wrap" }}>
              {[["48K+", "Students"], ["12K+", "Courses"], ["4.9★", "Average Rating"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#fff" }}>{val}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

   
          <HeroPhotoCollage />

        </div>
      </section>

      
      <section style={{ background: "#fff", borderBottom: "1px solid #e8ecf4", padding: "0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", flexWrap: "wrap" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ flex: "1 1 200px", padding: "36px 24px", display: "flex", alignItems: "center", gap: 16, borderRight: i < STATS.length - 1 ? "1px solid #f0f4f8" : "none" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#f0efff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", letterSpacing: "-0.5px" }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

  
      <section style={{ padding: "100px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 0.5 }}>FEATURED COURSES</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 16 }}>Top picks for you</h2>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Hand-picked courses from our most-loved instructors, updated for 2026.</p>
        </div>

     
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: "9px 22px", borderRadius: 100, border: `1.5px solid ${activeCategory === cat ? "#6C63FF" : "#e2e8f0"}`, background: activeCategory === cat ? "#6C63FF" : "#fff", color: activeCategory === cat ? "#fff" : "#718096", fontSize: 14, fontWeight: activeCategory === cat ? 700 : 500, cursor: "pointer", transition: "all 0.2s" }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
          {filtered.map(course => <HomeCourseCard key={course.id} course={course} navigate={navigate} />)}
        </div>

        <div style={{ textAlign: "center", marginTop: 52 }}>
          <button onClick={() => navigate("/courses")} className="btn-outline"
            style={{ padding: "14px 40px", borderRadius: 12, border: "2px solid #e2e8f0", background: "#fff", color: "#1a1a2e", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
            View All 12,000+ Courses →
          </button>
        </div>
      </section>

      <section style={{ background: "linear-gradient(160deg,#0f0c29,#1a1048)", padding: "100px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "rgba(108,99,255,0.2)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>Three steps to mastery</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[
              { step: "01", icon: "🔍", title: "Find Your Course", desc: "Browse thousands of expert-led courses. Filter by topic, level, or instructor to find your perfect match." },
              { step: "02", icon: "🎯", title: "Learn at Your Pace", desc: "Watch lessons anytime, anywhere. Track your progress and pick up exactly where you left off." },
              { step: "03", icon: "🏆", title: "Earn & Grow", desc: "Complete courses, earn certificates, and unlock new career opportunities with verified credentials." },
            ].map((item) => (
              <div key={item.step} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "36px 32px" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>{item.icon}</div>
                <div style={{ fontSize: 12, color: "#6C63FF", fontWeight: 800, letterSpacing: 2, marginBottom: 10 }}>STEP {item.step}</div>
                <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 14 }}>{item.title}</h3>
                <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      <section style={{ padding: "100px 28px", background: "#f8f9fe" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>TESTIMONIALS</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-1px" }}>Loved by thousands</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 20, padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #f0f4f8" }}>
                <div style={{ fontSize: 28, color: "#e2e8f0", marginBottom: 16, fontFamily: "Georgia", lineHeight: 1 }}>"</div>
                <p style={{ fontSize: 15, color: "#4a5568", lineHeight: 1.8, marginBottom: 24 }}>{t.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: "#94a3b8", fontSize: 13 }}>{t.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#FFD166", fontSize: 14 }}>★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section style={{ background: "linear-gradient(135deg,#6C63FF 0%,#4f46e5 50%,#3730a3 100%)", padding: "80px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#fff", marginBottom: 20, letterSpacing: "-1px" }}>Ready to start learning?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>Join 48,000+ students already leveling up their skills. Your first course is completely free.</p>
          <button onClick={() => navigate("/register")}
            style={{ padding: "18px 48px", borderRadius: 14, background: "#fff", color: "#4f46e5", border: "none", fontSize: 17, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", transition: "all 0.2s" }}>
            Create Free Account →
          </button>
        </div>
      </section>

      <PageFooter navigate={navigate} />
    </div>
  );
}
export default HomePage;