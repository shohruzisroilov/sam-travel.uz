"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

type Props = {
  videos: string[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
};

export default function VideoLightbox({ videos, index, onClose, onChange }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = videos.length;
  const src = videos[index];

  // Reset video when index changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
    setIsPlaying(true);
    setProgress(0);
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
      if (e.key === "ArrowRight") onChange((index + 1) % total);
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 60) {
      if (delta > 0) onChange((index - 1 + total) % total);
      else onChange((index + 1) % total);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Close — always visible */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-20 w-11 h-11 grid place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 active:scale-95 transition"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Index pill */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold tabular-nums">
        {index + 1} / {total}
      </div>

      {/* Prev / Next — desktop */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => onChange((index - 1 + total) % total)}
            aria-label="Previous video"
            className="hidden md:grid absolute top-1/2 left-6 -translate-y-1/2 z-20 w-12 h-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 active:scale-95 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => onChange((index + 1) % total)}
            aria-label="Next video"
            className="hidden md:grid absolute top-1/2 right-6 -translate-y-1/2 z-20 w-12 h-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 active:scale-95 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Video stage */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4 py-16 md:py-12"
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="relative w-full max-w-[440px] aspect-[9/16] max-h-[calc(100vh-7rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          <video
            ref={videoRef}
            key={src}
            src={src}
            playsInline
            autoPlay
            onTimeUpdate={onTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => onChange((index + 1) % total)}
            onClick={togglePlay}
            className="absolute inset-0 w-full h-full rounded-2xl object-contain bg-black cursor-pointer"
          />

          {/* Center play/pause icon (only when paused) */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play"
              className="absolute inset-0 grid place-items-center group"
            >
              <span className="w-20 h-20 grid place-items-center rounded-full bg-white/95 group-active:scale-95 transition">
                <Play className="w-9 h-9 text-brand fill-brand ml-1" />
              </span>
            </button>
          )}

          {/* Bottom controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 rounded-b-2xl bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            {/* Progress bar */}
            <div
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              onClick={seek}
              className="group h-1.5 rounded-full bg-white/20 cursor-pointer overflow-hidden"
            >
              <div
                className="h-full bg-brand-gradient transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Play/Pause button */}
            <div className="mt-3 flex items-center">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-9 h-9 grid place-items-center rounded-full bg-white/15 text-white backdrop-blur-md hover:bg-white/25 transition"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile swipe hint */}
      {total > 1 && (
        <p className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 text-white/50 text-[11px] z-10">
          ← swipe →
        </p>
      )}
    </div>
  );
}
