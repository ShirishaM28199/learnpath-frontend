import { PageFooter } from "../components/shared";
import { STATS } from "../data/mockData";

const TEAM = [
  { name: "Dr. Sarah Chen",  role: "Co-Founder & CEO",     avatar: "S", color: "#6C63FF", bio: "Former Stanford CS professor. Built 3 ed-tech startups before LearnPath." },
  { name: "Marco Vitelli",   role: "Co-Founder & CPO",     avatar: "M", color: "#ec4899", bio: "Ex-Airbnb designer. Obsessed with learning experiences that actually stick." },
  { name: "James O'Brien",   role: "CTO",                  avatar: "J", color: "#10b981", bio: "Previously led engineering at Duolingo. 15 years in scalable learning platforms." },
  { name: "Priya Nair",      role: "Head of Curriculum",   avatar: "P", color: "#f59e0b", bio: "Instructional designer with a passion for making complex topics approachable." },
];

const VALUES = [
  { icon: "🎯", title: "Learning first",       desc: "Every decision we make starts with one question: does this help students learn better?" },
  { icon: "🌍", title: "Access for everyone",  desc: "World-class education shouldn't be gated by geography or income. Most courses are free." },
  { icon: "🤝", title: "Instructor success",   desc: "When our instructors thrive, students thrive. We give creators the best tools and fair revenue share." },
  { icon: "🔬", title: "Evidence-based",        desc: "We use learning science — spaced repetition, retrieval practice, and active recall — to drive outcomes." },
];

function AboutPage({ navigate }) {
  return (
    <div style={{ paddingTop: 68 }}>

      <section style={{ background: "linear-gradient(160deg,#0f0c29 0%,#1a1048 50%,#24243e 100%)", padding: "100px 28px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(108,99,255,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,209,102,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "rgba(108,99,255,0.2)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, marginBottom: 24, letterSpacing: 1 }}>OUR STORY</div>
          <h1 style={{ fontSize: "clamp(36px,5vw,62px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 24 }}>
            Education that opens<br />
            <span style={{ background: "linear-gradient(135deg,#6C63FF,#a78bfa,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>every door.</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 40px" }}>
            LearnPath was born in 2021 from a simple belief: the best teachers in the world should be able to reach anyone, anywhere.
          </p>
          <button onClick={() => navigate("/courses")}
            style={{ padding: "16px 40px", borderRadius: 12, background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(108,99,255,0.4)" }}>
            Explore Courses →
          </button>
        </div>
      </section>

      <section style={{ background: "#fff", borderBottom: "1px solid #e8ecf4" }}>
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

     
      <section style={{ padding: "100px 28px", maxWidth: 1100, margin: "0 auto", display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>OUR MISSION</div>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 20 }}>
            Democratising world-class skills
          </h2>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            We partner with the world's best educators and practitioners to produce courses that go beyond theory — content that gets you hired, promoted, or launched.
          </p>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.8 }}>
            With 48,000+ active learners across 120+ countries, we're proving that when great teaching meets great technology, anything is possible.
          </p>
        </div>
        <div style={{ flex: "0 0 420px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["🚀","2021","Founded"], ["🌍","120+","Countries"], ["🎓","48K+","Graduates"], ["⭐","4.9","Avg. Rating"]].map(([icon, num, lbl]) => (
            <div key={lbl} style={{ background: "#fff", borderRadius: 18, padding: "24px 20px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f0f4f8" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e" }}>{num}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

     
      <section style={{ background: "linear-gradient(160deg,#0f0c29,#1a1048)", padding: "100px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "rgba(108,99,255,0.2)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>OUR VALUES</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>What we stand for</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 28px" }}>
                <div style={{ fontSize: 40, marginBottom: 18 }}>{v.icon}</div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 28px", background: "#f8f9fe" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>THE TEAM</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-1px" }}>Meet the people behind LearnPath</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 22 }}>
            {TEAM.map((t) => (
              <div key={t.name} style={{ background: "#fff", borderRadius: 20, padding: "28px 22px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f0f4f8" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: t.color, color: "#fff", fontWeight: 800, fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  {t.avatar}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e", marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: t.color, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{t.role}</div>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section style={{ background: "linear-gradient(135deg,#6C63FF,#4f46e5)", padding: "80px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-1px" }}>Join us on the mission.</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
            Whether you're here to learn, teach, or build — there's a place for you at LearnPath.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/register")}
              style={{ padding: "16px 36px", borderRadius: 12, background: "#fff", color: "#4f46e5", border: "none", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
              Get Started Free →
            </button>
            <button onClick={() => navigate("/contact")}
              style={{ padding: "16px 36px", borderRadius: 12, background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <PageFooter navigate={navigate} />
    </div>
  );
}

export default AboutPage;