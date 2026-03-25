"use client";

import { useState, useEffect, useCallback } from "react";

export interface ActivityEntry {
  tool: string;
  toolHref: string;
  timestamp: number;
  description: string;
}

const STORAGE_KEY = "peregrine-recent-activity";
const MAX_ENTRIES = 10;

function readEntries(): ActivityEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeEntries(entries: ActivityEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

/**
 * Standalone function to log activity without the hook.
 * Use this in tool components that only need to write, not read.
 */
export function logActivity(entry: Omit<ActivityEntry, "timestamp">) {
  const newEntry: ActivityEntry = { ...entry, timestamp: Date.now() };
  const updated = [newEntry, ...readEntries().filter(
    (e) => !(e.tool === entry.tool && e.toolHref === entry.toolHref)
  )].slice(0, MAX_ENTRIES);
  writeEntries(updated);
}

export function useRecentActivity() {
  const [entries, setEntries] = useState<ActivityEntry[]>([]);

  useEffect(() => {
    setEntries(readEntries());
  }, []);

  const logActivity = useCallback(
    (entry: Omit<ActivityEntry, "timestamp">) => {
      const newEntry: ActivityEntry = { ...entry, timestamp: Date.now() };
      const updated = [newEntry, ...readEntries().filter(
        (e) => !(e.tool === entry.tool && e.toolHref === entry.toolHref)
      )].slice(0, MAX_ENTRIES);
      writeEntries(updated);
      setEntries(updated);
    },
    []
  );

  return { entries, logActivity };
}
