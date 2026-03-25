"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";

type VideoPlayerProps = {
  src: string;
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true);
      // Autoplay muted for better UX
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [inView, isLoaded]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Play failed:", error);
          setHasError(true);
        });
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={ref} className="flex justify-center">
      {isLoaded ? (
        <div className="relative w-full max-w-[320px] mx-auto">
          {/* 9:16 Aspect Ratio Container */}
          <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg">
            <video
              ref={videoRef}
              src={src}
              controls
              controlsList="nodownload"
              preload="auto"
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={handleError}
              className="absolute inset-0 w-full h-full object-cover"
              poster=""
            />

            {/* Play Button Overlay (shown when not playing) */}
            {!isPlaying && !hasError && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg hover:bg-black/40 transition-all duration-300 group"
                aria-label="Play video"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-400 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300 group-hover:scale-110 shadow-lg">
                  <svg
                    className="w-6 h-6 md:w-7 md:h-7 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                <svg
                  className="w-12 h-12 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm">Video unavailable</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Loading Skeleton with 9:16 Aspect Ratio
        <div className="w-full max-w-[320px] mx-auto">
          <div className="relative aspect-[9/16] rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center overflow-hidden">
            <div className="text-gray-400">
              <svg
                className="w-12 h-12 mx-auto animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-center mt-2">Loading video...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
