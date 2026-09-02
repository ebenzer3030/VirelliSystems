"use client";

import { useEffect, useRef, useState } from "react";

// Reusable audio player for the demo section.
// To swap in the real Virelli demo recording, replace the file at
// public/audio/demo-plumbing.mp3 — no code changes needed as long as the
// filename stays the same, or update the `src` prop passed from DemoSection.

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({
  src,
  industry,
  callType,
}: {
  src: string;
  industry: string;
  callType: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasAudio, setHasAudio] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setHasAudio(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !hasAudio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setHasAudio(false));
    }
    setIsPlaying(!isPlaying);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const pct = Number(e.target.value);
    audio.currentTime = (pct / 100) * duration;
    setProgress(pct);
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-mutedDark">
            {industry}
          </p>
          <p className="mt-1 text-sm text-muted">{callType}</p>
        </div>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          disabled={!hasAudio}
          aria-label={isPlaying ? "Pause demo" : "Play demo"}
          className="tap-target flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-bright disabled:cursor-not-allowed disabled:bg-hairline disabled:text-mutedDark"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={seek}
            disabled={!hasAudio}
            aria-label="Seek audio"
            className="w-full accent-accent"
          />
          <div className="mt-1.5 flex justify-between text-xs text-mutedDark">
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : "0:00"}</span>
          </div>
        </div>
      </div>

      {!hasAudio && (
        <p className="mt-4 text-xs text-mutedDark">
          Demo audio coming soon. Add your recording at{" "}
          <code className="text-muted">public/audio/demo-plumbing.mp3</code>.
        </p>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3.5 2.5v11l10-5.5-10-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3" y="2.5" width="3.4" height="11" rx="0.6" />
      <rect x="9.6" y="2.5" width="3.4" height="11" rx="0.6" />
    </svg>
  );
}
