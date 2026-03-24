"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { DownloadButton } from "@peregrine/ui";
import { downloadBlob, formatFileSize } from "@/lib/download";

type RecordingState = "idle" | "countdown" | "recording" | "done";

export function ScreenRecorderTool() {
  const [state, setState] = useState<RecordingState>("idle");
  const [includeAudio, setIncludeAudio] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [recordingTime, setRecordingTime] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartRecording = useCallback(async () => {
    setError(null);
    setResultBlob(null);

    try {
      // Request screen capture
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: includeAudio,
      });

      streamRef.current = displayStream;

      // Handle user stopping share from browser UI
      displayStream.getVideoTracks()[0].addEventListener("ended", () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      });

      // Countdown
      setState("countdown");
      setCountdown(3);

      let count = 3;
      const countdownInterval = setInterval(() => {
        count--;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(countdownInterval);
          startMediaRecorder(displayStream);
        }
      }, 1000);
    } catch (err: any) {
      console.error(err);
      if (err.name === "NotAllowedError") {
        setError("Screen sharing was cancelled or denied. Please try again and grant permission.");
      } else {
        setError(
          "Screen recording is not supported in your browser. Please try Chrome, Edge, or Firefox."
        );
      }
      setState("idle");
    }
  }, [includeAudio]);

  const startMediaRecorder = useCallback((stream: MediaStream) => {
    chunksRef.current = [];
    setRecordingTime(0);
    setState("recording");

    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
        ? "video/webm;codecs=vp8,opus"
        : "video/webm";

    const recorder = new MediaRecorder(stream, { mimeType });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      // Stop all tracks
      stream.getTracks().forEach((t) => t.stop());

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Build blob
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setResultBlob(blob);
      setState("done");

      // Set video preview
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(blob);
      }
    };

    recorder.start(1000); // Collect data every second

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (!resultBlob) return;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    downloadBlob(resultBlob, `screen-recording-${timestamp}.webm`);
  }, [resultBlob]);

  const handleReset = useCallback(() => {
    setState("idle");
    setResultBlob(null);
    setError(null);
    setRecordingTime(0);
    setCountdown(3);
    chunksRef.current = [];
    if (videoRef.current) {
      videoRef.current.src = "";
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Idle state */}
      {state === "idle" && !resultBlob && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            {/* Screen icon */}
            <div className="mb-6 text-[color:var(--color-text-muted)]">
              <svg
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
                aria-hidden="true"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <circle cx="12" cy="10" r="3" fill="currentColor" opacity="0.2" />
              </svg>
            </div>

            {/* Audio toggle */}
            <label className="mb-6 flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={includeAudio}
                  onChange={(e) => setIncludeAudio(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-[color:var(--color-accent)] transition-colors" />
                <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-[color:var(--color-bg-card)] shadow-sm transition-transform peer-checked:translate-x-5" />
              </div>
              <span className="text-sm font-medium text-[color:var(--color-text-secondary)]">
                Include audio
              </span>
            </label>

            <p className="mb-6 text-xs text-[color:var(--color-text-muted)]">
              A 3-second countdown will appear before recording starts.
            </p>

            <button
              onClick={handleStartRecording}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[color:var(--color-accent-hover)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" />
              </svg>
              Start Recording
            </button>
          </div>
        </div>
      )}

      {/* Countdown state */}
      {state === "countdown" && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[color:var(--color-accent-light)]">
              <span className="text-5xl font-bold text-[color:var(--color-accent)] animate-pulse">
                {countdown}
              </span>
            </div>
            <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">
              Recording starts in {countdown}...
            </p>
          </div>
        </div>
      )}

      {/* Recording state */}
      {state === "recording" && (
        <div className="rounded-xl border-2 border-[color:var(--color-error)] bg-[color:var(--color-bg-card)] p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-error)] opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-[color:var(--color-error)]" />
              </span>
              <span className="text-lg font-semibold text-[color:var(--color-error)]">
                Recording
              </span>
            </div>

            <p className="mb-6 text-3xl font-mono font-bold text-[color:var(--color-text-primary)]">
              {formatTime(recordingTime)}
            </p>

            <button
              onClick={handleStopRecording}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[color:var(--color-error)] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-error)] focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
              Stop Recording
            </button>
          </div>
        </div>
      )}

      {/* Done state */}
      {state === "done" && resultBlob && (
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-card)] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-[color:var(--color-text-primary)]">
                Recording complete
              </p>
              <p className="mt-0.5 text-xs text-[color:var(--color-text-muted)]">
                Duration: {formatTime(recordingTime)} &middot;{" "}
                {formatFileSize(resultBlob.size)}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="shrink-0 rounded-lg border border-[color:var(--color-border)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text-secondary)] transition-colors hover:bg-[color:var(--color-bg-elevated)]"
            >
              New recording
            </button>
          </div>

          {/* Video preview */}
          <div className="overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-black">
            <video
              ref={videoRef}
              controls
              className="w-full max-h-80"
              playsInline
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <DownloadButton
              onClick={handleDownload}
              label="Download Recording"
              className="flex-1"
            />
            <button
              onClick={handleReset}
              className="rounded-xl border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text-secondary)] transition-all hover:bg-[color:var(--color-bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
            >
              Record another
            </button>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-lg bg-[color:var(--color-error-bg,#fef2f2)] px-4 py-3 text-sm text-[color:var(--color-error)]" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
