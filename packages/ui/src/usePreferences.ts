"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "peregrine-preferences";

function readPrefs(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writePrefs(prefs: Record<string, unknown>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function usePreference<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const prefs = readPrefs();
    return key in prefs ? (prefs[key] as T) : defaultValue;
  });

  const setPreference = useCallback(
    (newValue: T) => {
      setValue(newValue);
      const prefs = readPrefs();
      prefs[key] = newValue;
      writePrefs(prefs);
    },
    [key]
  );

  return [value, setPreference];
}
