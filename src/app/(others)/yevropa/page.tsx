"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TimerRef {
  current: NodeJS.Timeout | null;
}

const YevropaPage: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [watchTime, setWatchTime] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const intervalRef = useRef<TimerRef["current"]>(null);
  const REQUIRED_WATCH_TIME: number = 180; // 3 minutes in seconds

  // Clear interval utility
  const clearWatchInterval = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Handle timer logic
  useEffect(() => {
    if (watchTime < REQUIRED_WATCH_TIME) {
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
  }, [watchTime, REQUIRED_WATCH_TIME, clearWatchInterval]);

  const handleVideoLoad = useCallback((): void => {
    setIsVideoLoaded(true);
  }, []);

  const progress = Math.min((watchTime / REQUIRED_WATCH_TIME) * 100, 100);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-ink/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Image
            src="/images/logo.png"
            alt="Europe Travel Logo"
            width={56}
            height={56}
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
            priority
          />
          <h1 className="text-lg sm:text-xl font-semibold text-ink truncate text-right">
            Европа саёҳати
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        {/* Hero */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand mb-4">
            Эксклюзив видео
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink leading-tight max-w-3xl mx-auto mb-5">
            Европа бўйлаб саёҳат ҳақида муҳим маълумотлар
          </h2>
          <div className="inline-flex items-center gap-2 text-brand">
            <ArrowDown className="w-5 h-5 animate-bounce-slow" aria-hidden="true" />
            <span className="text-base font-medium">Видеони охиригача томоша қилинг</span>
          </div>
        </div>

        {/* Video Card */}
        <div className="relative bg-white rounded-3xl p-2 md:p-3 mb-6 ring-1 ring-ink/5">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-ink">
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-ink z-10">
                <Clock className="w-12 h-12 text-white/40 animate-pulse" />
              </div>
            )}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/S2JYvxyIr1I?rel=0"
              title="Ажойиб Европа саёҳати - классик тур 2026"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={handleVideoLoad}
            />
          </div>
        </div>

        {/* Progress bar */}
        {!showButton && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-ink-soft">
                Рўйхатдан ўтиш тугмаси очилишига
              </span>
              <span className="font-bold text-brand tabular-nums">
                {Math.floor((REQUIRED_WATCH_TIME - watchTime) / 60)}:
                {String((REQUIRED_WATCH_TIME - watchTime) % 60).padStart(2, "0")}
              </span>
            </div>
            <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
              <div
                className="h-full bg-brand-gradient transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Registration Button */}
        {showButton && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 mb-8">
            <Button
              asChild
              className="w-full bg-brand-gradient text-white text-xl md:text-2xl py-7 rounded-2xl shadow-brand font-bold transition-transform hover:scale-[1.02] focus:ring-4 focus:ring-brand/30"
            >
              <Link href="/yevropa/register">Турга ёзилиш →</Link>
            </Button>
          </div>
        )}

        {/* Instruction */}
        <div className="rounded-2xl bg-white p-6 md:p-8 ring-1 ring-ink/5">
          <p className="text-base md:text-lg text-ink-soft text-center leading-relaxed">
            Турга ёзилиш учун видеони охиригача томоша қилинг. Видео якунида пастда{" "}
            <span className="font-bold text-brand">«Турга ёзилиш»</span> тугмаси пайдо бўлади.
          </p>
        </div>

        <div className="h-20" aria-hidden="true" />
      </main>
    </div>
  );
};

export default YevropaPage;
