import { useState } from "react";
import { MOCK_COURSES, CATEGORIES } from "../data/mockData";
import { HomeCourseCard, PageFooter } from "../components/shared";
import { useCourses } from "../context/CourseContext"; // ← import context

function CourseListPage({ navigate, enrolledIds }) {
  const { instructorCourses } = useCourses(); // ← get instructor created courses

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
  const SORT_OPTIONS = [["popular","Most Popular"],["rating","Top Rated"],["newest","Newest"]];

  
  const ALL_COURSES = [...instructorCourses, ...MOCK_COURSES];

  const filtered = ALL_COURSES
    .filter(c =>
      (category === "All" || c.category === category) &&
      (level === "All" || c.level === level) &&
      (c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : sortBy === "newest" ? b.id - a.id : b.enrolledCount - a.enrolledCount);

  const CAT_ICONS = { All:"🌐", Programming:"💻", Design:"🎨", Business:"💼", Marketing:"📱", "Data Science":"📊", Music:"🎵" };

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "#f8f9fe" }}>
      {/* Top hero bar */}
      <div style={{ background: "linear-gradient(160deg,#0f0c29,#1a1048)", padding: "48px 28px 72px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, marginBottom: 12, letterSpacing: "-1px" }}>Explore All Courses</h1>
        <p style={{ color: "#64748b", fontSize: 16, marginBottom: 28 }}>Find the perfect course for your goals.</p>
        <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 14, display: "flex", alignItems: "center", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
          <span style={{ padding: "0 16px", fontSize: 18 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses, topics…"
            style={{ flex: 1, border: "none", outline: "none", padding: "15px 0", fontSize: 15, color: "#1a1a2e", background: "transparent" }} />
          {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", padding: "0 16px", color: "#94a3b8", cursor: "pointer", fontSize: 16 }}>✕</button>}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "-36px auto 0", padding: "0 28px 80px", display: "flex", gap: 28, alignItems: "flex-start", position: "relative", zIndex: 10 }}>


        <div style={{ width: 260, flexShrink: 0, position: "sticky", top: 88 }}>
          <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #f0f4f8", overflow: "hidden" }}>

          
            <div style={{ padding: "20px 20px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Categories</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "none", background: category === cat ? "#f0efff" : "transparent", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
                    onMouseEnter={e => { if (category !== cat) e.currentTarget.style.background = "#f8f9fe"; }}
                    onMouseLeave={e => { if (category !== cat) e.currentTarget.style.background = "transparent"; }}>
                    <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{CAT_ICONS[cat]}</span>
                    <span style={{ fontSize: 14, fontWeight: category === cat ? 700 : 500, color: category === cat ? "#6C63FF" : "#4a5568", flex: 1 }}>{cat}</span>
                    {category === cat && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6C63FF", flexShrink: 0 }} />}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "#f0f4f8" }} />

            <div style={{ padding: "18px 20px 16px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Level</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {LEVELS.map(l => (
                  <label key={l} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <div onClick={() => setLevel(l)} style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${level === l ? "#6C63FF" : "#cbd5e0"}`, background: level === l ? "#6C63FF" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                      {level === l && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <span onClick={() => setLevel(l)} style={{ fontSize: 14, color: level === l ? "#6C63FF" : "#4a5568", fontWeight: level === l ? 700 : 400 }}>{l}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "#f0f4f8" }} />

          
            <div style={{ padding: "18px 20px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Sort By</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {SORT_OPTIONS.map(([val, lbl]) => (
                  <label key={val} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <div onClick={() => setSortBy(val)} style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${sortBy === val ? "#6C63FF" : "#cbd5e0"}`, background: sortBy === val ? "#6C63FF" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                      {sortBy === val && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <span onClick={() => setSortBy(val)} style={{ fontSize: 14, color: sortBy === val ? "#6C63FF" : "#4a5568", fontWeight: sortBy === val ? 700 : 400 }}>{lbl}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "#f0f4f8" }} />

           
            <div style={{ padding: "14px 20px" }}>
              <button onClick={() => { setCategory("All"); setLevel("All"); setSortBy("popular"); setSearch(""); }}
                style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", color: "#718096", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#6C63FF"; e.currentTarget.style.color = "#6C63FF"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#718096"; }}>
                ↺ Reset Filters
              </button>
            </div>
          </div>
        </div>

      
        <div style={{ flex: 1 }}>
       
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, background: "#fff", borderRadius: 14, padding: "14px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: "1px solid #f0f4f8" }}>
            <span style={{ fontSize: 14, color: "#64748b" }}>
              <strong style={{ color: "#1a1a2e" }}>{filtered.length}</strong> course{filtered.length !== 1 ? "s" : ""} found
              {instructorCourses.length > 0 && (
                <span style={{ marginLeft: 8, padding: "2px 10px", background: "#f0fdf4", color: "#15803d", borderRadius: 100, fontSize: 12, fontWeight: 600 }}>
                  +{instructorCourses.length} new
                </span>
              )}
              {category !== "All" && <span style={{ marginLeft: 8, padding: "2px 10px", background: "#f0efff", color: "#6C63FF", borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{category}</span>}
              {level !== "All" && <span style={{ marginLeft: 6, padding: "2px 10px", background: "#f0fdf4", color: "#15803d", borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{level}</span>}
            </span>
            <span style={{ fontSize: 13, color: "#94a3b8" }}>Sorted by: <strong style={{ color: "#4a5568" }}>{SORT_OPTIONS.find(s=>s[0]===sortBy)?.[1]}</strong></span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", background: "#fff", borderRadius: 20 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
              <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 20 }}>No courses match your filters.</p>
              <button onClick={() => { setCategory("All"); setLevel("All"); setSearch(""); }}
                style={{ padding: "10px 24px", background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 22 }}>
              {filtered.map(c => <HomeCourseCard key={c.id} course={c} navigate={navigate} />)}
            </div>
          )}
        </div>
      </div>

      <PageFooter navigate={navigate} />
    </div>
  );
}

export default CourseListPage;