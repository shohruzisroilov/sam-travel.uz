"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState, useRef } from "react";

type VideoPlayerProps = {
  src: string;
};

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true);
      // Autoplay kichik suv bilan
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {
          // Browser autoplay bloggallash, user manualda bossin
          setIsPlaying(false);
        });
      }
    }
  }, [inView, isLoaded]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div ref={ref} className="flex justify-center">
      {isLoaded ? (
        <div className="relative w-full max-w-[320px]">
          <video
            ref={videoRef}
            src={src}
            controls
            controlsList="nodownload"
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="rounded-lg shadow-lg w-full object-cover bg-gray-900"
          />
          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg hover:bg-black/30 transition opacity-0 hover:opacity-100 group"
            >
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-lg shadow-lg w-full max-w-[320px] h-48 bg-gradient-to-br from-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <svg
              className="w-12 h-12 mx-auto"
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
          </div>
        </div>
      )}
    </div>
  );
}
