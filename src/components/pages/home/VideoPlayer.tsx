"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Play, X } from "lucide-react";

type VideoPlayerProps = {
  src: string;
  onOpen: () => void;
};

export default function VideoPlayer({ src, onOpen }: VideoPlayerProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hasError, setHasError] = useState(false);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => !hasError && onOpen()}
      aria-label="Play video"
      className="group relative block w-full overflow-hidden rounded-2xl aspect-[9/16] bg-gradient-to-br from-ink to-ink-soft ring-1 ring-ink/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand transition-all duration-500 hover:ring-brand/40 hover:-translate-y-1"
      disabled={hasError}
    >
      {!hasError && (
        <video
          src={`${src}#t=0.1`}
          muted
          playsInline
          preload={inView ? "metadata" : "none"}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {!hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 grid place-items-center rounded-full bg-white/95 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
            <Play className="w-7 h-7 md:w-8 md:h-8 text-brand fill-brand ml-1" />
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70 gap-2 px-4 text-center">
          <X className="w-10 h-10" />
          <p className="text-sm">Video unavailable</p>
        </div>
      )}
    </button>
  );
}
