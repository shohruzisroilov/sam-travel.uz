"use client";

import { useState } from "react";
import DestinationCard from "@/components/common/DestinationCard";
import Reveal from "@/components/common/Reveal";
import SectionHeading from "@/components/common/SectionHeading";
import { motion } from "framer-motion";
import FAQ from "@/components/pages/home/FAQ";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

// Swiper
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Constants
import { DESTINATIONS } from "@/constants/destinations";
import { FEATURES, HERO_SLIDES } from "@/constants/homeConstants";
import Image from "next/image";
import InstagramSlider from "@/components/pages/home/InstagramSlider";

export default function Home() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] h-screen overflow-hidden flex items-center justify-center text-center">
        {/* Background Slider */}
        <div className="absolute inset-0 -z-10">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={1200}
            pagination={{ clickable: true }}
            onSlideChange={(s) => setActiveSlide(s.realIndex)}
            className="h-full hero-swiper"
          >
            {HERO_SLIDES.map(({ image, location }, i) => (
              <SwiperSlide key={i}>
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={`${location} — ${t("heroTitle")}`}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className={`object-cover ${
                      activeSlide === i ? "animate-heroZoom" : "scale-110"
                    }`}
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.4)_100%)]" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Static Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 px-4 sm:px-6 lg:px-8 text-white max-w-6xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-[1.05] tracking-tight"
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            {t("heroSubtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/destinations"
              className="group inline-flex items-center justify-center gap-2 bg-brand-gradient text-white px-8 py-4 rounded-xl font-semibold text-base md:text-lg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>{t("exploreButton")}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base md:text-lg border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t("contactUs")}</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("whyUs")}
            title={t("whyChooseUs")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map(({ icon: Icon, key, desc }, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group relative bg-white p-8 rounded-2xl ring-1 ring-gray-200/70 hover:ring-brand/30 hover:-translate-y-1 transition-all duration-500">
                  <div className="w-14 h-14 bg-brand-gradient rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink mb-3">
                    {t(key)}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{t(desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t("topPicks")}
            title={t("popularDestinations")}
            subtitle={t("destinationsSubtitle")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {DESTINATIONS.slice(0, 3).map((destination, i) => (
              <Reveal key={destination.key} delay={i * 0.08}>
                <DestinationCard
                  slug={destination.key}
                  title={destination.title}
                  description={destination.description}
                  image={destination.mainImage}
                  priority={i === 0}
                />
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-2 bg-brand-gradient text-white px-8 py-3.5 rounded-xl font-semibold shadow-brand transition-transform duration-300 hover:scale-[1.03]"
            >
              <span>
                {t("viewAll")} {t("destinations")}
              </span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <InstagramSlider />
      <FAQ />

      {/* Contact Call-to-Action */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 md:p-16 text-center text-white">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

            <h2 className="relative z-10 text-3xl md:text-5xl font-bold mb-4">
              {t("getInTouch")}
            </h2>
            <p className="relative z-10 text-base md:text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
              {t("contactDesc")}
            </p>

            <Link
              href="/contact"
              className="group relative z-10 inline-flex items-center gap-2 bg-white text-brand px-8 py-3.5 rounded-xl font-semibold transition-transform duration-300 hover:scale-[1.03]"
            >
              <span>{t("contactUs")}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
