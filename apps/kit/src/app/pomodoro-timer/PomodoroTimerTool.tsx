"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { logActivity, usePreference } from "@peregrine/ui";

type Phase = "work" | "shortBreak" | "longBreak";
type AmbientSound = "none" | "rain" | "whitenoise" | "brownnoise";

interface Durations {
  work: number;
  shortBreak: number;
  longBreak: number;
}

interface DayStats {
  date: string;
  pomodoros: number;
  focusMinutes: number;
}

interface TaskEntry {
  text: string;
  minutes: number;
  timestamp: number;
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

const CIRCUMFERENCE = 2 * Math.PI * 54;

// ─── Audio ──────────────────────────────────────────────────────────

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
    setTimeout(() => ctx.close(), 1000);
  } catch {
    /* Web Audio unavailable */
  }
}

function createAmbientNode(ctx: AudioContext, type: AmbientSound): AudioNode | null {
  if (type === "none") return null;

  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  if (type === "whitenoise") {
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  } else if (type === "brownnoise") {
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  } else if (type === "rain") {
    // Rain-like: filtered noise with random amplitude modulation
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.05 * white) / 1.05;
      const mod = 0.5 + 0.5 * Math.sin(i / (ctx.sampleRate * 0.3));
      data[i] = last * 2.5 * mod;
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();

  return source;
}

// ─── Notifications ──────────────────────────────────────────────────

function sendNotification(phase: Phase) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  const title = phase === "work" ? "Focus session complete!" : "Break is over!";
  const body = phase === "work" ? "Great work! Time for a break." : "Ready to focus again?";
  try {
    new Notification(title, { body, icon: "/favicon.ico" });
  } catch {
    /* blocked */
  }
}

// ─── Stats persistence ──────────────────────────────────────────────

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

function readStats(): DayStats[] {
  try {
    return JSON.parse(localStorage.getItem("pomodoro-stats") || "[]");
  } catch {
    return [];
  }
}

function writeStats(stats: DayStats[]) {
  try {
    localStorage.setItem("pomodoro-stats", JSON.stringify(stats.slice(-30))); // keep 30 days
  } catch {
    /* full */
  }
}

function recordSession(focusMinutes: number) {
  const stats = readStats();
  const today = getTodayKey();
  const existing = stats.find((s) => s.date === today);
  if (existing) {
    existing.pomodoros += 1;
    existing.focusMinutes += focusMinutes;
  } else {
    stats.push({ date: today, pomodoros: 1, focusMinutes });
  }
  writeStats(stats);
}

function readStreak(): number {
  const stats = readStats();
  if (stats.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  for (let i = 0; i <= 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    if (stats.find((s) => s.date === key && s.pomodoros > 0)) {
      streak++;
    } else if (i > 0) {
      break; // streak broken
    }
    // i === 0 (today) — if no session today, streak still counts from yesterday
    if (i === 0 && !stats.find((s) => s.date === key)) continue;
  }
  return streak;
}

function readTaskLog(): TaskEntry[] {
  try {
    return JSON.parse(localStorage.getItem("pomodoro-tasks") || "[]");
  } catch {
    return [];
  }
}

function writeTaskLog(tasks: TaskEntry[]) {
  try {
    localStorage.setItem("pomodoro-tasks", JSON.stringify(tasks.slice(-50)));
  } catch {
    /* full */
  }
}

// ─── Helpers ────────────────────────────────────────────────────────

function getNextPhase(current: Phase, workSessionsInCycle: number): Phase {
  if (current === "work") return workSessionsInCycle >= 4 ? "longBreak" : "shortBreak";
  return "work";
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Component ──────────────────────────────────────────────────────

export function PomodoroTimerTool() {
  const [durations, setDurations] = useState<Durations>(DEFAULT_DURATIONS);
  const [phase, setPhase] = useState<Phase>("work");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATIONS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [workSessionsInCycle, setWorkSessionsInCycle] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unavailable">("default");

  // New features
  const [streak, setStreak] = useState(0);
  const [todayStats, setTodayStats] = useState<DayStats | null>(null);
  const [weekStats, setWeekStats] = useState({ pomodoros: 0, minutes: 0 });
  const [currentTask, setCurrentTask] = useState("");
  const [taskLog, setTaskLog] = useState<TaskEntry[]>([]);
  const [ambientSound, setAmbientSound] = usePreference<AmbientSound>("pomodoro-ambient", "none");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ambientCtxRef = useRef<AudioContext | null>(null);
  const ambientNodeRef = useRef<AudioNode | null>(null);

  const totalSeconds = durations[phase] * 60;
  const progress = totalSeconds > 0 ? (totalSeconds - timeLeft) / totalSeconds : 0;
  const offset = CIRCUMFERENCE * (1 - progress);

  // ─── Load stats on mount ────────────────────────────────────────
  useEffect(() => {
    setStreak(readStreak());

    const stats = readStats();
    const today = getTodayKey();
    setTodayStats(stats.find((s) => s.date === today) || null);

    // Week stats
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekKey = weekAgo.toISOString().split("T")[0];
    const week = stats.filter((s) => s.date >= weekKey);
    setWeekStats({
      pomodoros: week.reduce((sum, s) => sum + s.pomodoros, 0),
      minutes: week.reduce((sum, s) => sum + s.focusMinutes, 0),
    });

    setTaskLog(readTaskLog());

    // Restore session count
    try {
      const stored = sessionStorage.getItem("pomodoro-completed");
      if (stored) setCompletedPomodoros(parseInt(stored, 10) || 0);
    } catch {
      /* unavailable */
    }
  }, []);

  // Persist session count
  useEffect(() => {
    try {
      sessionStorage.setItem("pomodoro-completed", String(completedPomodoros));
    } catch {
      /* unavailable */
    }
  }, [completedPomodoros]);

  // Check notification permission
  useEffect(() => {
    if (typeof Notification === "undefined") setNotificationPermission("unavailable");
    else setNotificationPermission(Notification.permission);
  }, []);

  // ─── Browser tab title ──────────────────────────────────────────
  useEffect(() => {
    if (isRunning) {
      const emoji = phase === "work" ? "🍅" : "☕";
      document.title = `${emoji} ${formatTime(timeLeft)} — ${PHASE_LABELS[phase]}`;
    } else {
      document.title = "Pomodoro Timer — Peregrine Kit";
    }
    return () => {
      document.title = "Pomodoro Timer — Peregrine Kit";
    };
  }, [timeLeft, isRunning, phase]);

  // ─── Ambient sound ──────────────────────────────────────────────
  useEffect(() => {
    // Clean up previous
    if (ambientNodeRef.current && "stop" in ambientNodeRef.current) {
      (ambientNodeRef.current as AudioBufferSourceNode).stop();
    }
    if (ambientCtxRef.current) {
      ambientCtxRef.current.close().catch(() => {});
    }
    ambientNodeRef.current = null;
    ambientCtxRef.current = null;

    if (isRunning && ambientSound !== "none") {
      const ctx = new AudioContext();
      ambientCtxRef.current = ctx;
      ambientNodeRef.current = createAmbientNode(ctx, ambientSound);
    }

    return () => {
      if (ambientNodeRef.current && "stop" in ambientNodeRef.current) {
        (ambientNodeRef.current as AudioBufferSourceNode).stop();
      }
      if (ambientCtxRef.current) {
        ambientCtxRef.current.close().catch(() => {});
      }
    };
  }, [isRunning, ambientSound]);

  // ─── Phase complete ─────────────────────────────────────────────
  const handlePhaseComplete = useCallback(() => {
    playBeep();
    sendNotification(phase);

    if (phase === "work") {
      const newCount = completedPomodoros + 1;
      const newCycleCount = workSessionsInCycle + 1;
      setCompletedPomodoros(newCount);
      setWorkSessionsInCycle(newCycleCount);

      // Record stats
      recordSession(durations.work);
      setStreak(readStreak());
      const stats = readStats();
      const today = getTodayKey();
      setTodayStats(stats.find((s) => s.date === today) || null);

      // Log task
      if (currentTask.trim()) {
        const entry: TaskEntry = { text: currentTask.trim(), minutes: durations.work, timestamp: Date.now() };
        const updated = [entry, ...readTaskLog()].slice(0, 50);
        writeTaskLog(updated);
        setTaskLog(updated);
      }

      logActivity({
        tool: "Pomodoro Timer",
        toolHref: "/pomodoro-timer",
        description: `Completed focus session #${newCount}`,
      });

      const next = getNextPhase("work", newCycleCount);
      setPhase(next);
      setTimeLeft(durations[next] * 60);
      if (next === "longBreak") setWorkSessionsInCycle(0);
    } else {
      setPhase("work");
      setTimeLeft(durations.work * 60);
    }

    setIsRunning(false);
  }, [phase, completedPomodoros, workSessionsInCycle, durations, currentTask]);

  // ─── Timer tick ─────────────────────────────────────────────────
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

  // ─── Controls ───────────────────────────────────────────────────
  function handleStartPause() {
    if (!isRunning && notificationPermission === "default") {
      Notification.requestPermission().then((perm) => setNotificationPermission(perm));
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
    if (key === phase && !isRunning) setTimeLeft(clamped * 60);
  }

  const isWork = phase === "work";
  const ringStroke = isRunning
    ? isWork
      ? "stroke-emerald-500"
      : "stroke-green-500"
    : "stroke-[color:var(--color-text-muted)]";

  const todayPomodoros = todayStats?.pomodoros ?? 0;
  const todayMinutes = todayStats?.focusMinutes ?? 0;

  // Today's task log (filtered to today)
  const todayTasks = useMemo(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return taskLog.filter((t) => t.timestamp >= todayStart.getTime());
  }, [taskLog]);

  return (
    <div className="space-y-6">
      {/* Streak + today stats */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        {streak > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 font-semibold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            🔥 {streak} day streak
          </span>
        )}
        {todayPomodoros > 0 && (
          <span className="text-[color:var(--color-text-muted)]">
            Today: {todayPomodoros} 🍅 · {todayMinutes}m focused
          </span>
        )}
        {weekStats.pomodoros > 0 && (
          <span className="text-[color:var(--color-text-muted)]">
            Week: {weekStats.pomodoros} 🍅 · {Math.round(weekStats.minutes / 60 * 10) / 10}h
          </span>
        )}
      </div>

      {/* Phase label */}
      <div className="text-center">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
            isWork
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          }`}
        >
          {PHASE_LABELS[phase]}
        </span>
      </div>

      {/* SVG ring + time */}
      <div className="flex justify-center">
        <div className="relative h-64 w-64 sm:h-72 sm:w-72">
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <circle cx="60" cy="60" r="54" fill="none" className="stroke-[color:var(--color-border)]" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
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

      {/* Task input */}
      <div className="mx-auto max-w-sm">
        <input
          type="text"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="What are you working on?"
          className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2.5 text-center text-sm text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button type="button" onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Reset
        </button>
        <button
          type="button" onClick={handleStartPause}
          className={`btn-action inline-flex items-center gap-1.5 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors ${
            isRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isRunning ? (
            <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Pause</>
          ) : (
            <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Start</>
          )}
        </button>
        <button type="button" onClick={handleSkip} className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]">
          Skip
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Ambient sound selector */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-[color:var(--color-text-muted)]">Sound:</span>
        {(["none", "rain", "whitenoise", "brownnoise"] as AmbientSound[]).map((s) => (
          <button
            key={s}
            onClick={() => setAmbientSound(s)}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              ambientSound === s
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]"
            }`}
          >
            {s === "none" ? "Off" : s === "rain" ? "🌧 Rain" : s === "whitenoise" ? "〰 White" : "〰 Brown"}
          </button>
        ))}
      </div>

      {/* Settings toggle */}
      <div className="flex justify-center">
        <button
          type="button" onClick={() => setSettingsOpen((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text-secondary)]"
        >
          <svg className={`h-3.5 w-3.5 transition-transform ${settingsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Customize Durations
        </button>
      </div>

      {/* Settings panel */}
      {settingsOpen && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DurationInput label="Focus (min)" value={durations.work} onChange={(v) => handleDurationChange("work", v)} disabled={isRunning} />
            <DurationInput label="Short Break (min)" value={durations.shortBreak} onChange={(v) => handleDurationChange("shortBreak", v)} disabled={isRunning} />
            <DurationInput label="Long Break (min)" value={durations.longBreak} onChange={(v) => handleDurationChange("longBreak", v)} disabled={isRunning} />
          </div>
          <p className="mt-3 text-center text-xs text-[color:var(--color-text-muted)]">
            Cycle: 4 focus sessions, then a long break. Durations locked while running.
          </p>
        </div>
      )}

      {/* Today's task log */}
      {todayTasks.length > 0 && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-muted)]">
            Today's Sessions
          </h3>
          <div className="space-y-2">
            {todayTasks.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-[color:var(--color-text-secondary)]">{t.text}</span>
                <span className="shrink-0 text-xs text-[color:var(--color-text-muted)]">{t.minutes}m</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DurationInput({ label, value, onChange, disabled }: { label: string; value: number; onChange: (v: number) => void; disabled: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-[color:var(--color-text-muted)]">{label}</label>
      <input
        type="number" min={1} max={99} value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 1)}
        disabled={disabled}
        className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-center text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
      />
    </div>
  );
}
