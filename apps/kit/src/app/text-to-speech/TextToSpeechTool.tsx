"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { logActivity } from "@peregrine/ui";

type SpeakingState = "idle" | "speaking" | "paused";

export function TextToSpeechTool() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speakingState, setSpeakingState] = useState<SpeakingState>("idle");
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        setVoices(available);
        if (!selectedVoiceURI) {
          const defaultVoice =
            available.find((v) => v.default) || available[0];
          setSelectedVoiceURI(defaultVoice.voiceURI);
        }
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, [selectedVoiceURI]);

  const handlePlay = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (speakingState === "paused") {
      window.speechSynthesis.resume();
      setSpeakingState("speaking");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => setSpeakingState("idle");
    utterance.onerror = () => setSpeakingState("idle");

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeakingState("speaking");

    logActivity({
      tool: "Text to Speech",
      toolHref: "/text-to-speech",
      description: "Played text to speech",
    });
  }, [text, voices, selectedVoiceURI, rate, pitch, speakingState]);

  const handlePause = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setSpeakingState("paused");
  }, []);

  const handleStop = useCallback(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setSpeakingState("idle");
  }, []);

  if (!supported) {
    return (
      <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 text-center">
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Your browser does not support the SpeechSynthesis API. Please try a
          modern browser such as Chrome, Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Text input */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste the text you want to hear spoken aloud..."
          rows={8}
          className="w-full resize-y rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-4 py-3 text-sm text-[color:var(--color-text-secondary)] placeholder:text-[color:var(--color-text-muted)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
        <span className="absolute bottom-3 right-3 text-xs text-[color:var(--color-text-muted)]">
          {text.length.toLocaleString()} characters
        </span>
      </div>

      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Voice selector */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[color:var(--color-text-muted)]">
            Voice
          </label>
          <select
            value={selectedVoiceURI}
            onChange={(e) => setSelectedVoiceURI(e.target.value)}
            className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-3 py-2 text-sm text-[color:var(--color-text-secondary)] focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {voices.map((voice) => (
              <option key={voice.voiceURI} value={voice.voiceURI}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Speed slider */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[color:var(--color-text-muted)]">
            Speed: {rate.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-[color:var(--color-text-muted)]">
            <span>0.5x</span>
            <span>2x</span>
          </div>
        </div>

        {/* Pitch slider */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[color:var(--color-text-muted)]">
            Pitch: {pitch.toFixed(1)}
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-[color:var(--color-text-muted)]">
            <span>0.5</span>
            <span>2</span>
          </div>
        </div>
      </div>

      {/* Playback buttons and state indicator */}
      <div className="flex items-center gap-3">
        {speakingState === "speaking" ? (
          <button
            onClick={handlePause}
            className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-700"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={handlePlay}
            disabled={text.trim().length === 0}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {speakingState === "paused" ? "Resume" : "Play"}
          </button>
        )}

        <button
          onClick={handleStop}
          disabled={speakingState === "idle"}
          className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Stop
        </button>

        {/* Speaking state indicator */}
        <div className="ml-auto flex items-center gap-2">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${
              speakingState === "speaking"
                ? "animate-pulse bg-emerald-500"
                : speakingState === "paused"
                  ? "bg-amber-500"
                  : "bg-[color:var(--color-text-muted)]"
            }`}
          />
          <span className="text-xs text-[color:var(--color-text-muted)] capitalize">
            {speakingState}
          </span>
        </div>
      </div>
    </div>
  );
}
