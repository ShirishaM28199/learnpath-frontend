import { createContext, useContext, useState, useEffect } from "react";

const CourseContext = createContext();
const STORAGE_KEY        = "lp_instructor_courses";
const STORAGE_KEY_BACKUP = "lp_instructor_courses_backup";

const CATEGORY_DEFAULTS = {
  Programming:    { emoji: "💻", coverColor: "linear-gradient(135deg,#3b82f6,#1d4ed8)" },
  Design:         { emoji: "🎨", coverColor: "linear-gradient(135deg,#ec4899,#9333ea)" },
  "Data Science": { emoji: "📊", coverColor: "linear-gradient(135deg,#10b981,#059669)" },
  Business:       { emoji: "💼", coverColor: "linear-gradient(135deg,#6366f1,#4f46e5)" },
  Marketing:      { emoji: "📱", coverColor: "linear-gradient(135deg,#f59e0b,#d97706)" },
  Music:          { emoji: "🎵", coverColor: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
};
const DEFAULT = { emoji: "📚", coverColor: "linear-gradient(135deg,#6C63FF,#4f46e5)" };

function loadCourses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    const backup = localStorage.getItem(STORAGE_KEY_BACKUP);
    if (backup) {
      const parsed = JSON.parse(backup);
      localStorage.setItem(STORAGE_KEY, backup);
      return parsed;
    }

    return [];
  } catch { return []; }
}

function saveCourses(courses) {
  try {
    const data = JSON.stringify(courses);
    localStorage.setItem(STORAGE_KEY, data);
    localStorage.setItem(STORAGE_KEY_BACKUP, data);
  } catch {}
}

export function CourseProvider({ children }) {
  const [instructorCourses, setInstructorCourses] = useState(loadCourses);
  useEffect(() => { saveCourses(instructorCourses); }, [instructorCourses]);

  const addCourse = (course) => {
    const defaults = CATEGORY_DEFAULTS[course.category] || DEFAULT;
    const newCourse = {
      ...course,
      id:             Date.now(),
      status:         "PENDING",
      rating:         0,
      enrolledCount:  0,
      lessonCount:    course.lessons?.length || course.lessonCount || 0,
      lessons:        course.lessons || [],
      emoji:          course.emoji      || defaults.emoji,
      coverColor:     course.coverColor || defaults.coverColor,
      instructorName: course.instructor || "Instructor",
      createdAt:      new Date().toISOString(),
    };
    setInstructorCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id, updates) => {
    setInstructorCourses(prev =>
      prev.map(c => c.id === id ? { ...c, ...updates } : c)
    );
  };

  const updateCourseLessons = (courseId, lessons) => {
    setInstructorCourses(prev =>
      prev.map(c =>
        c.id === courseId
          ? { ...c, lessons, lessonCount: lessons.length }
          : c
      )
    );
  };

  const clearAllCourses = () => {
    setInstructorCourses([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY_BACKUP);
  };

  const approvedInstructorCourses = instructorCourses.filter(
    c => c.status === "APPROVED"
  );

  const visibleInstructorCourses = approvedInstructorCourses;

  return (
    <CourseContext.Provider value={{
      instructorCourses,
      visibleInstructorCourses,
      approvedInstructorCourses,
      addCourse,
      updateCourse,
      updateCourseLessons,
      clearAllCourses,
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export const useCourses = () => useContext(CourseContext);
