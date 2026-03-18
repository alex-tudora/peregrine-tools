"use client";

import { useState, useMemo } from "react";

interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

const gradePoints: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

const gradeOptions = Object.keys(gradePoints);

function createCourse(): Course {
  return {
    id: crypto.randomUUID(),
    name: "",
    credits: "3",
    grade: "A",
  };
}

export function GpaCalculatorTool() {
  const [courses, setCourses] = useState<Course[]>([createCourse(), createCourse(), createCourse()]);

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addCourse = () => {
    setCourses((prev) => [...prev, createCourse()]);
  };

  const result = useMemo(() => {
    let totalCredits = 0;
    let totalPoints = 0;
    let validCourses = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      if (isNaN(credits) || credits <= 0 || !(course.grade in gradePoints)) continue;
      totalCredits += credits;
      totalPoints += credits * gradePoints[course.grade];
      validCourses++;
    }

    if (totalCredits === 0 || validCourses === 0) return null;

    return {
      gpa: totalPoints / totalCredits,
      totalCredits,
      validCourses,
    };
  }, [courses]);

  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 shadow-sm">
      {/* Header row */}
      <div className="hidden sm:grid sm:grid-cols-[1fr_80px_90px_40px] gap-3 mb-3">
        <span className="text-xs font-medium text-[color:var(--color-text-muted)]">
          Course Name
        </span>
        <span className="text-xs font-medium text-[color:var(--color-text-muted)]">Credits</span>
        <span className="text-xs font-medium text-[color:var(--color-text-muted)]">Grade</span>
        <span />
      </div>

      {/* Course rows */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-1 sm:grid-cols-[1fr_80px_90px_40px] gap-3 items-start"
          >
            <input
              type="text"
              value={course.name}
              onChange={(e) => updateCourse(course.id, "name", e.target.value)}
              placeholder="Course name"
              className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <input
              type="number"
              min="0"
              step="0.5"
              value={course.credits}
              onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
              placeholder="3"
              className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            />
            <select
              value={course.grade}
              onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
              className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2.5 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-accent)]"
            >
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeCourse(course.id)}
              disabled={courses.length <= 1}
              className="rounded-lg border border-[color:var(--color-border)] p-2.5 text-[color:var(--color-text-muted)] transition-colors hover:border-[color:var(--color-error)] hover:text-[color:var(--color-error)] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Remove course"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add course button */}
      <button
        onClick={addCourse}
        className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-[color:var(--color-border)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] w-full justify-center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add Course
      </button>

      {/* Result */}
      {result && (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-[color:var(--color-accent-light)] px-5 py-4 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">Your GPA</p>
            <p className="text-3xl font-bold text-[color:var(--color-accent)]">
              {result.gpa.toFixed(2)}
            </p>
            <p className="text-xs text-[color:var(--color-text-muted)] mt-1">out of 4.0</p>
          </div>
          <div className="rounded-lg border border-[color:var(--color-border)] px-5 py-4 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)] mb-1">Total Credits</p>
            <p className="text-3xl font-bold text-[color:var(--color-text-primary)]">
              {result.totalCredits}
            </p>
            <p className="text-xs text-[color:var(--color-text-muted)] mt-1">
              {result.validCourses} course{result.validCourses !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
