"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { logActivity } from "@peregrine/ui";

type Phase = "work" | "shortBreak" | "longBreak";

interface Durations {
  work: number;
  shortBreak: number;
  longBreak: number;
}

const DEFAULT_DURATIONS: Durations = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

const PHASE_LABELS: Record<Phase, string> = {
  work: "Focus Time",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const CIRCUMFERENCE = 2 * Math.PI * 54; // ~339.29

function playBeep() {
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.8);
    setTimeout(() => ctx.close(), 1000);
  } catch {
    // Web Audio API not available — silently ignore
  }
}

function sendNotification(phase: Phase) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  const title = phase === "work" ? "Focus session complete!" : "Break is over!";
  const body =
    phase === "work"
      ? "Great work! Time for a break."
      : "Ready to focus again?";
  try {
    new Notification(title, { body, icon: "/favicon.ico" });
  } catch {
    // Notification blocked or unavailable
  }
}

function getNextPhase(current: Phase, workSessionsInCycle: number): Phase {
  if (current === "work") {
    return workSessionsInCycle >= 4 ? "longBreak" : "shortBreak";
  }
  return "work";
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function PomodoroTimerTool() {
  const [durations, setDurations] = useState<Durations>(DEFAULT_DURATIONS);
  const [phase, setPhase] = useState<Phase>("work");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [workSessionsInCycle, setWorkSessionsInCycle] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unavailable">("default");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSeconds = durations[phase] * 60;
  const progress = totalSeconds > 0 ? (totalSeconds - timeLeft) / totalSeconds : 0;
  const offset = CIRCUMFERENCE * (1 - progress);

  // Restore session count from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("pomodoro-completed");
      if (stored) setCompletedPomodoros(parseInt(stored, 10) || 0);
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  // Persist session count
  useEffect(() => {
    try {
      sessionStorage.setItem("pomodoro-completed", String(completedPomodoros));
    } catch {
      // sessionStorage unavailable
    }
  }, [completedPomodoros]);

  // Check notification permission on mount
  useEffect(() => {
    if (typeof Notification === "undefined") {
      setNotificationPermission("unavailable");
    } else {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handlePhaseComplete = useCallback(() => {
    playBeep();
    sendNotification(phase);

    if (phase === "work") {
      const newCount = completedPomodoros + 1;
      const newCycleCount = workSessionsInCycle + 1;
      setCompletedPomodoros(newCount);
      setWorkSessionsInCycle(newCycleCount);

      logActivity({
        tool: "Pomodoro Timer",
        toolHref: "/pomodoro-timer",
        description: `Completed focus session #${newCount}`,
      });

      const next = getNextPhase("work", newCycleCount);
      setPhase(next);
      setTimeLeft(durations[next] * 60);

      if (next === "longBreak") {
        setWorkSessionsInCycle(0);
      }
    } else {
      setPhase("work");
      setTimeLeft(durations.work * 60);
    }

    setIsRunning(false);
  }, [phase, completedPomodoros, workSessionsInCycle, durations]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handlePhaseComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, handlePhaseComplete]);

  function handleStartPause() {
    if (!isRunning && notificationPermission === "default") {
      Notification.requestPermission().then((perm) => {
        setNotificationPermission(perm);
      });
    }
    setIsRunning((prev) => !prev);
  }

  function handleReset() {
    setIsRunning(false);
    setPhase("work");
    setTimeLeft(durations.work * 60);
    setWorkSessionsInCycle(0);
  }

  function handleSkip() {
    setIsRunning(false);
    if (phase === "work") {
      const next = getNextPhase("work", workSessionsInCycle);
      setPhase(next);
      setTimeLeft(durations[next] * 60);
    } else {
      setPhase("work");
      setTimeLeft(durations.work * 60);
    }
  }

  function handleDurationChange(key: keyof Durations, value: number) {
    const clamped = Math.max(1, Math.min(99, value));
    const updated = { ...durations, [key]: clamped };
    setDurations(updated);
    if (key === phase && !isRunning) {
      setTimeLeft(clamped * 60);
    }
  }

  const isWork = phase === "work";
  const isBreak = phase === "shortBreak" || phase === "longBreak";

  const ringStroke = isRunning
    ? isWork
      ? "stroke-emerald-500 dark:stroke-emerald-400"
      : "stroke-green-500 dark:stroke-green-400"
    : "stroke-gray-400 dark:stroke-gray-500";

  const phaseLabel = PHASE_LABELS[phase];

  return (
    <div className="space-y-6">
      {/* Phase label */}
      <div className="text-center">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
            isWork
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          }`}
        >
          {phaseLabel}
        </span>
      </div>

      {/* SVG ring + time */}
      <div className="flex justify-center">
        <div className="relative h-64 w-64 sm:h-72 sm:w-72">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              className="stroke-[color:var(--color-border)]"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              className={`transition-all duration-500 ${ringStroke} ${!isRunning && timeLeft < totalSeconds ? "animate-pulse" : ""}`}
              strokeWidth="8"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-5xl font-bold text-[color:var(--color-text-primary)] sm:text-6xl">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      {/* Session counter */}
      <div className="text-center">
        <span className="text-sm text-[color:var(--color-text-muted)]">
          {completedPomodoros > 0
            ? `${"🍅".repeat(Math.min(completedPomodoros, 20))}${completedPomodoros > 20 ? ` × ${completedPomodoros}` : ""}`
            : "No sessions completed yet"}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-border)]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>

        <button
          type="button"
          onClick={handleStartPause}
          className={`inline-flex items-center gap-1.5 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors ${
            isRunning
              ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
              : "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
          }`}
        >
          {isRunning ? (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-border)]"
        >
          Skip
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Settings toggle */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setSettingsOpen((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-secondary)]"
        >
          <svg
            className={`h-3.5 w-3.5 transition-transform ${settingsOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Customize Durations
        </button>
      </div>

      {/* Settings panel */}
      {settingsOpen && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DurationInput
              label="Focus (min)"
              value={durations.work}
              onChange={(v) => handleDurationChange("work", v)}
              disabled={isRunning}
            />
            <DurationInput
              label="Short Break (min)"
              value={durations.shortBreak}
              onChange={(v) => handleDurationChange("shortBreak", v)}
              disabled={isRunning}
            />
            <DurationInput
              label="Long Break (min)"
              value={durations.longBreak}
              onChange={(v) => handleDurationChange("longBreak", v)}
              disabled={isRunning}
            />
          </div>
          <p className="mt-3 text-center text-xs text-[color:var(--color-text-muted)]">
            Cycle: 4 focus sessions, then a long break. Durations locked while timer is running.
          </p>
        </div>
      )}
    </div>
  );
}

function DurationInput({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[color:var(--color-text-muted)]">{label}</label>
      <input
        type="number"
        min={1}
        max={99}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 1)}
        disabled={disabled}
        className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-center text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
      />
    </div>
  );
}
