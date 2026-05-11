"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";
import VideoPlayer from "./VideoPlayer";
import VideoLightbox from "./VideoLightbox";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

const VIDEOS = [
  "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217834/fpu4bnadr0mh733vsphk.mp4",
  "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217836/ynqcjuwyuvohiane6xt5.mp4",
  "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217837/gucnqzzhiotidra8so64.mp4",
  "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217841/rb5ph0v9ycbmexdvnkm3.mp4",
];

export default function InstagramSlider() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("testimonials")}
          title={t("testimonialsTitle")}
          subtitle={t("testimonialsSubtitle")}
        />

        <Reveal>
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1.2}
              loop
              navigation={{
                nextEl: ".testimonial-next",
                prevEl: ".testimonial-prev",
              }}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="!pb-2 !-mx-4 !px-4"
            >
              {VIDEOS.map((url, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  <VideoPlayer src={url} onOpen={() => setOpenIndex(i)} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              aria-label="Previous"
              className="testimonial-prev hidden md:grid absolute top-1/2 -left-5 -translate-y-1/2 z-10 w-11 h-11 place-items-center rounded-full bg-white text-ink ring-1 ring-ink/10 hover:bg-brand hover:text-white hover:ring-brand transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="testimonial-next hidden md:grid absolute top-1/2 -right-5 -translate-y-1/2 z-10 w-11 h-11 place-items-center rounded-full bg-white text-ink ring-1 ring-ink/10 hover:bg-brand hover:text-white hover:ring-brand transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </Reveal>
      </div>

      {openIndex !== null && (
        <VideoLightbox
          videos={VIDEOS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onChange={setOpenIndex}
        />
      )}
    </section>
  );
}
