"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useLanguage } from "@/contexts/LanguageContext";
import VideoPlayer from "./VideoPlayer";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function InstagramSlider() {
  const { t } = useLanguage();

  const videos = [
    "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217834/fpu4bnadr0mh733vsphk.mp4",
    "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217836/ynqcjuwyuvohiane6xt5.mp4",
    "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217837/gucnqzzhiotidra8so64.mp4",
    "https://res.cloudinary.com/dj3epjudt/video/upload/v1758217841/rb5ph0v9ycbmexdvnkm3.mp4",
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("testimonialsTitle")}</h2>
          <div className="w-24 h-1 bg-[rgb(247,162,31)] mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600">{t("testimonialsSubtitle")}</p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="custom-swiper"
          >
            {videos.map((url, i) => (
              <SwiperSlide key={i}>
                <VideoPlayer src={url} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Left button */}
          <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-orange-400 text-white shadow-lg hover:bg-orange-500 transition duration-300 hover:scale-110">
            <IoIosArrowBack size={20} />
          </button>

          {/* Right button */}
          <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-orange-400 text-white shadow-lg hover:bg-orange-500 transition duration-300 hover:scale-110">
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
