"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowDown, Clock, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TimerRef {
  current: NodeJS.Timeout | null;
}

const YevropaPage: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [watchTime, setWatchTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const intervalRef = useRef<TimerRef["current"]>(null);
  const REQUIRED_WATCH_TIME: number = 300;

  // Clear interval utility
  const clearWatchInterval = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle timer logic
  useEffect(() => {
    if (isPlaying && watchTime < REQUIRED_WATCH_TIME) {
      intervalRef.current = setInterval(() => {
        setWatchTime((prev: number) => {
          const newTime: number = prev + 1;

          if (newTime >= REQUIRED_WATCH_TIME) {
            setShowButton(true);
            clearWatchInterval();
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearWatchInterval();
  }, [isPlaying, watchTime, REQUIRED_WATCH_TIME, clearWatchInterval]);

  const handleVideoStart = useCallback((): void => {
    setIsPlaying(true);
  }, []);

  const handleVideoLoad = useCallback((): void => {
    setIsVideoLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          {/* Logo image */}
          <Image
            src="/images/logo.png"
            alt="Europe Travel Logo"
            width={200}
            height={200}
            className="w-14 h-14 sm:w-20 sm:h-20 object-contain flex-shrink-0"
            priority
          />

          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <MapPin
              className="w-5 h-5 sm:w-8 sm:h-8 text-orange-500 flex-shrink-0"
              aria-hidden="true"
            />
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 truncate">
              Европа саёҳати
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Text */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-relaxed mb-4">
            Европа бўйлаб саёҳатга оид барча муҳим маълумотларни қуйидаги
            видеода батафсил билиб олишингиз мумкин
          </h2>
          <div className="flex items-center justify-center gap-2 text-orange-600">
            <ArrowDown className="w-6 h-6 animate-bounce" aria-hidden="true" />
            <span className="text-lg font-medium">Видеони томоша қилинг</span>
            <ArrowDown className="w-6 h-6 animate-bounce" aria-hidden="true" />
          </div>
        </div>

        {/* Video Container */}
        <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6 mb-8">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                <Clock className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <iframe
              src="https://www.youtube.com/embed/NdWCO38Toro?enablejsapi=1"
              title="Европа саёҳати видеоси"
              className={`w-full h-full transition-opacity duration-300`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoLoad}
              onPlay={handleVideoStart}
            />
          </div>
        </div>

        {/* Registration Button - appears after 5 minutes */}
        {showButton && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 shadow-sm">
              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-white" />
              </div>
              <p className="text-white text-xl mb-6 font-medium">
                Табриклаймиз! Энди турга ёзилишингиз мумкин
              </p>
              <Link href="/yevropa/register" passHref>
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 text-xl md:text-2xl px-10 py-8 rounded-2xl shadow-lg font-bold transition-all hover:scale-105 focus:ring-4 focus:ring-white/50"
                >
                  Турга ёзилиш
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Instruction Text */}
        <div className="bg-orange-100/50 rounded-2xl p-6 md:p-8 mt-8 border-2 border-orange-200">
          <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
            Турга ёзилиш учун видеони охиригача томоша қилинг — видео якунида
            пастда{" "}
            <span className="font-bold text-orange-600">{"Турга ёзилиш"}</span>{" "}
            тугмаси пайдо бўлади.
          </p>
        </div>

        {/* Footer spacing */}
        <div className="h-20" aria-hidden="true" />
      </main>
    </div>
  );
};

export default YevropaPage;
