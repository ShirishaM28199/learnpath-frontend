import { useState, useEffect } from "react";
import useRoute from "./hooks/useRoute";
import mockAuth from "./data/mockAuth";
import { MOCK_COURSES, SEED_LESSONS } from "./data/mockData";
import { CourseProvider, useCourses } from "./context/CourseContext";

import Navbar              from "./components/Navbar";
import HomePage            from "./pages/HomePage";
import AboutPage           from "./pages/AboutPage";
import PricingPage         from "./pages/PricingPage";
import ContactPage         from "./pages/ContactPage";
import CourseListPage      from "./pages/CourseListPage";
import LoginPage           from "./pages/LoginPage";
import RegisterPage        from "./pages/RegisterPage";
import EnrollmentPage      from "./pages/EnrollmentPage";
import MyCoursesPage       from "./pages/MyCoursesPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCoursePage    from "./pages/CreateCoursePage";
import AdminCoursesPage    from "./pages/AdminCoursesPage";
import AddLessonPage       from "./pages/AddLessonPage";
import LessonViewerPage    from "./pages/LessonViewerPage";
import CertificatePage     from "./pages/CertificatePage";

function lsGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function AppContent() {
  const { path, navigate } = useRoute();
  const [user, setUser] = useState(mockAuth.getUser());

  const [enrolledIds,    setEnrolledIds]    = useState(() => lsGet("lp_enrolled_ids",    [1, 4]));
  const [enrollProgress, setEnrollProgress] = useState(() => lsGet("lp_enroll_progress", { 1: "IN_PROGRESS", 4: "NOT_STARTED" }));
  const [courseLessons,  setCourseLessons]  = useState(() => lsGet("lp_course_lessons",  SEED_LESSONS));

  useEffect(() => { lsSet("lp_enrolled_ids",    enrolledIds);    }, [enrolledIds]);
  useEffect(() => { lsSet("lp_enroll_progress", enrollProgress); }, [enrollProgress]);
  useEffect(() => { lsSet("lp_course_lessons",  courseLessons);  }, [courseLessons]);

  const { instructorCourses, visibleInstructorCourses, updateCourseLessons } = useCourses();

  const login    = (e, p, r) => setUser(mockAuth.login(e, p, r));
  const register = (n, e, p, r) => setUser(mockAuth.register(n, e, p, r));
  const logout   = () => { mockAuth.logout(); setUser(null); navigate("/"); };

  const enroll = (id) => {
    setEnrolledIds(prev => prev.includes(id) ? prev : [...prev, id]);
    setEnrollProgress(prev => ({ ...prev, [id]: "NOT_STARTED" }));
  };

  const updateProgress = (id, status) =>
    setEnrollProgress(prev => ({ ...prev, [id]: status }));

  const addLesson = (courseId, lesson) => {
    setCourseLessons(prev => {
      const existing  = prev[courseId] || [];
      const newLesson = { ...lesson, id: Date.now(), orderNumber: existing.length + 1 };
      const updated   = [...existing, newLesson];
      if (instructorCourses.some(c => c.id === courseId)) {
        updateCourseLessons(courseId, updated);
      }
      return { ...prev, [courseId]: updated };
    });
  };

  const courseId       = path.startsWith("/enroll/")            ? Number(path.split("/")[2]) : null;
  const lessonCourseId = path.startsWith("/instructor/course/") ? Number(path.split("/")[3]) : null;
  const viewCourseId   = path.startsWith("/learn/")             ? Number(path.split("/")[2]) : null;
  const certCourseId   = path.startsWith("/certificate/")       ? Number(path.split("/")[2]) : null;

  const allCourses = [...visibleInstructorCourses, ...MOCK_COURSES];

  const uniqueCourses = allCourses.filter(
    (c, i, arr) => arr.findIndex(x => x.id === c.id) === i
  );

  const enrolledCourses = uniqueCourses
    .filter(c => enrolledIds.includes(c.id))
    .map(c => ({
      ...c,
      progressStatus: enrollProgress[c.id] || "NOT_STARTED",
      lessons: courseLessons[c.id] || c.lessons || [],
    }));

  const instructorDemoCourses = MOCK_COURSES.slice(0, 3);

  return (
    <div style={{ fontFamily: "'Sora','DM Sans','Segoe UI',sans-serif", minHeight: "100vh", background: "#f8f9fe" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sora', sans-serif; }
        a { text-decoration: none; }
        input, textarea, select, button { font-family: inherit; }
        input:focus, textarea:focus, select:focus {
          border-color: #6C63FF !important;
          box-shadow: 0 0 0 3px rgba(108,99,255,0.12) !important;
          outline: none;
        }
        .hover-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(108,99,255,0.14) !important; }
        .hover-lift:hover { transform: translateY(-2px); }
        .nav-link:hover   { color: #6C63FF !important; }
        .btn-primary:hover  { opacity: 0.92; transform: translateY(-1px); }
        .btn-outline:hover  { background: #f0efff !important; color: #6C63FF !important; }
        @keyframes fadeUp    { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float     { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .float   { animation: float  4s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 3px; }
      `}</style>

      <Navbar user={user} onLogout={logout} navigate={navigate} path={path} />

      <main>
        {path === "/"                         && <HomePage navigate={navigate} />}
        {path === "/courses"                  && <CourseListPage navigate={navigate} enrolledIds={enrolledIds} />}
        {path === "/about"                    && <AboutPage navigate={navigate} />}
        {path === "/pricing"                  && <PricingPage navigate={navigate} />}
        {path === "/contact"                  && <ContactPage navigate={navigate} />}
        {path === "/login"                    && <LoginPage onLogin={login} navigate={navigate} user={user} />}
        {path === "/register"                 && <RegisterPage onRegister={register} navigate={navigate} user={user} />}
        {path === "/my-courses"               && <MyCoursesPage user={user} courses={enrolledCourses} onUpdateProgress={updateProgress} navigate={navigate} />}
        {path === "/instructor/dashboard"     && <InstructorDashboard user={user} courses={instructorDemoCourses} courseLessons={courseLessons} navigate={navigate} />}
        {path === "/instructor/create-course" && <CreateCoursePage navigate={navigate} user={user} />}
        {path === "/admin/courses"            && <AdminCoursesPage courses={MOCK_COURSES} navigate={navigate} />}

       
        {courseId && (
          <EnrollmentPage
            courseId={courseId}
            user={user}
            onEnroll={enroll}
            enrolled={enrolledIds.includes(courseId)}
            navigate={navigate}
          />
        )}

        {lessonCourseId && (
          <AddLessonPage
            courseId={lessonCourseId}
            lessons={courseLessons[lessonCourseId] || []}
            onAddLesson={addLesson}
            navigate={navigate}
          />
        )}

        {viewCourseId && (
          <LessonViewerPage
            courseId={viewCourseId}
            course={enrolledCourses.find(c => c.id === viewCourseId)}
            navigate={navigate}
            onUpdateProgress={updateProgress}
          />
        )}

        {certCourseId && (
          <CertificatePage
            courseId={certCourseId}
            user={user}
            courses={enrolledCourses}
            navigate={navigate}
          />
        )}
      </main>
    </div>
  );
}


export default function App() {
  return (
    <CourseProvider>
      <AppContent />
    </CourseProvider>
  );
}
